const API_URL = 'https://jsonplaceholder.typicode.com/todos?page=1337&_limit=7/';
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos/';

const form = document.querySelector('#form');
const output = document.querySelector('#output');
const btnAdd = document.querySelector('#add');
const modal = document.querySelector('#modal');
const closeButton = document.querySelector('#close-button');

let listArray = [];

const getTodos = async () => {
    const res = await fetch(API_URL);
    const todos = await res.json();

    console.log(todos);

    todos.forEach(todo => {
        output.appendChild(createElement(todo));
    });
};

getTodos();

const createElement = (todo) => {
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
                method: 'DELETE'
            });
        }
        else {
            openModal = () => {
                modal.style.display = 'block';
            };
            openModal();
        };

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {

            if (e.target == modal) {
                modal.style.display = 'none';
            };
        });
    });

    card.appendChild(title);
    card.appendChild(btnDone);
    card.appendChild(btnUndo);
    card.appendChild(btnDelete);

    return card;
};

form.addEventListener('submit', e => {
    e.preventDefault();

    const newTodo = {
        title: document.querySelector('#text').value,
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
        const card = createElement(todo);
        document.querySelector('#output').appendChild(card);
        console.log(todo);
    });
});

empty = () => {
    const input = document.querySelector('#text').value;

    if (input.trim() == '') {
        alert(`Todo can't be empty`);

        return false;
    };
};