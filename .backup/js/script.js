// App State initialized from LocalStorage
let expenses = Storage.getExpenses();
let budget = Storage.getBudget();
let currentTheme = Storage.getTheme();

// DOM Elements
const budgetForm = document.getElementById('budgetForm');
const budgetInput = document.getElementById('budgetInput');
const expenseForm = document.getElementById('expenseForm');
const expenseTitle = document.getElementById('expenseTitle');
const expenseAmount = document.getElementById('expenseAmount');
const expenseCategory = document.getElementById('expenseCategory');
const expenseDate = document.getElementById('expenseDate');
const editExpenseId = document.getElementById('editExpenseId');
const submitExpenseBtn = document.getElementById('submitExpenseBtn');

const expenseList = document.getElementById('expenseList');
const emptyState = document.getElementById('emptyState');

const displayBudget = document.getElementById('displayBudget');
const displayExpenses = document.getElementById('displayExpenses');
const displayRemaining = document.getElementById('displayRemaining');

const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');
const themeToggle = document.getElementById('themeToggle');

// Initialize App
function init() {
    applyTheme(currentTheme);

    // Set default date to today
    document.getElementById('expenseDate').valueAsDate = new Date();
    
    // Set current date in header
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', dateOptions);

    renderExpenses();
    updateSummary();
}

// Format Currency
const formatMoney = (amount) => {
    return parseFloat(amount).toFixed(2);
};

// Update Dashboard Summary
function updateSummary() {
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remaining = budget - totalExpenses;

    displayBudget.innerText = formatMoney(budget);
    displayExpenses.innerText = formatMoney(totalExpenses);
    displayRemaining.innerText = formatMoney(remaining);

    // Color coding for remaining budget
    if (remaining < 0) {
        displayRemaining.classList.remove('text-white', 'text-gray-900');
        displayRemaining.classList.add('text-neonRed');
    } else {
        displayRemaining.classList.remove('text-neonRed');
        displayRemaining.classList.add(currentTheme === 'light' ? 'text-gray-900' : 'text-white');
    }
}

// Generate unique ID
function generateID() {
    return Math.floor(Math.random() * 100000000).toString();
}

// Get Category Icon & Color
function getCategoryStyle(category) {
    const styles = {
        'Food': { icon: 'fa-utensils', color: 'text-orange-500', bg: 'bg-orange-400/20' },
        'Travel': { icon: 'fa-plane', color: 'text-blue-500', bg: 'bg-blue-400/20' },
        'Shopping': { icon: 'fa-bag-shopping', color: 'text-purple-500', bg: 'bg-purple-400/20' },
        'Bills': { icon: 'fa-file-invoice-dollar', color: 'text-red-500', bg: 'bg-red-400/20' },
        'Entertainment': { icon: 'fa-film', color: 'text-pink-500', bg: 'bg-pink-400/20' },
        'Health': { icon: 'fa-heart-pulse', color: 'text-green-500', bg: 'bg-green-400/20' },
        'Other': { icon: 'fa-tag', color: 'text-gray-500', bg: 'bg-gray-400/20' }
    };
    return styles[category] || styles['Other'];
}

// Step 5: Budget Management System
function handleBudgetSubmit(e) {
    e.preventDefault();
    const newBudget = parseFloat(budgetInput.value);
    if (!isNaN(newBudget) && newBudget >= 0) {
        budget = newBudget;
        Storage.saveBudget(budget);
        budgetInput.value = '';
        updateSummary();
        showToast('Budget updated successfully!');
    }
}

// Premium feature: Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-neonBlue text-darkBase px-6 py-3 rounded-lg shadow-lg font-medium animate-fade-in z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Add or Update Expense
function handleExpenseSubmit(e) {
    e.preventDefault();

    const title = expenseTitle.value.trim();
    const amount = parseFloat(expenseAmount.value);
    const category = expenseCategory.value;
    const date = expenseDate.value;
    const isEditing = editExpenseId.value !== '';

    if (!title || isNaN(amount) || !category || !date) {
        showToast('Please fill in all fields correctly.');
        return;
    }

    if (isEditing) {
        expenses = expenses.map(exp => {
            if (exp.id === editExpenseId.value) {
                return { ...exp, title, amount, category, date };
            }
            return exp;
        });
        
        editExpenseId.value = '';
        submitExpenseBtn.textContent = 'Add Expense';
        submitExpenseBtn.classList.replace('bg-orange-500/10', 'bg-neonGreen/10');
        submitExpenseBtn.classList.replace('text-orange-500', 'text-neonGreen');
        submitExpenseBtn.classList.replace('border-orange-500/50', 'border-neonGreen/50');
        showToast('Expense updated!');
    } else {
        const newExpense = {
            id: generateID(),
            title,
            amount,
            category,
            date
        };
        expenses.unshift(newExpense); // Add to beginning
        showToast('Expense added!');
    }

    Storage.saveExpenses(expenses);

    expenseTitle.value = '';
    expenseAmount.value = '';
    expenseCategory.value = '';
    expenseDate.valueAsDate = new Date();

    renderExpenses();
    updateSummary();
}

