// 获取当前页面的 URL
var url = window.location.href;

// 创建一个 URL 对象
var urlObj = new URL(url);

// 获取 URL 参数中的 username
var username = urlObj.searchParams.get("username");
var share = document.querySelector(".temp");

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

function trade() {
    var pair = share.options[share.selectedIndex].text.split(" ");
    const stockCode = pair[0];
    console.log(stockCode);
    const tradeType = document.getElementById('tradeType').value === 'buy' ? 0 : 1;
    const amount = document.getElementById('amount').value;
    const price = document.getElementById('price').value;

    fetch(`http://127.0.0.1:12345/trade?username=${username}&code=${stockCode}&direction=${tradeType}&price=${price}&amount=${amount}`)
        .then(response => response.text())
        .then(data => {
            let message;
            switch (parseInt(data)) {
                case 0:
                    message = '系统错误';
                    break;
                case 1:
                    message = '委托成功';
                    break;
                case 2:
                    message = '交易成功';
                    break;
                case 3:
                    message = '废单';
                    break;
                case 4:
                    message = '账户余额不足';
                    break;
                case 5:
                    message = '持仓余额不足';
                    break;
                default:
                    message = '未知状态';
                    break;
            }
            document.getElementById('tradeMessage').innerText = message;
        });
}

function getAccountBalance() {
    fetch(`http://127.0.0.1:12345/getBalance?username=${username}`)
        .then(response => response.text())
        .then(data => {
            console.log(data);
            document.getElementById('accountBalance').innerText = `账户额度: ${data}`;
        });
}
