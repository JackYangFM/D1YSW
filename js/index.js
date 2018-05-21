
/*-----------------banner图------------------------*/
var currentIndex = 0;//图片和li的相应索引
var v;//前一张图片的索引
var timeId;//定时器的线程标识
var countItem = 0;
//请求ajax文件 传入轮播图片 和相应li的个数
$.ajax({
	type:"get",
	url:"http://localhost:8000/d1ysw/js/banner.json",
	async:true,
	success:function(data){
		var arr = data.datas;
		countItem = arr.length;
		createElement($(arr));//创建节点函数  调用
		
	}
});
//创建节点函数
function createElement(arr){
	for(var i = 0;i<arr.length;i++){
		
		if(i==0){
			$(".control_position").before('<a class="banner banner1" href="active.html"><img src="'+arr[i]+'"/></a>');
			$('<li><a href="javascript:void(0)">'+(i+1)+'</a></li>').addClass("active").appendTo($(".banner_nav"));
		}else{
			$(".control_position").before('<a class="banner" href="javascript:void(0)"><img src="'+arr[i]+'"/></a>');
			$('<li><a href="javascript:void(0)">'+(i+1)+'</a></li>').appendTo($(".banner_nav"));
		}
		
	}
	//给li绑定鼠标滑过事件
	$(".banner_nav li").on({
	mouseenter:function(){
		v = currentIndex;
		currentIndex = $(".banner_nav li").index(this);
		changeLi();
		lunbo();
	}
})
}
//右键点击事件
$(".banner_right").click(function(){
	v = currentIndex;
	currentIndex++;
		
		lunbo();
		
	
})
//左键点击事件
$(".banner_left").click(function(){
	v = currentIndex;
	currentIndex--;
		
		lunbo();
		
	
})
//图片轮播函数
function lunbo(){
	
	if(currentIndex>=countItem){
			currentIndex = 0
		}
	if(currentIndex<0){
			currentIndex = countItem-1;
		}
	if(v==currentIndex){
				return;
		}
		
	$(".banner").eq(v).animate({opacity:0},function(){
		
		$(".banner").eq(currentIndex).animate({opacity:1},500,function(){
			
			$(".banner").eq(v).css("opacity",0);
		});
		
	})
	changeLi();
}
//改变li的函数
function changeLi(){
	$(".banner_nav li").eq(currentIndex).addClass("active").siblings().removeClass("active");
}
autoPlay()
function autoPlay(){
	timeId = setInterval(function(){
		$(".banner_right").click();
	},4000)
}
//给大盒子添加鼠标划入滑出事件
$(".banner_box").on({
	mouseenter:function(){
		clearInterval(timeId);
		$(".banner_left,.banner_right").css({display:"block"});
	},
	mouseleave:function(){
		autoPlay();
		$(".banner_left,.banner_right").css({display:"none"});
	}
})
/*-----------------topic请求------------------------*/
$.ajax({
	type:"get",
	url:"http://localhost:8000/d1ysw/js/topic.json",
	async:true,
	success:function(data){
		var arr = data.datas;
		//console.log(arr)
		for(var i = 0;i<arr.length;i++){
			$('<dl class="topic_box"><dt><a href="javascript:void(0)"><img src="'+arr[i].imgSrc+'"/></a><div class="topic_position"></div></dt><dd><a href="javascript:void(0)">'+arr[i].information+'</a></dd></dl>').appendTo(".big_box");
		}
		$(".topic_box").on({
			mouseenter:function(){
				$(this).addClass("active").siblings();
			},
			mouseleave:function(){
				$(this).removeClass("active");
			}
		})
	},
	error:function(mes){
		alert(mes);
	}
});
/*---------------------懒加载图片 版心部分---------------------------*/
$.ajax({
	type:"get",
	url:"http://localhost:8000/d1ysw/js/container.json",
	async:true,
	success:function(data){
		createDl(data.container,0);
		createDl(data.living,1);
		createDl(data.digtal,2);
		createDl(data.makeup,3);
		createDl(data.ornament,4)
		//给创建好的每一个dl添加鼠标移入和鼠标移出时间
		$(".container_sbox dl").on({
		mouseenter:function(){
			$(this).addClass("active");//改变字体的颜色
			$(this).find(".container_position").css({display:"block"});//将阴影部分显示出来
			$(this).find("dd").animate({top:230},200)//让当前dl下的dd改变top值进行运动
		},
		mouseleave:function(){
			$(this).removeClass("active");
			$(this).find(".container_position").css({display:"none"});
			$(this).find("dd").animate({top:295},200)
		}
	})
	}
});
//创建dl的函数
function createDl(arr,v){
	for(var i = 0;i<arr.length;i++){
		$('<dl><dt><img class="lazy" data-original="'+arr[i].mysrc+'" alt="" /><div class="container_position"></div></dt><dd><a class="change_color" href="javascript:void(0)">'+arr[i].info+'</a><a class="change_hide" href="javascript:void(0)">会员价：<span>'+arr[i].price+'</span></a></dd>').appendTo($(".container_sbox").eq(v));
	}
	//创建之后执行懒加载
	$(".container_sbox img").lazyload();
	
}
/*-------------------定位条---------------------*/
$(function(){
				//页面滚动事件
				var flag = true;
				$(window).scroll(function(){
					//获取第一块的高
					var h1 = $(".container").offset().top;
					//页面被卷去的距离
					var h2 = $(window).scrollTop();
					//如果导航条的高大于等于第一块的高 就让导航条fixed定位
					if(h2>=h1){
						
						$(".position").css({position:"fixed",top:"0"});
					}else{
						$(".position").css({position:"absolute",top:h1});
					}
					//当滚动的时候对应的楼层导航样式改变  遍历楼层
					if(h1*4/5>=h2){
						$("#position_diff").addClass("active");
						$(".position_li").removeClass("active");
					}else{
						$("#position_diff").removeClass("active");
						$(".Louti").each(function(i,e){
						//切换楼梯按钮的标准高度
						var loutiH = $(e).offset().top+$(e).height()*4/5;
						var index = $(e).index();//索引
						//console.log($(e))
						
							if(loutiH>h2){								
									$(".position_li").eq(index).addClass("active").siblings().removeClass("active");
									return false;  //固定的，不再往下遍历
								}	
						
											
					});
					}
					
				})
				
				
				//当点击除了最后一个li时li时
				$(".position_ul li").click(function(){
					if(flag){
						flag = false;
						
						$(this).addClass("active").siblings().removeClass("active")
						//获取当前li索引
						var index = $(this).index();
						//获取对应索引的当前的offsettop
						//如果是第一块 top值为0（第一块比较特殊）
						if(index==0){
							var top = 0;
						}else{
							var top = $(".Louti").eq(index-1).offset().top-$(".position").height();
						}
						
						
						$("html,body").animate({scrollTop:top},500,function(){
							flag = true;
						})
						
					}
					//点击li的时候，当前li样式改变，其他的兄弟节点都清空上一次点击过的样式
					
				})
			})