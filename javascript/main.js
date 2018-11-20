class Task{
    constructor(name){
        this.name = name;
        this.isComplete = false;

    }

    complete(){
        this.isComplete = true;
    }

}

class TaskList {
    constructor(name){
        this.name = name;
        this.tasks = [];
    
    }

    addTasks(task, element){
        this.tasks.push(task);
        
        //las mandamos al DOM
        this.renderTasks(element)
    
    }


    removeTask(index , element){
        this.tasks.splice(index , 1);
        this.renderTasks(element)
    }

    renderTasks(element){
        //preparando la lista para enviarla al DOM
        let tasks = this.tasks.map( task =>
            ` 
        <li class="task-item 
        ${task.isComplete ? 'complete' : ''}">
          
        <input type="checkbox"
                 ${task.isComplete ? 'checked' : ''} class="task-complete-button">
        <span class="task-name">${task.name}</span>
 
        <a href="#" class="task-remove-button"> X </a>

        </li>
        ` );

        //enviando las tareas al DOM
        element.innerHTML = tasks.reduce((a , b) => a + b , '');
    }

}

//Trabajar con el DOM

      const addTaskElement = document.getElementById('add-task'),
      taskContainerElement= document.getElementById('list-container');



      const inbox = new TaskList('inbox')

    //add task from to DOM

    function addtaskDom(event , list = inbox){
        //obtener el texto del input
       if(event.key === 'Enter'){
           let newTask = new Task(this.value);

           list.addTasks(newTask , taskContainerElement)

           this.value = '';
       }
        
        //crear la tarea instanciando la clase
        //añadir la tarea a la lista
        console.log( event.key);
    }

      addTaskElement.addEventListener('keyup' , addtaskDom)
       
      
      //conseguir elementos 

      function getTaskIndex(e){
          let taskItem = e.target.parentElement,
          listItems = [...taskContainerElement.querySelectorAll('li')];
          return  listItems.indexOf(taskItem)
      }
      
      //eliminar tarea
      
      
      
      
      function removetaskDom(e , list = inbox){
          
          if    (e.target.tagName === 'A'){
                 list.removeTask(getTaskIndex(e) , taskContainerElement)    
            }
      }

      taskContainerElement.addEventListener('click' , removetaskDom)

function completaskDom( e , list = inbox) {

    if (e.target.tagName === 'INPUT') {
      list.tasks[getTaskIndex(e)].complete();
      e.target.parentElement.classList.toggle('complete')
      console.table(list.tasks);
    }
}

taskContainerElement.addEventListener('click', completaskDom); 