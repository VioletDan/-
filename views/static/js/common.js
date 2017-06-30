//公共头像,有返回值的尽可能的写在前面,cookie没有返回值,所以写在最后
define(["jquery","template","cookie"],function($,template){
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
				url:'api/logout',
				type:"post",
				success:function(data){
					if(data.code==200){
						location.href='/dashboard/login';
					}
				}
			});
		})
	})
})