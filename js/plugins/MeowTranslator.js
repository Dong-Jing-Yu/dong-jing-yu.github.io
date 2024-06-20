//https://github.com/CATT-L/MeowTranslator
class MeowTranslator {

	constructor() {
		this.charMap = ['喵', '呜', '啊', '~'];
	}

	meowToHex(strMeow) {

		var strHex = "";

		for (var i = 0; i < strMeow.length; i += 2) {
			var j = this.charMap.findIndex(item => item == strMeow[i]);
			var k = this.charMap.findIndex(item => item == strMeow[i + 1]);

			k = (j * 4 + k - i / 2 % 16 + 16) % 16;
			strHex += k.toString(16);
		}

		return strHex.toUpperCase();
	}

	hexToMeow(strHex) {

		var buffer = "";

		for (var i = 0; i < strHex.length; i++) {
			var k = (parseInt(strHex[i], 16) + i % 16) % 16;
			buffer += this.charMap[Math.floor(k / 4)] + this.charMap[k % 4];
		}

		return buffer;
	}

	hexToStr(strHex) {

		var buffer = "";

		for (var i = 0; i < strHex.length; i += 4) {
			buffer += String.fromCharCode(parseInt(strHex.substr(i, 4), 16));
		}

		return buffer;
	}

	strToHex(str) {

		var strHex = "";

		for (var i = 0; i < str.length; i++) {
			strHex += ("0000" + str.charCodeAt(i).toString(16)).substr(-4);
		}

		return strHex.toUpperCase();
	}


	setCharMapFromMeow(str) {

		this.charMap[0] = str[2];
		this.charMap[1] = str[1];
		this.charMap[2] = str[str.length - 1];
		this.charMap[3] = str[0];
	}

	setCharMap(str) {

		this.charMap[0] = str[0];
		this.charMap[1] = str[1];
		this.charMap[2] = str[2];
		this.charMap[3] = str[str.length - 1];
	}

	getCharMapStr() {
		return this.getCharMap().join("");
	}

	getCharMap() {
		return this.charMap;
	}

	getCharMapToMeow() {
		return [
			this.charMap[3],
			this.charMap[1],
			this.charMap[0],
			this.charMap[2],
		];
	}

	parseToString(strMeow) {

		console.log('输入串', strMeow);

		this.setCharMapFromMeow(strMeow);

		// console.log('设置字典映射', this.getCharMap());

		var strHex = this.meowToHex(strMeow.substr(3, strMeow.length - 4));

		// console.log('十六进制转换', strHex);

		var str = this.hexToStr(strHex);

		// console.log('文本转换', str);

		return str;
	}

	parseToMeow(str, charMap = null) {

		if (charMap && charMap.length !== 4) {
			var errorMsg = "请输入四个字符，否则将使用默认字符映射。";
			console.error(errorMsg);
			$("#errorMsg").text(errorMsg); // 将错误信息显示在页面上
			$("#errorMsg").hide().fadeIn(500); // 先隐藏，然后淡入效果，持续时间500毫秒
			// 设置定时器，在5秒后淡出错误信息
			setTimeout(() => {
				$("#errorMsg").fadeOut(500); // 淡出效果，持续时间500毫秒
			}, 5000);
			charMap = null; // 使用默认字符映射
		}

		// console.log('输入串', str);

		var strHex = this.strToHex(str);

		// console.log('十六进制转换', strHex);

		var strMeow = this.hexToMeow(strHex);

		// console.log('文本转换', strMeow);

		// 字典位追加
		var charMap = this.getCharMapToMeow();

		strMeow = [charMap[0], charMap[1], charMap[2], strMeow, charMap[3]].join("");

		// console.log('字典位追加', strMeow);

		return strMeow;
	}
}

window.MeowTranslator = MeowTranslator;

$("#inputDict").val((new MeowTranslator()).getCharMapStr());


$("#btnMeow").click(() => {
	var strMeow = (new MeowTranslator()).parseToMeow($("#strHuman").val(), $("#inputDict").val());
	$("#strMeow").val(strMeow);
});

$("#btnHuman").click(() => {
	var strHuman = (new MeowTranslator()).parseToString($("#strMeow").val());
	$("#strHuman").val(strHuman);
});

$("#btnClear").click(() => {
	$("#strHuman").val("");
	$("#strMeow").val("");
});