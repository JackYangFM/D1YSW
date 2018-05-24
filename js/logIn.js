define(["jqueryPlugin"], function () {

	var needReg = {
		userPhone: {
			element: $("#userName"),
			reg: /^(\+86-)?1[358]\d{9}$/,
		},
		password: {
			element: $("#pwd"),
			reg: /^[a-z0-9\u0021-\u002f]{6,20}$/i, //i表示不区分大小写
		},

	}
	//电话号
	var userElement = needReg.userPhone.element;
	var userReg = needReg.userPhone.reg;

	userElement.blur(function () {
		var userVal = Number(userElement.val());
		//console.log(userReg.test(userVal));
		//电话验证
		if (userReg.test(userVal)) {
			$(".box").eq(0).find("span").css("display", "none");
		} else {
			$(".box").eq(0).find("span").css("display", "inline-block");
		}
	})

	//密码
	var userPwd = needReg.password.element;
	var pwdReg = needReg.password.reg;
	userPwd.blur(function () {
		//密码验证
		var pwdVal = userPwd.val();
		//console.log(pwdVal);
		if (pwdReg.test(pwdVal)) {
			$(".box").eq(1).find("span").css("display", "none");
		} else {
			$(".box").eq(1).find("span").css("display", "inline-block");
		}
	})

	$("#logPic").on("click", function () {
		//把登陆信息交给后台验证;
		var username = $("#userName").val();
		var pwd = $("#pwd").val();
		if (username.length === 0 || pwd.length === 0) { //用户名密码是否为空判断
			alert("用户名密码不能为空");
			return 0;
		} else {
			var opt = {
				url: "http://localhost:8000/d1ysw-require/dataBase/user.php",
				type: "POST",
				data: {
					username: username,
					password: pwd,
					type: "login"
				}
			}
			$.ajax(opt)
				.then(function (res) {
					alert(res);
				})
		}
		window.location.href = "http://localhost:8000/d1ysw-require/index.html";
	})

});