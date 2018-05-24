define(["jqueryPlugin",], function () {

	/*--------------类别概括栏滑出块js-----------------------*/
	$(".classify_position").on({
		mouseenter: function () {
			$(".classify_diff").addClass("active");
			$(".classify_div").css({
				display: "block"
			})
		},
		mouseleave: function () {
			$(".classify_diff").removeClass("active");
			$(".classify_div").css({
				display: "none"
			})
		}
	})
	/*------------用ajax请求动态添加-----------------*/
	$.ajax({
		type: "get",
		url: "http://localhost:8000/d1ysw-require/libs/json/list.json",
		async: true,
		success: function (data) {
			createElement(data.living, $(".kinds_sdiv").eq(0));
			createElement(data.brand, $(".kinds_sdiv").eq(1));
			createElement(data.price, $(".kinds_sdiv").eq(2));
		}
	});

	function createElement(arr, obj) {
		for (var i = 0; i < arr.length; i++) {
			$('<a href="javascript::"></a>').text(arr[i]).appendTo(obj);
		}

	}
	/*--------------分类排序栏目-----------------------*/
	$(".sort_kind").click(function () {
		$(this).addClass("active").siblings().removeClass("active");
	})
	/*--------------ajax请求商品列表-----------------------*/
	var pageSize = 48; //每页的数据量
	var totalSize = 0; //总数据量
	var flag = true;
	getData(1);

	function getData(p) {
		$.ajax({
			type: "get",
			url: "http://localhost:8000/d1ysw-require/libs/json/prolist.json",
			async: true,
			success: function (data) {
				//createPro(data.datas);
				//var arr = data.datas
				totalSize = data.length;
				var end = p * pageSize;
				end = end > totalSize ? totalSize : end;
				var start = p * pageSize - (pageSize - 1);
				$(".pro_list").empty();
				for (var i = start; i <= end; i++) {

					var currentObj = data[i - 1];
					$('<dl>' +
						'<dt><a href="proInformation.html"><img class="lazy" data-original="' + currentObj.imgSrc + '" alt="" /></a></dt>' +
						'<dd>' +
						'<div class="no_link">' +
						'<span class="red_price">¥<b class="now_price">' + currentObj.nowPrice + '</b></span>' +
						'<span class="gray_price">¥<del>' + currentObj.lostPrice + '</del></span>' +
						'<span class="fast"></span>' +
						'</div>' +
						'<a class="explain" href="javascript::"><i>' + currentObj.explain + '</i><span>' + currentObj.information + '</span></a>' +
						'<a class="comment" href="javascript::">' + currentObj.comment + '</a>' +
						'<div class="linkdiv">' +
						'<input type="text" class="count" value="1"/>' +
						'<p><a class="add_up" href="javascript::"></a><a class="cut_down" href="javascript::"></a></p>' +
						'<a class="add_cart" href="javascript::"></a>' +
						'</div>' +
						'</dd>' +
						'</dl>').appendTo(".pro_list");
				}

				var pageCount = Math.ceil(totalSize / pageSize);
				if (flag) {
					flag = false;
					createPaeBar(pageCount)
				}
				$(".pro_list img").lazyload();
				$(".pro_list dl").on({
					mouseenter: function () {
						$(this).addClass("active")
					},
					mouseleave: function () {
						$(this).removeClass("active")
					}
				})
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
});