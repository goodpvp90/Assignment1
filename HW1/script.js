// Fake historical data for multiple cryptocurrencies
const historicalData = {
  BTC: [30000, 45000, 32000, 50000, 40000, 56321],  // Bitcoin
  ETH: [1500, 2500, 2000, 3000, 2500, 1823],         // Ethereum
  ADA: [0.20, 0.35, 0.30, 0.40, 0.29, 0.29],         // Cardano
};

const cryptoSelect = document.getElementById('crypto-select');
const highestPriceElement = document.getElementById('highest-price');
const lowestPriceElement = document.getElementById('lowest-price');
const averagePriceElement = document.getElementById('average-price');
const ctx = document.getElementById('price-chart').getContext('2d');

let priceChart;

// Function to calculate statistics (highest, lowest, average)
function calculateStatistics(data) {
  const highest = Math.max(...data);
  const lowest = Math.min(...data);
  const average = (data.reduce((sum, value) => sum + value, 0) / data.length).toFixed(2);
  return { highest, lowest, average };
}

// Function to populate the crypto price table with fake data
function populateCryptoTable() {
  const cryptoData = [
    { name: 'Bitcoin', symbol: 'BTC', price: 56321 },
    { name: 'Ethereum', symbol: 'ETH', price: 1823 },
    { name: 'Cardano', symbol: 'ADA', price: 0.29 }
  ];

  const tableBody = document.getElementById('crypto-table-body');
  cryptoData.forEach((crypto) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="py-2 px-4">${crypto.name}</td>
      <td class="py-2 px-4">${crypto.symbol}</td>
      <td class="py-2 px-4 text-right">$${crypto.price.toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to create and update the chart
function createChart(crypto) {
  // Destroy the previous chart if it exists
  if (priceChart) {
    priceChart.destroy();
  }

  const data = historicalData[crypto];
  const stats = calculateStatistics(data);

  // Update statistics
  highestPriceElement.textContent = `$${stats.highest.toLocaleString()}`;
  lowestPriceElement.textContent = `$${stats.lowest.toLocaleString()}`;
  averagePriceElement.textContent = `$${stats.average}`;

  // Create a new chart
  priceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: `${crypto} Price (USD)`,
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,  // Maintain aspect ratio of the chart
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

// Initial chart and stats update for Bitcoin (BTC)
createChart('BTC');

// Event listener for cryptocurrency selection
cryptoSelect.addEventListener('change', (e) => {
  createChart(e.target.value);
});

// Initial population of the crypto price table with fake data
populateCryptoTable();
