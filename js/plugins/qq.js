//const qqNumber = '3162997050';

// 获取包含qq的HTML元素
var qq = document.getElementById('qq');

// 从data-qqnumber属性中获取qqNumber的值
var qqNumber = qq.dataset.qqnumber;

// 获取所有具有class为qq的元素
//var qqElements = document.getElementsByClassName('qq');

// 遍历每个元素并获取data-qqnumber属性的值
//for (var i = 0; i < qqElements.length; i++) {
//    var qqNumber = qqElements[i].dataset.qqnumber;
//    console.log('QQ Number:', qqNumber);
//}

//qq名字解析
const url_mz = `https://api.oioweb.cn/api/qq/info?qq=${qqNumber}`;
fetch(url_mz)
    .then(response => response.json())
    .then(data => {
        const nickname = data.result.nickname;
        const sex = data.result.sex;
        const area = data.result.area;
        const age = data.result.age;
        console.log("名字:", nickname); // 输出名字
        console.log("性别:", sex) //输出性别
        console.log("年龄:", age) //输出年龄
        console.log("所在地:", area); // 输出所在地字
    })
    .catch(error => console.error('Error:', error));

//qq头像解析
document.addEventListener("DOMContentLoaded", function () {
    // 创建一个新的img元素
    var img = document.createElement('img');

    // 设置img元素的src属性为API返回的图片URL
    img.src = `https://q2.qlogo.cn/headimg_dl?dst_uin=${qqNumber}&spec=5`;

    // 获取要添加图片的容器元素
    var imageContainer = document.getElementById('imageContainer');

    // 将img元素添加到指定的容器中，以便显示图片
    imageContainer.appendChild(img);
});