var lang = navigator.language
console.log("当前浏览器请求语言" + lang);

if (lang == "zh-CN") { // 中文
    console.log("跳转中文版本")
    //在页面上创建一个居中的倒计时文本，提示用户跳转中文版本。
    document.write("<div style='text-align:center;'>正在跳转中文版本，请稍等...</div>")
    for (var i = 5; i >= 1; i--) { // 倒计时5秒后跳转

        // 创建一个id为countdown的元素，显示倒计时数字。
        document.getElementById("<div id='countdown' style='text-align:center;'>" + i + "</div>")

    }
    setTimeout("window.location.href = './zh_CN'", 5000) // 5秒后跳转中文版本


    window.location.href = "./zh_CN"
}
else if (lang == "en-US") { // 英文
    console.log("跳转英文版本")
    window.location.href = "./en_US"
}
else {
    console.log("跳转中文版本") // 默认中文版本,因为中文更新速度比英文快
    window.location.href = "./en_US"
}