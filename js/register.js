define(["jqueryPlugin"], function () {
    var needReg = {
        userPhone: {
            element: $("#phone"),
            reg: /^(\+86-)?1\d{10}$/,
        },
        password: {
            element: $("#pwd"),
            reg: /^[a-z0-9\u0021-\u002f]{6,20}$/i, //i表示不区分大小写
        },
        checkPassword: {
            element: $("#pwd2"),
            reg: /^[a-z0-9\u0021-\u002f]{6,20}$/i, //i表示不区分大小写
        }

    }

    //电话号
    var userPhoneEle = needReg.userPhone.element;
    var userReg = needReg.userPhone.reg;

    userPhoneEle.blur(function () { //手机号验证
        var phoneVal = Number(userPhoneEle.val()); //转化成number类型
        //console.log(userReg.test(phoneVal))
        if (userReg.test(phoneVal)) {
            $(".register-box").eq(0).find("span").css("display", "none");
        } else {
            $(".register-box").eq(0).find("span").css({
                "display": "block",
                "color": "red"
            });
        }

    })

    //密码
    var userPwd = needReg.password.element;
    var pwdReg = needReg.password.reg;

    userPwd.blur(function () { //密码验证
        pwdVal = userPwd.val();
        if (pwdReg.test(pwdVal)) {
            $(".register-box").eq(1).find("span").css("display", "none");
        } else {
            $(".register-box").eq(1).find("span").css({
                "display": "block",
                "color": "red"
            });
        }
    })

    //再次确认密码
    var userPwdCheck = needReg.checkPassword.element;
    var CheckpwdReg = needReg.checkPassword.reg;

    userPwdCheck.blur(function () { //再次密码验证
        var pwdValCheck = userPwdCheck.val();
        if (CheckpwdReg.test(pwdValCheck)) {
            //console.log(pwdValCheck,$("#pwd").val())
            if (pwdValCheck == $("#pwd").val()) { //判断两次密码输入是否一样
                $(".register-box").eq(2).find("span").css("display", "none");
            } else {
                $(".register-box").eq(2).find("span").css({
                    "display": "block",
                    "color": "red"
                });
            }
        }
    })

    $("#btn2").on("click", function () {

        //把登陆信息交给后台验证;
        var username = $("#phone").val();
        var pwd = $("#pwd").val();
        var checkPwd = $("#pwd2").val();
        //console.log(checkPwd)
        if (username.length === 0 || pwd.length === 0 || checkPwd.length === 0) { //用户名密码是否为空判断
            alert("用户名密码不能为空");
            return 0;
        } else {
            var opt = {
                url: "http://localhost:8000/d1ysw-require/dataBase/user.php",
                type: "POST",
                data: {
                    username: username,
                    password: pwd,
                    type: "register"
                }
            }
            $.ajax(opt)
                .then(function (res) {
                    alert(res);
                })
        }

        window.location.href = "http://localhost:8000/d1ysw-require/logIn.html";
    })
})