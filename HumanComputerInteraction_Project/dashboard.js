// Check if the user is an admin
const UD = JSON.parse(localStorage.getItem('userData'));
const isAdmin = (UD && UD.firstName === 'ADMIN');

// Simulated cumulative PNL data for the line chart
const pnlData = isAdmin ? [
    { timestamp: new Date('2024-05-26T08:00:00'), pnl: 0 },
    { timestamp: new Date('2024-05-27T09:30:00'), pnl: 573 },
    { timestamp: new Date('2024-05-28T10:45:00'), pnl: 2123 },
    { timestamp: new Date('2024-05-29T11:15:00'), pnl: 231 },
    { timestamp: new Date('2024-05-30T12:30:00'), pnl: 1534 }
    // Add more data points as needed
] : [];

// Calculate profit gained from PNL data for the line chart
const profitGainedData = isAdmin ? pnlData.map((dataPoint, index) => {
    const profit = dataPoint.pnl - pnlData[0].pnl; // Calculate profit gained relative to the initial PNL
    return { timestamp: dataPoint.timestamp, profit };
}) : [];

// Prepare data for Google Charts API for the line chart
const lineChartData = isAdmin ? [['Timestamp', 'Profit Gained']] : [];
profitGainedData.forEach(dataPoint => {
    lineChartData.push([dataPoint.timestamp, dataPoint.profit]);
});

// Load Google Charts API and create the line chart
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawLineChart);

function drawLineChart() {
    let dataTable;
    if (isAdmin) {
        dataTable = google.visualization.arrayToDataTable(lineChartData);
    } else {
        dataTable = google.visualization.arrayToDataTable([
            ['Timestamp', 'Profit Gained'],
            ['', 0], // Empty data for non-admin users
        ]);
    }

    const options = {
        title: 'Profit Gained Over Time',
        curveType: 'function', // Use a smooth curve for the line
        legend: { position: 'bottom' }, // Display legend at the bottom
        legendTextStyle: { color: '#FFF' },
        titleTextStyle: { color: '#FFF' },
        backgroundColor: { fill:'transparent' },
        hAxis: {
            textStyle:{color: '#FFF'},
            gridlines: {color: 'transparent'}
        },
        vAxis: {
            textStyle:{color: '#FFF'},
        }
    };
    const chart = new google.visualization.LineChart(document.getElementById('line_chart'));
    chart.draw(dataTable, options);
}

// Simulated data for the pie chart
const assetValues = isAdmin ? [['Asset', 'Value']] : [];
if (isAdmin) {
    assetValues.push(['Stocks', 5000]);
    assetValues.push(['Bonds', 3000]);
    assetValues.push(['Commodities', 2000]);
}

// Load Google Charts API and create the pie chart
google.charts.setOnLoadCallback(drawPieChart);

function drawPieChart() {
    let dataTable;
    if (isAdmin) {
        dataTable = google.visualization.arrayToDataTable(assetValues);
    } else {
        dataTable = google.visualization.arrayToDataTable([
            ['Asset', 'Value'],
            ['', JSON.parse(localStorage.getItem('userData')).balance], // Empty data for non-admin users
        ]);
    }

    const options = {
        title: 'Asset Allocation',
        width: '100%', // Set chart width
        height: '100%', // Set chart height
        legendTextStyle: { color: '#FFF' },
        titleTextStyle: { color: '#FFF' },
        backgroundColor: { fill:'transparent' },
    };
    const chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
    chart.draw(dataTable, options);
}

// Simulated data for the balance chart
const balanceData = isAdmin ? [
    { timestamp: new Date('2024-05-26T08:00:00'), balance: 10000 },
    { timestamp: new Date('2024-05-27T09:30:00'), balance: 10500 },
    { timestamp: new Date('2024-05-28T10:45:00'), balance: 11500 },
    { timestamp: new Date('2024-05-29T11:15:00'), balance: 12000 },
    { timestamp: new Date('2024-05-30T12:30:00'), balance: 13500 }
    // Add more data points as needed
] : [];

// Prepare data for Google Charts API for the balance chart
const balanceChartData = isAdmin ? [['Timestamp', 'Balance']] : [];
balanceData.forEach(dataPoint => {
    balanceChartData.push([dataPoint.timestamp, dataPoint.balance]);
});

// Load Google Charts API and create the balance chart
google.charts.setOnLoadCallback(drawBalanceChart);

