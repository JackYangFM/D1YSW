
$.ajax({
	type:"get",
	url:"http://localhost:8000/d1ysw/js/active.json",
	async:true,
	success:function(data){
		var arr = data.datas;
		for(var i = 0;i<arr.length;i++){
			$('<a href="#"><img class="lazy" data-original="'+arr[i]+'" alt="" /></a>').appendTo(".active_container");
		}
		$(".active_container img").lazyload();
	},
	error:function(mes){
		alert(mes)
	}
});