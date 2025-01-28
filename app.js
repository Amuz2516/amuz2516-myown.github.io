// Tab Navigation
function openTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Initialize first tab
openTab('todo');

// To-Do List
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    const input = document.getElementById('todoInput');
    if (input.value.trim() === '') return;

    todos.push({
        text: input.value,
        completed: false
    });

    input.value = '';
    saveTodos();
    renderTodos();
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${index})">
            <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
        `;
        list.appendChild(li);
    });
}

// Initial render
renderTodos();

// Budget Tracker
let budget = JSON.parse(localStorage.getItem('budget')) || {
    total: 0,
    expenses: []
};

function saveBudget() {
    localStorage.setItem('budget', JSON.stringify(budget));
}

function setBudget() {
    const input = document.getElementById('totalBudget');
    budget.total = Number(input.value);
    input.value = '';
    saveBudget();
    renderBudget();
}

function addExpense() {
    const nameInput = document.getElementById('expenseName');
    const amountInput = document.getElementById('expenseAmount');
    
    budget.expenses.push({
        name: nameInput.value,
        amount: Number(amountInput.value)
    });

    nameInput.value = '';
    amountInput.value = '';
    saveBudget();
    renderBudget();
}

function renderBudget() {
    const remaining = budget.total - budget.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const display = document.getElementById('budgetDisplay');
    const list = document.getElementById('expensesList');

    display.innerHTML = `<h3>Remaining Budget: $${remaining}</h3>`;
    list.innerHTML = '';
    
    budget.expenses.forEach(exp => {
        const li = document.createElement('li');
        li.textContent = `${exp.name}: -$${exp.amount}`;
        list.appendChild(li);
    });
}

// Initial render
renderBudget();

// Contacts Manager
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function addContact() {
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const date = document.getElementById('contactDate');

    if (!name.value || !email.value) return;

    contacts.push({
        name: name.value,
        email: email.value,
        date: date.value || new Date().toISOString().split('T')[0]
    });

    name.value = '';
    email.value = '';
    date.value = '';
    saveContacts();
    renderContacts();
}

function deleteContact(index) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
}

function renderContacts() {
    const list = document.getElementById('contactsList');
    list.innerHTML = '';
    
    contacts.forEach((contact, index) => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <div style="flex: 1">
                <h3>${contact.name}</h3>
                <p>${contact.email}</p>
                <small>${contact.date}</small>
            </div>
            <button class="danger" onclick="deleteContact(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        list.appendChild(div);
    });
}

// Grocery List
let groceries = JSON.parse(localStorage.getItem('groceries')) || [];

function saveGroceries() {
    localStorage.setItem('groceries', JSON.stringify(groceries));
}

function addGrocery() {
    const input = document.getElementById('groceryItem');
    if (!input.value.trim()) return;

    groceries.push({
        item: input.value,
        purchased: false
    });

    input.value = '';
    saveGroceries();
    renderGroceries();
}

function toggleGrocery(index) {
    groceries[index].purchased = !groceries[index].purchased;
    saveGroceries();
    renderGroceries();
}

function deleteGrocery(index) {
    groceries.splice(index, 1);
    saveGroceries();
    renderGroceries();
}

function renderGroceries() {
    const list = document.getElementById('groceryList');
    list.innerHTML = '';
    
    groceries.forEach((grocery, index) => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <input type="checkbox" ${grocery.purchased ? 'checked' : ''} 
                   onchange="toggleGrocery(${index})">
            <span style="flex: 1; ${grocery.purchased ? 'opacity: 0.6; text-decoration: line-through' : ''}">
                ${grocery.item}
            </span>
            <button class="danger" onclick="deleteGrocery(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        list.appendChild(div);
    });
}

// Initialize all sections
window.onload = function() {
    renderTodos();
    renderBudget();
    renderContacts();
    renderGroceries();
};