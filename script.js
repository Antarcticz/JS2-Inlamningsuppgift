const BASE_URL = "https://jsonplaceholder.typicode.com/todos/"
const tasks = []

const taskList = document.querySelector('#taskList')
const form = document.querySelector('#form')

const getTasks = async () => {
    const res = await fetch(BASE_URL)
    const data = await res.json()
  
    console.log(data)
    data.forEach(task => {
      tasks.push(task)
    })
    listTasks()
  }
  
  
  getTasks()
  // console.log(tasks)
  
  const listTasks = () => {
    taskList.innerHTML = ''
  
    tasks.forEach(task => {
      
      const taskElement = createTaskElement(task)
      taskList.appendChild(taskElement)
    })
  }
  
  
  const createTaskElement = (taskData) => {
    let task = document.createElement('div')
    task.id = taskData.id
    task.classList.add('task-group-1')
  
    let todo = document.createElement('p')
    todo.classList.add('task-todo')
    todo.innerText = taskData.todo
    
    
    let when = document.createElement('p')
    when.classList.add('task_when')
    when.innerText = taskData.when
    
    let where = document.createElement('p')
    where.classList.add('task_where')
    where.innerText = taskData.where
    
    let description = document.createElement('p')
    description.classList.add('task_description')
    description.innerText = taskData.description

    task.appendChild(todo)
    task.appendChild(when)
    task.appendChild(where)
    task.appendChild(description)
  
    return task
  }
  
  const removetask = e => {
    if(!e.target.classList.contains('task')){
      console.log('klickade inte på en div')
      return
    }
  
    fetch(BASE_URL + e.target.id, {
      method: 'DELETE'
    })
      .then(res => {
        console.log(res)
        if(res.ok) {
          e.target.remove()
          const index = tasks.findIndex(task => task.id == e.target.id)
          tasks.splice(index, 1)
          console.log(tasks)
        }
      })
  }
  
  const handleSubmit = e => {
    e.preventDefault()
    // tbd Validera formuläret.
  
  
    const newtask = {
      todo: document.querySelector('#to-do').value,
      when: document.querySelector('#when').value,
      where: document.querySelector('#where').value,
      description: document.querySelector('#description').value,
    //   company: {
    //     todo: document.querySelector('#where').value,
    //   }
    }
  
    fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(newtask),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
  
      tasks.push(data)
      const taskElement = createtaskElement(data)
      taskList.appendChild(taskElement)
    });
  
  }
  
  taskList.addEventListener('click', removetask)
  form.addEventListener('submit', handleSubmit)