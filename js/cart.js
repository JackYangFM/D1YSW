define(["jqueryPlugin"], function () {
	
	//console.log(localStorage.getItem("pros"))

	if (localStorage.getItem("pros")) {
		var result = localStorage.getItem("pros");

		var data = JSON.parse(result);
		//console.log(data);

		for (var i in data) {
			if (data[i] == null) {
				continue;//判断购物车是否为空
			}
			$(".cart_table").append('<div class="aproduct">' +
				'<img src="' + data[i].proImg + '" />' +
				'<div class="cart_explian">' +
				'<p>' + data[i].proName + '</p>' +
				'<p>' + data[i].proId + '</p>' +
				'<a id="delete' + i + '" href="javascript:void(0)" onclick="del(' + i + ')">删除</a>' +
				'<a href="javascript:void(0)">加入收藏</a>' +
				'</div>' +
				'<span>' + data[i].proNormas + '</span>' +
				'<span class="resPrice">' + data[i].proPrice + '</span>' +
				'<span>' + data[i].proPrice + '</span>' +
				'<span><a class="cut_amount" href="javascript:void(0)" goodId="' + i + '" ></a><input type="text" class="amount" id="num' + i + '" value="' + data[i].proNum + '"/><a class="add_amount" href="javascript:void(0)" goodId="' + i + '"></a></span>' +
				'<span class="cost">' + data[i].proCost + '</span>' +
				'</div>');
		}
		//console.log(i)
		//减少数量
		$(".cut_amount").on("click",function(){
			//console.log(i)
			var price = Number($(".resPrice").text());
			var num = $("#num"+i).val();
			num --;
			if(num <=0){
				$("#num"+i).val(0);
				$(".cost").text(0);
			}else{
				$("#num"+i).val(num);
				$(".cost").text(num*price);
			}
		})
		//增加数量
		$(".add_amount").on("click",function(){
			//console.log(i)
			var price = Number($(".resPrice").text());
			var num = $("#num"+i).val();
			num ++;
			$("#num"+i).val(num);
			$(".cost").text(num*price);
		})

	} else {
		$(".cart_table").html("购物车为空");
	}
	/*--------------------清空购物车----------------------*/
	$(".del_all").click(function () {
		localStorage.removeItem("pros");
		$(".aproduct").remove();
	})

})