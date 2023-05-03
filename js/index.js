
let modal=document.getElementById('modal')
let addNewTask=document.getElementById("newTask")
let titleInput=document.getElementById('title')
let statusInput=document.getElementById('status')
let categoryInput=document.getElementById('category')
let descriptionInput=document.getElementById('description')
let addBtn=document.getElementById('addBtn')
let nextUpContainer=document.getElementById('nextUp')
let inProgressContainer=document.getElementById('inProgress')
let doneContainer=document.getElementById('done')
let searchInput=document.getElementById('searchInput')

let nextUpCount=document.getElementById('nextUpCount')
let inProgressCount=document.getElementById('inProgressCount')
let doneCount=document.getElementById('doneCount')
var body = document.body;

var gridBtn = document.getElementById("gridBtn");
var barsBtn = document.getElementById("barsBtn");

// show modal
function showModal()
{
    modal.classList.remove('d-none')
    modal.classList.add("d-flex")

    body.style.overflow = "hidden";
    scroll(0,0);
}

addNewTask.addEventListener('click',showModal)

// hide modal
function hideModal()
{
    modal.classList.add('d-none')
    modal.classList.remove("d-flex")

    body.style.overflow = "auto";

    // ! because if he closes the modal when update is open
    addBtn.innerHTML = "Add Task";
    addBtn.classList.remove("btn-update");
    addBtn.classList.add("btn-new-task");
}

modal.addEventListener("click",function(e)
{
   if(e.target.id=="modal") 
   {
    hideModal()
   }

})
document.addEventListener("keyup",function(e){

    if(e.key=='Escape')
    {
        hideModal()
    }
})


// ? check if there are tasks before
let arrOfTasks=[]
if(localStorage.getItem('alaa task')!=null)
{
    arrOfTasks=JSON.parse(localStorage.getItem('alaa task'))

    for (let i = 0; i < arrOfTasks.length; i++) {
        displayTasks(i)
    }
}

// Add New Task
function addTask() {
    if(addBtn.innerHTML.trim()=="Add Task")
    {
    Task=
    {
        title:titleInput.value,
        status:statusInput.value,
        description:descriptionInput.value,
        category:categoryInput.value,
    }
    arrOfTasks.push(Task)

    localStorage.setItem('alaa task',JSON.stringify(arrOfTasks))

    
    displayTasks(arrOfTasks.length - 1)
    clearInputs()
    hideModal()
 
    }
    else 
    {
        updateTask(glopalIndex)
    }
}

function displayTasks(index){

taskHTML=  `
     <div class="task" id="taskId${index+1}" data-index="${index}">
       <h3 class="text-capitalize">${arrOfTasks[index].title}</h3>
       <p class="description text-capitalize">${arrOfTasks[index].description}</p>
       <h4 class="category ${arrOfTasks[index].category} text-capitalize">${arrOfTasks[index].category}</h4>
       <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
         <li><i class="bi bi-pencil-square" onclick="getTaskInfo(${index})"></i></li>
         <li><i class="bi bi-trash-fill" onclick="deleteTask(${index})"></i></li>
         <li><i class="bi bi-palette-fill" onclick="changeColor(event)"></i></li>
         </ul>
   </div>
   `
   setHTMLocation(arrOfTasks[index].status)
}


function setHTMLocation(status)
{
    switch (status) {
      case "nextUp":
        nextUpContainer.innerHTML += taskHTML;
        nextUpCount.innerHTML++
        break;
      case "inProgress":
        inProgressContainer.innerHTML += taskHTML;
        inProgressCount.innerHTML++
        break;
      case "done":
        doneContainer.innerHTML += taskHTML;
        doneCount.innerHTML++
        break;
    }
}
addBtn.addEventListener("click",addTask)


// ! delete task
function deleteTask(index) {
    
    arrOfTasks.splice(index,1)

    arrStorageOfTask.splice(index,1)

    localStorage.setItem('alaaColor',JSON.stringify(arrStorageOfTask))

    clearThreeContainers()
    clearCounter()

    localStorage.setItem('alaa task',JSON.stringify(arrOfTasks))

     for (let i = 0; i < arrOfTasks.length; i++) {
        displayTasks(i)
    }


    if(localStorage.getItem('alaaColor')!=null)
{
  arrStorageOfTask=JSON.parse(localStorage.getItem('alaaColor'))

  
    for (let i = 0; i < arrStorageOfTask.length; i++) {
      
      if((arrStorageOfTask[i].taskID!=null||arrStorageOfTask[i].taskColor!=null))
      {
        console.log(arrStorageOfTask[i].taskID,arrStorageOfTask[i].taskColor)
        if((localStorage.getItem("alaa task")).length!=2){
          document.getElementById(`${arrStorageOfTask[i].taskID}`).style.backgroundColor=arrStorageOfTask[i].taskColor
  
          }
          else
          {

            localStorage.clear()
            location.reload();

          }
          
      }
 
    }
  

}


}


function clearInputs() {
    statusInput.value = "nextUp";
    categoryInput.value = "education";
    titleInput.value = "";
    descriptionInput.value = "";
  }


 function clearThreeContainers()
 {
    nextUpContainer.innerHTML=''
    inProgressContainer.innerHTML=''
    doneContainer.innerHTML=''
 }

