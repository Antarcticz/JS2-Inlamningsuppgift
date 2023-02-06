const API_URL = 'https://jsonplaceholder.typicode.com/todos?page=1&_limit=7/';
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos/';


const form = document.querySelector('#form');
const output = document.querySelector('#output');
const btnAdd = document.querySelector('#add');
const modal = document.querySelector('#modal');
const closeButton = document.querySelector('#close-button');

const todoArray = [];

const getTodos = async () => {
    const res = await fetch(API_URL);
    const todos = await res.json();

    todos.forEach(todo => {
        todoArray.push(todo);

        listTodos();
    });
};
getTodos();

const listTodos = () => {
    output.innerHTML = '';
    todoArray.forEach(todo => {
        const todoElement = createTodoElement(todo);
        output.appendChild(todoElement);
    });
};

const createTodoElement = (todo) => {
    const card = document.createElement('div');
    card.className = 'item';
    card.id = todo.id;

    const title = document.createElement('p');
    title.innerText = todo.title;

    const btnDone = document.createElement('button');
    btnDone.innerText = 'Done';
    btnDone.className = 'btnDone btnStyle';
    if (todo.completed) {
        title.classList.add('line-over');
        btnDone.classList.add('completed');
    };
    
    btnDone.addEventListener('click', () => {
        title.classList.toggle('line-over');
        btnDone.classList.toggle('completed');
    });

    const btnUndo = document.createElement('button');
    btnUndo.innerText = 'Undo';
    btnUndo.className = 'btnUndo btnStyle';
    
    btnUndo.addEventListener('click', () => {
        title.classList.remove('line-over');
        btnDone.classList.remove('completed');
    });

    const btnDelete = document.createElement('button');
    btnDelete.innerText = 'Delete';
    btnDelete.className = 'btnDelete btnStyle';

    btnDelete.addEventListener('click', () => {

        if (btnDone.classList.contains('completed')) {
            btnDelete.parentElement.remove();

            fetch(BASE_URL + "/" + btnDelete.parentElement.id, {
                method: 'DELETE',
            })
            .then(res => {
                if (res.ok) {
                    btnDelete.parentElement.remove();

                    const index = todoArray.findIndex((todo) => todo.id == todo);
                    todoArray.splice(index, 1);

                    console.log(todoArray);
                };
            });
        }
        else {
            modal.style.display = 'block';
        };

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });

    card.appendChild(title);
    card.appendChild(btnDone);
    card.appendChild(btnUndo);
    card.appendChild(btnDelete);

    return card;
};

form.addEventListener("submit", e => {
    e.preventDefault();
  
    let inputTodo = document.querySelector('textarea[type="text"]').value;

    if (inputTodo == '') {
        alert(`Todo input can't be empty`);

        return false;
    } 
    else {
        const newTodo = {
            title: inputTodo,
            completed: false,
        };
        fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((res) => res.json())

        .then((todo) => {
            todoArray.push(todo);

            const todoElement = createTodoElement(todo);
            output.prepend(todoElement);
        });
        form.reset();
    };
});