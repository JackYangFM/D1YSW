define(["jqueryPlugin"], function () {
	/*-----------------放大镜----------------------*/
	$(function () {
		$("#smallBox").on({
			mouseenter: function () {
				$("#tool").css({
					display: "block"
				});
				$("#bigBox").css({
					display: "block"
				});
			},
			mouseleave: function () {
				$("#tool").css({
					display: "none"
				});
				$("#bigBox").css({
					display: "none"
				})
			},
			mousemove: function (e) {

				var cX = e.pageX - $("#smallBox").offset().left - $("#tool").width() / 2;
				var cY = e.pageY - $("#smallBox").offset().top - $("#tool").height() / 2;
				if (cX < 0) {
					cX = 0;
				}
				if (cX > $("#smallBox").width() - $("#tool").width()) {
					cX = $("#smallBox").width() - $("#tool").width();
				}
				if (cY < 0) {
					cY = 0;
				}
				if (cY > $("#smallBox").height() - $("#tool").height()) {
					cY = $("#smallBox").height() - $("#tool").height();
				}

				$("#tool").css({
					left: cX,
					top: cY
				});

				var x = $("#tool").position().left * $("#bigBox").width() / $("#tool").width();
				var y = $("#tool").position().top * $("#bigBox").height() / $("#tool").height();

				$(".bigImg").css({
					left: -x,
					top: -y
				})

			}
		})
	})
	/*-----------给每一个li添加鼠标滑过事件------------*/
	$(".pic-list li").on({
		mouseenter: function () {
			$(this).addClass("active");
			var index = $(this).index();
			$(".small-box a").eq(index).css({
				display: "block"
			}).siblings().css({
				display: "none"
			})
			$(".small-box b").css({
				display: "block"
			})
			$(".big_tool img").eq(index).css({
				display: "block"
			}).siblings().css({
				display: "none"
			})
		},
		mouseleave: function () {
			$(this).removeClass("active");
		}
	})
	/*-----------------选择商品规格---------------------*/
	var pid;
	var arr = [];
	$(".standard a").click(function () {
		pid = $(this).index();
		//alert(pid)
		$(this).addClass("active").siblings().removeClass("active");
		$(".pro-color i").html($(this).html())
	})
	/*------------------加入购物车判断------------------------*/

	$(".add_pro").click(function () {
		if ($(".pro-color i").html() == "未选择") {
			$(".black").css({
				display: "block"
			});
			$(".tip_div").css({
				display: "block"
			});
		} else {
			var proImg = $("#proImg").attr("src");
			var proName = $("#proName").text();
			var proId = $("#proId").text();
			var proNormas = $("#proNormas").text();
			var proPrice = $("#proPrice").text();
			var proNum = $("#proNum").val();

			var pro = new Object();

			pro.proImg = proImg;
			pro.proName = proName;
			pro.proId = proId;
			pro.proNormas = proNormas;
			pro.proPrice = proPrice;
			pro.proNum = proNum;
			pro.proCost = proNum * proPrice;
			//console.log(pro);
			arr[pid] = pro;
			//		console.log(arr)
			//		if(localStorage.getItem("pros"+pid)){
			//			var proData = localStorage.getItem("pros"+pid);
			//			console.log(proData)
			//		}else{
			//			localStorage.setItem("pros"+pid,proStr);
			//		}
			localStorage.setItem("pros", JSON.stringify(arr));
		}
	})

	$(".yes").click(function () { //选择规格确定按钮
		cancle()
	})
	$(".tip_title a").click(function () {
		cancle();
	})

	function cancle() {
		$(".black").css({
			display: "none"
		});
		$(".tip_div").css({
			display: "none"
		});
	}
	$(".bgj-same").click(function () {
		var val = $("#proNum").val();
		val--;
		if (val < 0) {
			val = 0;
		}
		$("#proNum").val(val);
	})
	$(".bgj-diff").click(function () {
		var val = $("#proNum").val();
		val++;
		$("#proNum").val(val);
	})


	/*-----------------ajax加载左侧的 看了又看---------------------*/
	$.ajax({
		type: "get",
		url: "http://localhost:8000/d1ysw-require/libs/json/bottom_left.json",
		async: true,
		success: function (data) {
			createImg(data.see, $(".see"))
			createImg(data.recently, $(".recently"))
		},
		error: function (mes) {
			alert(mes);
		}
	});

	function createImg(arr, obj) {
		for (var i = 0; i < arr.length; i++) {
			$('<dl><dt><img src="' + arr[i].mysrc + '"/></dt><dd><p><a href="#">' + arr[i].info + '</a></p><a class="red_font" href="#">' + arr[i].price + '</a><del>' + arr[i].lost + '</del></dd></dl>').appendTo(obj);
		}
	}
	/*-----------------ajax请求右侧的评价---------------------*/
	var pageSize = 10; //每页的数据量
	var totalSize = 0; //总数据量
	var flag = true;
	getData(1);

	function getData(p) {
		$.ajax({
			type: "get",
			url: "http://localhost:8000/d1ysw-require/libs/json/remark.json",
			async: true,
			success: function (data) {
				//createPro(data.datas);
				//			var arr = data.datas
				totalSize = data.length;
				var end = p * pageSize;
				end = end > totalSize ? totalSize : end;
				var start = p * pageSize - (pageSize - 1);
				$(".all_assess").empty();
				for (var i = start; i <= end; i++) {

					var currentObj = data[i - 1];
					$('<div class="assess">' +
						'<dl class="assess_left">' +
						'<dt><img src="' + currentObj.imgSrc + '" /></dt>' +
						'<dd>' +
						'<a href="javascript::">' + currentObj.name + '</a>' +
						'<a href="javascript::">' + currentObj.style + '</a>' +
						'</dd>' +
						'</dl>' +
						'<div class="access_right">' +
						'<i></i>' +
						'<div class="detailed">' +
						'<span>评分：<b></b><em>' + currentObj.time + '</em></span>' +
						'<p>' + currentObj.info + '</p>' +
						'</div>' +
						'</div>' +
						'</div>').appendTo(".all_assess");
				}

				var pageCount = Math.ceil(totalSize / pageSize);
				if (flag) {
					flag = false;
					createPaeBar(pageCount)
				}
			},
			error: function (mes) {
				alert(mes);
			}
		});
	}

	function createPaeBar(pageCount) {
		//后端会给你返回，总页数，起始页，终止页
		$("#pagination").createPage({
			pageCount: pageCount, //总页数	        
			current: 1, //当前页码
			backFn: function (p) { //回调函数 ，点击当前页的回调函数
				getData(p)
			}
		});

	}

	$(".bottom_nav li").click(function () {
		$(this).addClass("active").siblings().removeClass("active");
		$(".tab > .cut").eq($(this).index()).css({
			display: "block"
		}).siblings().css({
			display: "none"
		})
	})

});