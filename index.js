document.addEventListener('DOMContentLoaded', () => {
    const filterInput = document.getElementById('filter-input');
    const transactionsTable = document.getElementById('transactions-table').getElementsByTagName('tbody')[0];
    const transactionChartCtx = document.getElementById('transaction-chart').getContext('2d');
    let customers = [];
    let transactions = [];
    let filteredTransactions = [];
    let transactionChart; // Variable to store the chart instance
  
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data');
        const data = await response.json();
        console.log(data)
        customers = data.customers;
        transactions = data.transactions;
        filteredTransactions = transactions;
        renderTable();
        renderChart();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Render the transactions table
    const renderTable = () => {
      transactionsTable.innerHTML = '';
      filteredTransactions.forEach(transaction => {
        const customer = customers.find(customer => customer.id === transaction.customerId);
        const row = transactionsTable.insertRow();
        row.insertCell(0).textContent = customer.name;
        row.insertCell(1).textContent = transaction.amount;
        row.insertCell(2).textContent = transaction.date;
      });
    };
  
    // Render the chart
    const renderChart = () => {
      const groupedTransactions = filteredTransactions.reduce((acc, transaction) => {
        const date = transaction.date;
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += transaction.amount;
        return acc;
      }, {});
  
      const labels = Object.keys(groupedTransactions);
      const data = {
        labels,
        datasets: [
          {
            label: 'Total Transaction Amount',
            data: Object.values(groupedTransactions),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          }
        ],
      };
  
      // Destroy the existing chart if it exists
      if (transactionChart) {
        transactionChart.destroy();
      }
  
      // Create a new chart
      transactionChart = new Chart(transactionChartCtx, {
        type: 'line',
        data,
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Amount'
              }
            }
          }
        }
      });
    };
  
    // Filter transactions based on input
    filterInput.addEventListener('input', () => {
      const filter = filterInput.value.toLowerCase();
      filteredTransactions = transactions.filter(transaction => {
        const customer = customers.find(customer => customer.id === transaction.customerId);
        return customer.name.toLowerCase().includes(filter) || transaction.amount.toString().includes(filter);
      });
      renderTable();
      renderChart();
    });
  
    fetchData();
  });
  