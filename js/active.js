define(["jqueryPlugin"], function () {

	$(function(){
		$.ajax({
			type: "get",
			url: "http://localhost:8000/d1ysw-require/libs/json/active.json",
			async: true,
			success: function (res) {
				var dataJson = res.datas;
				var imgBox = "<a href='javascript:void(0)'>";
				$.each(dataJson,function(index,item){
					//console.log(index,item)
					imgBox +=`<img class="lazy" data-original="${item}" alt="" />`					
				})
				$(".active_container").append(imgBox);
				$(".active_container img").lazyload();
			},
			error: function (mes) {
				alert(mes);
			}
		});
	})

});