function clearCounter()
{
    nextUpCount.innerHTML=0;
    inProgressCount.innerHTML=0;
    doneCount.innerHTML=0;

}
//  *Update tasks
let glopalIndex
 function getTaskInfo(index)
 {
    glopalIndex=index
    showModal()
    titleInput.value=arrOfTasks[index].title
    statusInput.value=arrOfTasks[index].status
    descriptionInput.value=arrOfTasks[index].description
    categoryInput.value=arrOfTasks[index].category

    addBtn.innerHTML="Update Task"
    addBtn.classList.remove('btn-new-task')
    addBtn.classList.add('btn-update')

 }

 function updateTask(glopalIndex)
 {
   arrOfTasks[glopalIndex].title=titleInput.value
   arrOfTasks[glopalIndex].status=statusInput.value
    arrOfTasks[glopalIndex].description=descriptionInput.value
    arrOfTasks[glopalIndex].category=categoryInput.value

    clearThreeContainers()
    clearCounter()

    localStorage.setItem('alaa task',JSON.stringify(arrOfTasks))

     for (let i = 0; i < arrOfTasks.length; i++) {
        displayTasks(i)
    }

    addBtn.innerHTML="Add Task"
    addBtn.classList.add('btn-new-task')
    addBtn.classList.remove('btn-update')
    clearInputs()
    hideModal()

    if(localStorage.getItem('alaaColor')!=null)
{

  arrStorageOfTask=JSON.parse(localStorage.getItem('alaaColor'))

  
    for (let i = 0; i < arrStorageOfTask.length; i++) {
      
      if((arrStorageOfTask[i].taskID!=null||arrStorageOfTask[i].taskColor!=null))
      {
        console.log(arrStorageOfTask[i].taskID,arrStorageOfTask[i].taskColor)
        if((localStorage.getItem("alaa task")).length!=2){
        document.getElementById(`${arrStorageOfTask[i].taskID}`).style.backgroundColor=arrStorageOfTask[i].taskColor

        }
        else
        {
          
        localStorage.clear()
        }

      }
 
    }
  

}
 }


// TODO: search
function searchTasks()
{
    clearThreeContainers()
    clearCounter()
    let searchValue=searchInput.value

    for (let i = 0; i < arrOfTasks.length; i++) {

        if(arrOfTasks[i].title.toLowerCase().includes(searchValue.toLowerCase())||
        arrOfTasks[i].category.toLowerCase().includes(searchValue.toLowerCase())|| 
        arrOfTasks[i].description.toLowerCase().includes(searchValue.toLowerCase())
        )
        {
            taskHTML=  `
            <div class="task" data-index="${i+1}" >
              <h3 class="text-capitalize">${arrOfTasks[i].title.replace(searchValue,`<span class="text-danger fw-bold">${searchValue}</span>`)}</h3>
              <p class="description text-capitalize">${arrOfTasks[i].description.replace(searchValue,`<span class="text-danger fw-bold">${searchValue}</span>`)}</p>
              <h4 class="category ${arrOfTasks[i].category} text-capitalize">${arrOfTasks[i].category.replace(searchValue,`<span class="text-danger fw-bold">${searchValue}</span>`)}</h4>
              <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
                <li><i class="bi bi-pencil-square" onclick="getTaskInfo(${i})"></i></li>
                <li><i class="bi bi-trash-fill" onclick="deleteTask(${i})"></i></li>
                <li><i class="bi bi-palette-fill" onclick="changeColor(event)"></i></li>
              </ul>
          </div>
          `
          setHTMLocation(arrOfTasks[i].status)            
        }
        
    }

    
}

searchInput.addEventListener("input",searchTasks)







// change the layout of tasks
var sections=document.querySelectorAll("section")
var taskModals=document.querySelectorAll('.task')

function changeToBars() {
 gridBtn.classList.remove("active")
 barsBtn.classList.add("active")

for (let i = 0; i < sections.length; i++) {
 
sections[i].classList.remove("col-md-6","col-lg-4")
sections[i].style.overflow="auto"
  
}

for (let b = 0; b < taskModals.length; b++) {
 
  taskModals[b].setAttribute("data-view","bars")
    
  }

}

function changeToGrid() {
  gridBtn.classList.add("active")
  barsBtn.classList.remove("active")
 
 for (let i = 0; i < sections.length; i++) {
  
 sections[i].classList.add("col-md-6","col-lg-4")
   
 }
 
 for (let b = 0; b < taskModals.length; b++) {
  
   taskModals[b].removeAttribute("data-view")
     
   }
 
 }


barsBtn.addEventListener("click",changeToBars)

gridBtn.addEventListener("click",changeToGrid)










// *generate random color
function generateColor() {
  var color = "#";
  var chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  for (var i = 1; i <= 6; i++) {
    var randonIndex = Math.trunc(Math.random() * 16);
    color += chars[randonIndex];
  }
  return color + "aa";
}
var taskCard
var myColor
var taskStorage
var arrStorageOfTask=[]
function changeColor(e) {
  
   taskCard = e.target.parentElement.parentElement.parentElement;

   myColor=generateColor()
   taskCard.style.backgroundColor = myColor;
  //  localStorage.setItem('storedId',taskCard.id);
  //  localStorage.setItem('storedValue',myColor);

   taskStorage=
   {
    taskID:taskCard.id,
    taskColor:myColor
   }
   arrStorageOfTask.push(taskStorage)

   localStorage.setItem('alaaColor',JSON.stringify(arrStorageOfTask))


}







if(localStorage.getItem('alaaColor')!=null)
{

  arrStorageOfTask=JSON.parse(localStorage.getItem('alaaColor'))

  
    for (let i = 0; i < arrStorageOfTask.length; i++) {
      
      if((arrStorageOfTask[i].taskID!=null||arrStorageOfTask[i].taskColor!=null))
      {
        console.log(arrStorageOfTask[i].taskID,arrStorageOfTask[i].taskColor)
        if((localStorage.getItem("alaa task")).length!=2){
        document.getElementById(`${arrStorageOfTask[i].taskID}`).style.backgroundColor=arrStorageOfTask[i].taskColor

        }
        else
        {
          
        localStorage.clear()
        }

      }
 
    }
  

}

console.log(localStorage.getItem("alaa task").length)