function drawBalanceChart() {
    if (isAdmin) {
        const dataTable = google.visualization.arrayToDataTable(balanceChartData);
        const options = {
            title: 'Balance Over Time',
            curveType: 'function', // Use a smooth curve for the line
            legend: { position: 'bottom' }, // Display legend at the bottom
            legendTextStyle: { color: '#FFF' },
            titleTextStyle: { color: '#FFF' },
            backgroundColor: { fill:'transparent' },
            hAxis: {
                textStyle:{color: '#FFF'},
                gridlines: {color: 'transparent'}
            },
            vAxis: {
                textStyle:{color: '#FFF'},
            }
        };
        const chart = new google.visualization.LineChart(document.getElementById('balance_chart'));
        chart.draw(dataTable, options);
    } else {
        // Create an empty chart
        const emptyData = google.visualization.arrayToDataTable([
            ['Timestamp', 'Balance'],
            ['', 0], // Add an empty row to make the chart blank
        ]);
        const options = {
            title: 'Balance Over Time',
            width: '100%', // Set chart width
            height: '100%', // Set chart height
            legendTextStyle: { color: '#FFF' },
            titleTextStyle: { color: '#FFF' },
            backgroundColor: { fill:'transparent' },
        };
        const chart = new google.visualization.LineChart(document.getElementById('balance_chart'));
        chart.draw(emptyData, options);
    }
}

function fetchPNLData() {
    // Simulate fetching data from a server (replace with actual fetch call)
    var userdata = localStorage.getItem('userData');
    var UD = JSON.parse(userdata);
    if (UD.firstName === 'ADMIN') {
        // Fetch actual PNL data from the server
        // Example data (replace with actual data)
        const pnlData = {
            todaysPNL: {
                percentage: '7.96%',
                usd: '1265.98 USD'
            },
            sevenDaysPNL: {
                percentage: '15.63%',
                usd: '3405.56 USD'
            },
            thirtyDaysPNL: {
                percentage: '22.57%',
                usd: '4556.83 USD'
            },
            ninetyDaysPNL: {
                percentage: '35.81%',
                usd: '6045.23 USD'
            }
        };
        const pnlDatas = [
            { timestamp: new Date('2024-05-26T08:00:00'), pnl: 0 },
            { timestamp: new Date('2024-05-27T09:30:00'), pnl: 573 },
            { timestamp: new Date('2024-05-28T10:45:00'), pnl: 2123 },
            { timestamp: new Date('2024-05-29T11:15:00'), pnl: 231 },
            { timestamp: new Date('2024-05-30T12:30:00'), pnl: 1534 }
            // Add more data points as needed
        ];

        // Calculate net profit/loss
        const netPNL = pnlDatas.reduce((acc, curr) => acc + curr.pnl, 0);

        // Calculate profit/loss ratio
        const profitLossRatio = netPNL > 0 ? (netPNL / pnlDatas.length).toFixed(2) : 0;
        document.getElementById('netPNLValue').textContent = netPNL.toFixed(2);
        document.getElementById('profitLossRatioValue').textContent = profitLossRatio;

        // Update the HTML content with fetched data
        updatePNLData(pnlData);
    } else {
        // Set default values to 0 if user is not admin
        setDefaultValues();
    }
}

 // Function to update PNL data in HTML
 function updatePNLData(pnlData) {
    for (const key in pnlData) {
        const percentageElement = document.getElementById(key + 'Percentage');
        const usdElement = document.getElementById(key + 'USD');
        percentageElement.textContent = pnlData[key].percentage;
        usdElement.textContent = pnlData[key].usd;

        // Check if the PNL percentage is positive or negative and apply font color
        const percentageValue = parseFloat(pnlData[key].percentage);
        if (percentageValue > 0) {
            percentageElement.classList.add('positive');
            usdElement.classList.add('positive');
        } else if (percentageValue < 0) {
            percentageElement.classList.add('negative');
            usdElement.classList.add('negative');
        }
    }
}

// Function to set default values
function setDefaultValues() {
    const percentageElements = document.querySelectorAll('.percentage');
    const usdElements = document.querySelectorAll('.usd');
    
    percentageElements.forEach(element => {
        element.textContent = '0.00%'; // Set default percentage value
        element.classList.remove('positive', 'negative'); // Remove any color classes
    });
    
    usdElements.forEach(element => {
        element.textContent = '0.00 USD'; // Set default USD value
    });
}

// Call the fetchPNLData function when the page loads
fetchPNLData();