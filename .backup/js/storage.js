// Step 6: LocalStorage operations

const STORAGE_KEYS = {
    EXPENSES: 'financeTracker_expenses',
    BUDGET: 'financeTracker_budget',
    THEME: 'financeTracker_theme'
};

const Storage = {
    getExpenses: () => {
        const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
        return data ? JSON.parse(data) : [];
    },
    saveExpenses: (expenses) => {
        localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    },
    getBudget: () => {
        const data = localStorage.getItem(STORAGE_KEYS.BUDGET);
        return data ? parseFloat(data) : 0;
    },
    saveBudget: (budget) => {
        localStorage.setItem(STORAGE_KEYS.BUDGET, budget.toString());
    },
    getTheme: () => {
        return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    },
    saveTheme: (theme) => {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }
};
