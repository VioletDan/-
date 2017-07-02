//公共头像,有返回值的尽可能的写在前面,cookie没有返回值,所以写在最后
define(["jquery","template","nprogress","cookie"],function($,template,nprogress){
	//进度条
	nprogress.start();
	nprogress.done();

	$(document).ajaxStart(function(){
		nprogress.start();
	})

	$(document).ajaxStop(function(){
		nprogress.done();
	})

	$(function(){
		//用户未登录,不能访问其他页面,都跳到登录页
		//如果用户不在登录页的话
		if("/dashboard/login"!=location.pathname){
			//不在登录页,并且没有PHPSESSID,就跳转到登录页
			if(!$.cookie("PHPSESSID")){
				location.href='/dashboard/login';
			}else{
				var userinfo = JSON.parse($.cookie('userinfo'));
				var tplStr = template('prfile-tpl',userinfo);
				$('#userinfo').html(tplStr);
			}
		}
		
		//退出功能
		$('#logout').click(function(){
			$.ajax({
				url:'/api/logout',
				type:"post",
				success:function(data){
					if(data.code==200){
						location.href='/dashboard/login';
					}
				},
				error:function(){
					console.log('请求出错');
				}
			});
		})
		//侧边栏功能
		//给导航栏所有的li加上点击事件，在点击的时候，让当前背景色变暗
		$(".navs>ul>li").click(function(){
			$(this).children("a").addClass('active');
			$(this).siblings().children("a").removeClass('active');
		});	
		//让当前页面对应的导航栏菜单变暗
		//遍历所有的a比较href和地址栏的地址是否相等
		//each的时候,参数要写正确,第一个是索引,第二个是value
		$(".navs a").each(function(i,value){
			if($(value).attr("href")==location.pathname){
				$(value).addClass('active');
				//如果二级菜单有active类,那么就不应该被收起来
				$(value).parent().parent().slideDown();
			}
		});
		// //课程管理的二级菜单显示
		$(".navs>ul>li").click(function(){
			$(this).children('ul').slideToggle();	
			//课程管理的子菜单点击的时候,父菜单的背景色去掉
			if($(this).find('ul').find('a').hasClass('active')){
				$(this).removeClass('active');
			}
		});
	})
})
