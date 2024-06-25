const allprelist = [
    4.74, 1701.00, 48.06, 86.72, 47.37, 63.98, 12.83, 25.6, 6.09, 19.43,
    86.81, 224.09, 15.1, 15.3, 17.28, 314.71, 28.27, 13.33, 19.55, 10.87,
    4.71, 23.97, 42.84, 34.34, 168.2, 34.95, 43.12, 15.02, 12.07, 22.03
];
let allcorlist = [];
let response;

function loadMarket(type) {
    fetch('http://127.0.0.1:12345/getMarketPrice')
        .then(response => response.json())
        .then(data => {
            response = data;
            allcorlist = data.map(stock => parseFloat(stock.Price));
            render(type);
        });
}

function render(type) {
    const marketTable = document.getElementById('marketTable').getElementsByTagName('tbody')[0];
    marketTable.innerHTML = ''; // 清空表格

    response.forEach((stock, index) => {
        const { Code, Name, Price } = stock;
        const ChangeRate = ((allcorlist[index] - allprelist[index]) / allprelist[index] * 100).toFixed(2);
        const ChangePrice = (allcorlist[index] - allprelist[index]).toFixed(2);

        if ((type === 'sh' && Code.startsWith('6')) ||
            (type === 'sz' && Code.startsWith('0')) ||
            (type === 'cyb' && Code.startsWith('3'))) {
            const row = marketTable.insertRow();
            row.insertCell(0).innerText = Code;
            row.insertCell(1).innerText = Name;
            row.insertCell(2).innerText = Price;
            row.insertCell(3).innerText = ChangeRate;
            row.insertCell(4).innerText = ChangePrice;
        }
    });
}

setInterval(() => {
    loadMarket('sh'); // 每隔一段时间刷新数据，默认显示沪市
}, 5000);

document.addEventListener('DOMContentLoaded', () => {
    loadMarket('sh'); // 页面加载时默认显示沪市数据
});
