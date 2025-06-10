  document.addEventListener('DOMContentLoaded', () => {
    async function getWeather() {
        const locationInput = document.getElementById('location-input').value;
        if (!locationInput) return alert('Please enter a location');

        try {
        // For example, using fixed lat/lon for now — we'll improve this later
        const response = await fetch('https://api.weather.gov/points/41.2524,-95.9980');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        console.log(data); // check API response in console

        // Example: extract forecast URL
        const forecastUrl = data.properties.forecast;

        // Fetch forecast data
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) throw new Error('Forecast fetch failed');
        const forecastData = await forecastResponse.json();

        // Display some weather info
        document.querySelector('.location-name').textContent = locationInput;
        document.querySelector('.temperature').textContent =
            forecastData.properties.periods[0].temperature + ' °' + forecastData.properties.periods[0].temperatureUnit;
        document.querySelector('.condition').textContent =
            forecastData.properties.periods[0].shortForecast;
        } catch (error) {
        alert('Error fetching weather: ' + error.message);
        }
    }

    document.getElementById('search-btn').addEventListener('click', getWeather);

    // Assuming you have an array of daily temps and dates:
    const dailyTemps = [70, 72, 68, 65, 74, 76, 73];
    const dailyDates = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const ctx = document.getElementById('tempChart').getContext('2d');

    const tempChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dailyDates,
            datasets: [{
                label: 'Daily Temperature (°F)',
                data: dailyTemps,
                borderColor: 'rgb(111, 154, 204)',
                backgroundColor: 'rgba(122, 140, 190, 0.3)',
                fill: true,
                tension: 0.3,
                pointRadius: 2,
                pointHoverRadius: 7,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: { color: '#eaeaea' },
                    grid: { color: 'rgba(234, 234, 234, 0.1)' }
                },
                x: {
                    ticks: { color: '#eaeaea' },
                    grid: { color: 'rgba(185, 148, 148, 0.1)' }
                }
            },
            plugins: {
                legend: { labels: { color: '#eaeaea' } }
            }
        }
    });
});

// Get the canvas and context for main chart
const ctxMain = document.getElementById('tempChartMain').getContext('2d');

// Create gradient for fill
const gradient = ctxMain.createLinearGradient(0, 0, 0, 200);
gradient.addColorStop(0, 'rgba(234, 234, 234, 0.6)');
gradient.addColorStop(0, 'rgba(234, 234, 234, 0.6)');
gradient.addColorStop(1, 'rgba(234, 234, 234, 0.1)');   // transparent at bottom

const dailyTempData = {
  labels: [
    '12 AM', '2 AM', '4 AM', '6 AM', '8 AM', '10 AM', '12 PM',
    '2 PM', '4 PM', '6 PM', '8 PM', '10 PM', '12 AM'
  ],
  datasets: [{
    label: 'Temperature (°F)',
    data: [60, 58, 57, 59, 65, 70, 75, 77, 74, 69, 65, 62, 60],
    fill: true,
    backgroundColor: gradient,
    borderColor: 'rgba(234, 234, 234, 0.9)',
    borderWidth: 2,
    tension: 0.4,
    pointRadius: 0,
  }]
};

const dailyTempOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: 'rgba(234,234,234,0.8)',
        maxRotation: 0,
        minRotation: 0,
      }
    },
    y: {
      grid: { display: false },
      ticks: {
        color: 'rgba(234,234,234,0.8)',
        beginAtZero: false,
      }
    }
  },
  elements: {
    line: {
      borderCapStyle: 'round',
    }
  },
  interaction: {
    intersect: false,
  },
  animation: {
    duration: 800,
    easing: 'easeOutQuart'
  }
};

// Create the chart
const dailyTempChart = new Chart(ctxMain, {
  type: 'line',
  data: dailyTempData,
  options: dailyTempOptions,
});
