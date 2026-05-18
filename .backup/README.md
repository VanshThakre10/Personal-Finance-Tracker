# Personal Finance Tracker Dashboard

A modern, responsive, and interactive Personal Finance Tracker Web Application built with HTML5, CSS3 (Tailwind CSS), and Vanilla JavaScript (ES6+).

## Features Implemented
- **Premium UI/UX:** Clean, dashboard-style interface with a Dark Premium theme and glassmorphism elements.
- **Budget Management:** Set a monthly budget and track your remaining balance dynamically.
- **Expense Tracking:** Add, edit, and delete expenses seamlessly without page reloads.
- **Dynamic Charts:** Visualize your spending with a beautifully integrated Chart.js Doughnut chart.
- **Search & Filtering:** Search expenses by title and filter by categories.
- **Dark/Light Mode:** Toggle between premium dark and light themes dynamically.
- **Persistent Storage:** All data (expenses, budget, theme) is saved using LocalStorage.
- **Responsive Design:** Optimized to look great on desktop, tablet, and mobile devices.

## Tech Stack
- **Frontend Framework:** Tailwind CSS
- **JavaScript:** Vanilla ES6+
- **Data Visualization:** Chart.js
- **Storage:** Browser LocalStorage
- **Icons:** FontAwesome

## Folder Structure
```text
finance-tracker/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
└── js/
    ├── script.js
    ├── storage.js
    └── chart.js
```

## How LocalStorage Works
The application uses the browser's `localStorage` API to ensure data persists across sessions. The `storage.js` module handles all read/write operations for:
- `financeTracker_expenses`
- `financeTracker_budget`
- `financeTracker_theme`

## Presentation Script (5-10 Minute Demo)

### Introduction
> "Hello everyone. Today I'm excited to present my Personal Finance Tracker Dashboard. I built this application using HTML, Tailwind CSS, and Vanilla JavaScript to demonstrate my skills in frontend architecture, state management, and UI/UX design."

### Dashboard Overview
> "When you open the application, you're greeted with a premium dashboard. At the top, we have summary cards giving an immediate overview: Total Budget, Total Expenses, and Remaining Budget. The UI is fully responsive, ensuring a seamless experience whether you're on a desktop or mobile device."

### Expense Tracking & Budgeting
> "Let's set a budget. I'll enter $2000. Notice how the 'Remaining Budget' card updates instantly, and a custom toast notification confirms the action. Now, let's add an expense. I'll add 'Groceries' for $150 under the 'Food' category. As soon as I click 'Add Expense', the list updates, the remaining budget calculates, and the data is saved."

### Dynamic Charts & Filtering
> "To help users visualize their spending, I integrated Chart.js. The doughnut chart here dynamically reflects the proportion of expenses across categories. If I want to find a specific expense, I can use the real-time search bar or filter by category. The list and the chart instantly update to reflect the filtered data."

### Storage & Theming
> "A key technical feature is data persistence. If I refresh the page, all my data remains exactly as it was. This is achieved using modular LocalStorage functions. Additionally, for accessibility and user preference, I implemented a theme toggle. Clicking this moon icon switches the app to a crisp light mode, which is also saved to LocalStorage."

### Conclusion & Future Improvements
> "Building this application taught me a lot about managing DOM state without a heavy framework. In the future, I plan to add features like CSV exporting, user authentication, and historical data tracking across different months. Thank you for your time!"