// Delete Expense
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    Storage.saveExpenses(expenses);
    renderExpenses();
    updateSummary();
    showToast('Expense deleted!');
}

// Edit Expense
function editExpense(id) {
    const expense = expenses.find(exp => exp.id === id);
    if (!expense) return;

    expenseTitle.value = expense.title;
    expenseAmount.value = expense.amount;
    expenseCategory.value = expense.category;
    expenseDate.value = expense.date;
    editExpenseId.value = expense.id;

    submitExpenseBtn.textContent = 'Update Expense';
    submitExpenseBtn.classList.replace('bg-neonGreen/10', 'bg-orange-500/10');
    submitExpenseBtn.classList.replace('text-neonGreen', 'text-orange-500');
    submitExpenseBtn.classList.replace('border-neonGreen/50', 'border-orange-500/50');
}

// Step 8: Search and Filter Logic
function getFilteredExpenses() {
    const searchTerm = searchInput.value.toLowerCase();
    const filter = filterCategory.value;
    
    return expenses.filter(expense => {
        const matchesSearch = expense.title.toLowerCase().includes(searchTerm);
        const matchesFilter = filter === 'All' || expense.category === filter;
        return matchesSearch && matchesFilter;
    });
}

// Render Expenses to DOM
function renderExpenses() {
    expenseList.innerHTML = '';
    const filtered = getFilteredExpenses();

    if (filtered.length === 0) {
        expenseList.appendChild(emptyState);
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        
        filtered.forEach(expense => {
            const style = getCategoryStyle(expense.category);
            
            const expenseEl = document.createElement('div');
            expenseEl.classList.add('bg-darkBase', 'border', 'border-gray-800', 'rounded-xl', 'p-4', 'flex', 'justify-between', 'items-center', 'animate-fade-in', 'hover:border-neonBlue', 'transition-colors');
            
            expenseEl.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-lg ${style.bg} flex items-center justify-center ${style.color}">
                        <i class="fa-solid ${style.icon}"></i>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-100 title-text">${expense.title}</h4>
                        <div class="text-xs text-gray-500 flex items-center gap-2 mt-1">
                            <span class="bg-gray-800 px-2 py-0.5 rounded border border-gray-700">${expense.category}</span>
                            <span>${expense.date}</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <span class="font-bold text-white amount-text">$${formatMoney(expense.amount)}</span>
                    <div class="flex gap-2">
                        <button onclick="editExpense('${expense.id}')" class="w-8 h-8 rounded-lg bg-gray-800 hover:bg-orange-500/20 text-gray-400 hover:text-orange-500 transition-colors flex items-center justify-center">
                            <i class="fa-solid fa-pen text-sm"></i>
                        </button>
                        <button onclick="deleteExpense('${expense.id}')" class="w-8 h-8 rounded-lg bg-gray-800 hover:bg-neonRed/20 text-gray-400 hover:text-neonRed transition-colors flex items-center justify-center">
                            <i class="fa-solid fa-trash text-sm"></i>
                        </button>
                    </div>
                </div>
            `;
            
            expenseList.appendChild(expenseEl);
        });
    }

    // Step 9: Notify Chart to update
    if (typeof updateChart === 'function') {
        updateChart(filtered);
    }
}

// Step 10: Theme Management
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun text-yellow-500"></i>';
        document.querySelector('html').classList.remove('dark');
    } else {
        document.body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon text-neonBlue"></i>';
        document.querySelector('html').classList.add('dark');
    }
    updateSummary();
    
    // Re-render chart to update label colors
    if (typeof updateChart === 'function') {
        updateChart(getFilteredExpenses());
    }
}

// Event Listeners
expenseForm.addEventListener('submit', handleExpenseSubmit);
budgetForm.addEventListener('submit', handleBudgetSubmit);
searchInput.addEventListener('input', renderExpenses);
filterCategory.addEventListener('change', renderExpenses);
themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    Storage.saveTheme(currentTheme);
    applyTheme(currentTheme);
});

// Run init
init();
