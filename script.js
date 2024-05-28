document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const taskManager = document.getElementById('task-manager');
    const registerError = document.getElementById('register-error');
    const loginError = document.getElementById('login-error');
    const registerUsernameInput = document.getElementById('register-username');
    const registerPasswordInput = document.getElementById('register-password');
    const loginUsernameInput = document.getElementById('login-username');
    const loginPasswordInput = document.getElementById('login-password');
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');

    const tasks = [];
    const users = {};

    function register() {
        const username = registerUsernameInput.value.trim();
        const password = registerPasswordInput.value.trim();

        if (username && password) {
            if (users[username]) {
                registerError.textContent = 'Username already exists';
            } else {
                users[username] = password;
                registerError.textContent = '';
                showLoginForm();
            }
        } else {
            registerError.textContent = 'Please enter a username and password';
        }
    }

    function login() {
        const username = loginUsernameInput.value.trim();
        const password = loginPasswordInput.value.trim();

        if (users[username] === password) {
            loginForm.style.display = 'none';
            taskManager.style.display = 'block';
            loginError.textContent = '';
        } else {
            loginError.textContent = 'Invalid username or password';
        }
    }

    function logout() {
        loginForm.style.display = 'block';
        taskManager.style.display = 'none';
        loginUsernameInput.value = '';
        loginPasswordInput.value = '';
    }

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            tasks.push(taskText);
            renderTasks();
            newTaskInput.value = '';
        }
    }

    function editTask(index) {
        const newTaskText = prompt('Edit Task', tasks[index]);
        if (newTaskText) {
            tasks[index] = newTaskText.trim();
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'task-buttons';
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => editTask(index);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';
            deleteButton.onclick = () => deleteTask(index);
            buttonsDiv.appendChild(editButton);
            buttonsDiv.appendChild(deleteButton);
            li.appendChild(buttonsDiv);
            taskList.appendChild(li);
        });
    }

    function showRegisterForm() {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
        registerError.textContent = '';
    }

    function showLoginForm() {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        loginError.textContent = '';
    }

    window.register = register;
    window.login = login;
    window.logout = logout;
    window.addTask = addTask;
    window.showRegisterForm = showRegisterForm;
    window.showLoginForm = showLoginForm;
});
