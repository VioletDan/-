//公共头像,有返回值的尽可能的写在前面,cookie没有返回值,所以写在最后
define(["jquery","template","cookie"],function($,template){
	$(function(){
		var userinfo = JSON.parse($.cookie('userinfo'));
		var tplStr = template('prfile-tpl',userinfo);
		$('#userinfo').html(tplStr);
	})
})