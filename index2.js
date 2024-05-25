let form = document.querySelector("#task-form")
let taskInput = document.querySelector("#task")
let taskList = document.querySelector(".collection")
let clearbtn = document.querySelector(".clear-task")
let list=document.querySelectorAll(".collection-item")
loadEventListener()
function loadEventListener() {
    //dom load event
    document.addEventListener("DOMContentLoaded",getTasks)
    //add task
    form.addEventListener('submit', addTask)
    //remove task
    taskList.addEventListener("click",removeTask)
    //clear task 
    clearbtn.addEventListener("click",clearTask)
}

function getTasks(){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        //run if there is no key
        tasks=[]
    }else{
        //after added
        tasks=JSON.parse(localStorage.getItem("tasks"))
        
    }
    console.log(tasks);
    tasks.forEach(function(task){
        console.log(task);
        let li=document.createElement("li")
        li.className="collection-item"
       
        li.appendChild(document.createTextNode(task))
        // console.log(li);
        let link=document.createElement("a")
        link.className="delete-item secondary-content"
        link.innerHTML=<i class="fa fa-remove"></i> 
        li.appendChild(link) 
        // console.log(li);
        taskList.appendChild(li)
    })
}








function addTask(e) {
    e.preventDefault();
    //validate
    if(taskInput.value===""){
        alert("Please fill the form")
        return
    }
       let exitingtasks=document.querySelectorAll(".collection-item")
       for(let task of exitingtasks){
        if(task.innerText.trim().toUpperCase()===taskInput.value.trim().toUpperCase()){
            alert("Already exit")
            return
        }
       }
        let li=document.createElement("li")
        li.className="collection-item"
        li.appendChild(document.createTextNode(taskInput.value))
        let link=document.createElement("a")
        link.className="delete-item secondary-content"
        li.appendChild(link)
        link.innerHTML=<i class="fa fa-remove"></i>
        taskList.appendChild(li)
        storeTaskInLocalStorage(taskInput.value)
        taskInput.value=""
   
}
//local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        //run if there is no key
        tasks=[]
    }else{
        //after added
        tasks=JSON.parse(localStorage.getItem("tasks"))
       ;
    }
   tasks.push(task)
   localStorage.setItem("tasks",JSON.stringify(tasks))
}









function removeTask(event){
    if(event.target.parentElement.classList[0]==="delete-item"){
        event.target.parentElement.parentElement.remove()
    }
    removeTaskFromLocalDtorage(event.target.parentElement.parentElement)
}
function removeTaskFromLocalDtorage(taskElement){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        //run if there is no key
        tasks=[]
    }else{
        //after added
        tasks=JSON.parse(localStorage.getItem("tasks"))
       ;
    }
    tasks.forEach(function(task,index){
        if(taskElement.innerText===task)
            {
                tasks.splice(index,1)
            }
    })
    localStorage.setItem("tasks",JSON.stringify(tasks))
}
function clearTask(){
    console.log(taskList.children);
    let changeToArr=Array.from(taskList.children);
    changeToArr.forEach(function(element){
        element.remove()
    })
    clearTaskFromLocalStorage()
}

function clearTaskFromLocalStorage(){
    localStorage.clear()
}
