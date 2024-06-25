// 获取当前页面的 URL
var url = window.location.href;

// 创建一个 URL 对象
var urlObj = new URL(url);

// 获取 URL 参数中的 username
var username = urlObj.searchParams.get("username");
var bill = document.querySelector(".bill")

function loadTradeRecord() {
    fetch(`http://127.0.0.1:12345/getTradeRecord?username=${username}`)
        .then(response => response.json())
        .then(data => {
            const tradeRecordTable = document.getElementById('tradeRecordTable').getElementsByTagName('tbody')[0];
            tradeRecordTable.innerHTML = ''; // 清空表格
            data.forEach(record => {
                const row = tradeRecordTable.insertRow();
                row.insertCell(0).innerText = record.TradeTime;
                row.insertCell(1).innerText = record.Code;
                row.insertCell(2).innerText = record.Name;
                row.insertCell(3).innerText = record.Direction === 0 ? '买入' : '卖出';
                row.insertCell(4).innerText = record.KnockPrice;
                row.insertCell(5).innerText = record.Amount;
            });
        })
        .catch(error => {
            console.error('Error fetching trade records:', error);
        });
}

// Uncomment the following lines if you want to auto-refresh the trade records every 5 seconds
// setInterval(() => {
//     loadTradeRecord();
// }, 5000);
async function loadTradeRecord() {
    try {
        const response = await fetch('http://127.0.0.1:12345/getTradeRecord?username=' + username);
        if (response.ok) {
            const data = await response.json();
            render(data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function render(data) {
    bill.innerHTML = data.map(element => {
        const { TradeTime, Code, No, Direction, KnockPrice, Amount } = element;
        return `
            <tr>
                <td class="l1">${TradeTime}</td>
                <td>${Code}</td>
                <td class="l2">${No}</td>
                <td>${Direction}</td>
                <td>${parseFloat(KnockPrice).toFixed(2)}</td>
                <td>${Amount}</td>
                
            </tr>`;
    }).join('');
}
