var container = document.querySelector(".container");
var share = document.querySelector(".share");

async function getallData() {
    try {
        let response = await fetch('http://127.0.0.1:12345/getMarketPrice');
        if (response.ok) {
            let data = await response.json();
            share.innerHTML = data.map(element => {
                const { Code, Name } = element;
                return `<option>${Code} ${Name}</option>`;
            }).join('');
        }
    } catch (error) {
        console.error('Error fetching market prices:', error);
    }
}

getallData();

var response;
var label = [];
var code = "601398";
var name = "工商银行股票详情";

getData();
var id = setInterval(getData, 5000);

async function getData() {
    try {
        let response = await fetch('http://127.0.0.1:12345/getStockPrice?code=' + code);
        if (response.ok) {
            let data = await response.json();
            data = data.slice(-50);
            console.log(data);
            label = data.map((_, index) => index + 1);
            render(data);
        }
    } catch (error) {
        console.error('Error fetching stock prices:', error);
    }
}

function render(data) {
    container.innerHTML = '';
    var canvas_chart = document.createElement("canvas");
    container.appendChild(canvas_chart);
    var ctx = canvas_chart.getContext('2d');
    var chartData = {
        labels: label,
        datasets: [
            {
                label: name,
                data: data,
                fill: true,
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderColor: 'rgb(0, 123, 255)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointBackgroundColor: 'rgb(0, 123, 255)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                tension: 0.4
            }
        ]
    };
    const lineChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

share.addEventListener("change", function () {
    var info = share.options[share.selectedIndex].text.split(" ");
    code = info[0];
    name = info[1] + "股票详情";
    clearInterval(id);
    getData();
    id = setInterval(getData, 5000);
});
