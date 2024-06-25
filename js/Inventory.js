// 获取当前页面的 URL
var url = window.location.href;

// 创建一个 URL 对象
var urlObj = new URL(url);

// 获取 URL 参数中的 username
var username = urlObj.searchParams.get("username");

function loadInventory() {
    Promise.all([
        fetch(`http://127.0.0.1:12345/getInventory?username=${username}`).then(response => response.json()),
        fetch('http://127.0.0.1:12345/getMarketPrice').then(response => response.json())
    ]).then(([inventoryData, marketData]) => {
        const inventoryTable = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
        inventoryTable.innerHTML = ''; // 清空表格
        inventoryData.forEach(item => {
            const marketItem = marketData.find(market => market.Code === item.Code);
            const row = inventoryTable.insertRow();
            row.insertCell(0).innerText = item.Code;
            row.insertCell(1).innerText = marketItem ? marketItem.Name : 'N/A'; // 从市场行情接口获取 Name
            row.insertCell(2).innerText = item.AVG_Cost;
            row.insertCell(3).innerText = marketItem ? marketItem.Price : 'N/A'; // 从市场行情接口获取 Price
            row.insertCell(4).innerText = marketItem ? ((marketItem.Price - item.AVG_Cost) * item.Amount).toFixed(2) : 'N/A';
        });
    });
}

// 加载和更新库存信息
updateInventoryWithMarketData();

// 自动刷新功能（如果需要可以取消注释）
// setInterval(() => {
//     updateInventoryWithMarketData();
// }, 5000);
