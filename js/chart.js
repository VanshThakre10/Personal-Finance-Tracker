// Step 9: Chart.js Integration

let expenseChartInstance = null;

function updateChart(expenses) {
    const ctx = document.getElementById('expenseChart');
    if (!ctx) return;

    // Calculate totals per category
    const categoryTotals = {};
    expenses.forEach(exp => {
        if (!categoryTotals[exp.category]) {
            categoryTotals[exp.category] = 0;
        }
        categoryTotals[exp.category] += exp.amount;
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    // Dynamic coloring matching the UI accents
    const colors = {
        'Food': '#fb923c', // orange-400
        'Travel': '#3b82f6', // blue-500
        'Shopping': '#a855f7', // purple-500
        'Bills': '#ef4444', // red-500
        'Entertainment': '#ec4899', // pink-500
        'Health': '#22c55e', // green-500
        'Other': '#6b7280'  // gray-500
    };

    const backgroundColors = labels.map(label => colors[label] || colors['Other']);
    const isLightMode = document.body.classList.contains('light-mode');
    const labelColor = isLightMode ? '#475569' : '#9ca3af';

    if (expenseChartInstance) {
        expenseChartInstance.data.labels = labels;
        expenseChartInstance.data.datasets[0].data = data;
        expenseChartInstance.data.datasets[0].backgroundColor = backgroundColors;
        expenseChartInstance.options.plugins.legend.labels.color = labelColor;
        expenseChartInstance.update();
    } else {
        expenseChartInstance = new Chart(ctx, {
            type: 'doughnut', // Doughnut looks more premium than pie
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 0,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: labelColor,
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                family: "'Inter', sans-serif",
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleFont: { family: "'Inter', sans-serif" },
                        bodyFont: { family: "'Inter', sans-serif" },
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
}
