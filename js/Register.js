function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('message').innerText = '密码不一致';
        return;
    }

    fetch(`http://127.0.0.1:12345/regist?username=${username}&pwd=${password}`)
        .then(response => response.text())
        .then(data => {
            if (data === 'true') {
                document.getElementById('message').innerText = '注册成功';
            } else {
                document.getElementById('message').innerText = '注册失败';
            }
        });
}
