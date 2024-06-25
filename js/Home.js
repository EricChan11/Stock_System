var params = new URLSearchParams(window.location.search);
var username = params.get('username');

function logout() {
    // 调用后端注销接口
    fetch('http://127.0.0.1:12345/logout')
        .then(response => response.text())
        .then(data => {
            if (data === 'true') {
                window.location.href = '../html/Login.html'; // 注销成功后跳转到登陆页面
            } else {
                alert('注销失败');
            }
        });
}

function trade() {
    // 调用后端注销接口
    event.preventDefault();
    window.location.href = "../html/Trade.html?username=" + username;
}

function record() {
    // 调用后端注销接口
    event.preventDefault();
    window.location.href = "../html/TradeRecord.html?username=" + username;
}

function now() {
    // 调用后端注销接口
    event.preventDefault();
    window.location.href = "../html/Inventory.html?username=" + username;
}
