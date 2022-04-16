let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});
  
  let formValidation = () => {
    if (textInput.value === "") {
      console.log("failure");
      msg.innerHTML = "Task cannot be blank";
    } else {
        acceptData()
        
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
    
        (() => {
          add.setAttribute("data-bs-dismiss", "");
        })();
    }
};

//this is how to collect data and save to the local storage
let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTask()
};

//create tasks
const createTask  = () =>{
    tasks.innerHTML = ''
    data.map((data , id) =>{
        return tasks.innerHTML += `
            <div id=${id}>
                <span class="fw-bold">${data.text}</span>
                <span class="small text-secondary">${data.date}</span>
                <p>${data.description}</p>

                <span class="options">
                    <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                    <i onClick ="deleteTask(this)" class="fas fa-trash-alt"></i>
                </span>
            </div>
        `
    })
    resetForm();
}

// to reset the input fields for the form
const resetForm = ()=>{
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
}

//delete a task
let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
  
    data.splice(e.parentElement.parentElement.id, 1);
  
    localStorage.setItem("data", JSON.stringify(data));
  
    console.log(data);
  };

//edit tasks

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
  
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
  
    deleteTask(e);
  };

  //how to get data from local storage 
  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTask();
  })();