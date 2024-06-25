function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(`http://127.0.0.1:12345/login?username=${username}&pwd=${password}`)
        .then(response => response.text())
        .then(data => {
            if (data === 'true') {
                window.location.href = '../html/Home.html?username=' + username; // 登陆成功跳转页面
            } else {
                document.getElementById('message').innerText = '登陆失败';
            }
        });
}
