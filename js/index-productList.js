define(["jqueryPlugin"], function () {

	var liIndex = 0;
	var phone = localStorage["phone"];
	if (phone) { //如果不为undefined，说已经注册成功！
		$(".head_change").removeClass("active"); //active display:blcok;  默认方式   登录注册localStorage
		$(".head_nochange").addClass("active");
		$("#phone_number").text(phone);
		moveBox($(".head_nochange"))
	} else {
		$(".head_change").addClass("active"); //active display:blcok;  默认方式   登录注册localStorage
		$(".head_nochange").removeClass("active");
		moveBox($(".head_change"))
	}
	$("#quit").click(function () {
		//localStorage.removeItem("phone");
		$(".head_change").addClass("active"); //active display:blcok;  默认方式   登录注册localStorage
		$(".head_nochange").removeClass("active");
		moveBox($(".head_change"))
	})
	/*-----------------上面的滑入滑出块------------------------*/
	function moveBox(obj) {
		$(obj).find(".right_li").mouseenter(function () {
			$(this).find(".right_li_box").removeClass("hide");
		})
		$(obj).find(".right_li").mouseleave(function () {
			$(this).find(".right_li_box").addClass("hide");
		})
	}

	function addSearch() {
		$.ajax({
			type: "get",
			url: "http://localhost:8000/d1ysw-require/libs/json/search.json",
			async: true,
			success: function (data) {
				var arr = data.datas;
				for (var i = 0; i < arr.length; i++) {
					$('<a href="#"></a>').html(arr[i]).appendTo($(".logo_link_hot"));
				}
			},
			error: function (mes) {
				alert(mes)
			}
		});
	}
	addSearch();
	/*----------显示ul框-----------------*/
	function loadSearch() {
		var v = $("#search").val();
		$.ajax({
			type: "get",
			url: "http://localhost:8000/d1ysw-require/libs/json/handler.php",
			data: {
				txt: v
			},
			async: true,
			success: function (data) {
				var arr = eval(data);
				if (arr == null) {
					return;
				}
				$(".logo_search_ul").html("");


				for (var i = 0; i < arr.length; i++) {
					$("<li></li>").html(arr[i]).appendTo(".logo_search_ul");
				}
				$(".logo_search_ul").css({
					display: "block"
				});
				$(".logo_search_ul li").on({
					mouseenter: function () {
						console.log(liIndex);
						liIndex = $(this).index();
						changeLi();
					},
					click: function () {
						liIndex = $(this).index();
						chooseLi()
					}
				})
			},
			error: function (mes) {
				alert(mes);
			}
		});
	}

	function changeLi() {
		$(".logo_search_ul li").eq(liIndex).addClass("active").siblings().removeClass("active");
	}

	function chooseLi() {
		$("#search").val($(".logo_search_ul li").eq(liIndex).html());
		$(".logo_search_ul").css({
			display: "none"
		});
	}
	$("#search").keyup(function () {

		loadSearch();
	})
	/*-----------------导航滑出块------------------------*/
	$(".nav_ul_diff").on({
		mouseenter: function () {
			$(".nav_ul_diff").addClass("active");
			$(".nav_ul_div").css({
				display: "block"
			});
		},
		mouseleave: function () {
			$(".nav_ul_diff").removeClass("active");
			$(".nav_ul_div").css({
				display: "none"
			});
		}
	})
});