define(["jquery","form","cookie"],function($){
    var userinfo=$.cookie("userinfo");
    userinfo=userinfo && JSON.parse(userinfo);
    //console.log(userinfo);
    $(".avatar>img").attr("src",userinfo?userinfo.tc_avatar:"/views/static/uploads/monkey.png");
    $('#login-form').submit(function(e){
        $(this).ajaxSubmit({
            type:'post',
            url:'/api/login',
            success:function(data){
                if(data.code==200){
                    $.cookie('userinfo',JSON.stringify(data.result),{path:'/'});
                    location.href='/';
                }
            }
        });
        //阻止表弟那自动提交
        e.preventDefault();
    })
})