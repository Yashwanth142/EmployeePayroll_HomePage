//when content of webpage is loaded, this event gets fired
let isUpdate=false;
let employeePayrollObject={};

window.addEventListener('DOMContentLoaded',(event)=>{
    const name= document.querySelector('#name');
    const textError= document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if(name.value.length==0)
        {
            textError.textContent="";
            return;
        }
        try{
            (new empPayrollData()).name=name.value;
            textError.textContent="";
        }
        catch(e)
        {
            textError.textContent=e;
        }
    });

    const salary= document.querySelector('#salary');
    setTextValue('.salary-output',salary.value);
    salary.addEventListener('input',function(){
    setTextValue('.salary-output',salary.value);
 
    });
    checkForUpdate();

    dateError= document.querySelector(".date-error");
    var year= document.querySelector('#year');
    var month= document.querySelector('#month');
    var day=document.querySelector('#day');

    year.addEventListener('input',checkDate);
    month.addEventListener('input',checkDate);
    day.addEventListener('input',checkDate)

    function checkDate()
    { 
    try
    {
        let dates= getInputValueById("#day")+" "+getInputValueById("#month")+" "+getInputValueById("#year");
        dates=new Date(Date.parse(dates));
        (new empPayrollData()).startDate=dates;
        dateError.textContent="";
    }
    catch(e)
    {
        dateError.textContent=e;
    }
    }

});

const checkForUpdate=()=>{
    const employeePayrollJSON = localStorage.getItem('editEmp');
    isUpdate=employeePayrollJSON?true : false;
    if(!isUpdate) return;
    employeePayrollObject=JSON.parse(employeePayrollJSON);
    setForm();
}
const setForm=()=>{
    setValue('#name',employeePayrollObject._name);
    setSelectedValues('[name=profile]',employeePayrollObject._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObject._gender);
    setSelectedValues('[name=departement]',employeePayrollObject._department);
    setValue('#salary',employeePayrollObject._salary);
    setTextValue('.salary-output',employeePayrollObject._salary);
    setValue('#notes',employeePayrollObject._note);
    let date=stringifyDate(employeePayrollObject.startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}
const setSelectedValues = (propertyValue,value) =>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked=true;
            }
        }
        else if(item.value===value){
            item.checked=true;
        }
    });
}

const save = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    try
    {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }
    catch(e)
    {
        return;
    }
}
function createAndUpdateStorage(employeePayrollData){
    
    //employee payroll list is array of objects of employee payroll data
    let employeePayrollList= JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList!=undefined)
    {
        employeePayrollList.push(employeePayrollData);
    }
    else
    {
        employeePayrollList=[employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const setEmployeePayrollObject=()=>{
    employeePayrollObject._name=getInputValueById('#name');
    employeePayrollObject._profilePic= getSelectedValues('[name=profile]').pop();
    employeePayrollObject._gender= getSelectedValues('[name=gender]').pop();
    employeePayrollObject._department=getSelectedValues('[name=department]');
    employeePayrollObject._salary= getInputValueById('#salary');
    employeePayrollObject._note=getInputValueById('#notes');
    let date= getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollObject.startDate= Date.parse(date);
    //alert(empPayrollData.toString());
    //return empPayrollData;
}
const getSelectedValues=(propertyValue)=>{
    let allItems= document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}
const getInputValueById=(id)=>
{
    let value= document.querySelector(id).value;
    return value;
}
const getInputElementValue=(id)=>{
    let value= document.getElementById(id).value;
    return value;
}
//reset form
const resetForm=()=>{
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day',1);
    setValue('#month','January');
    setValue('#year','2020');
}
const unsetSelectedValues= (propertyValue)=>{
    let allItems= document.querySelectorAll(propertyValue);
    allItems.forEach(items=>{
        items.checked=false;
    });
}
const setTextValue=(id,value)=>
{
    const element= document.querySelector(id);
    element.textContent=value;
}
const setValue=(id,value)=>
{
    const element= document.querySelector(id);
    element.value=value;
}

