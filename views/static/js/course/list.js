define(['jquery','template'],function($,template){
    $.ajax({
        url:'/api/course',
        type:'get',
        success:function(data){
            //console.log(data);
            var html=template('courselist-tpl',data);
            $('.courses').html(html);
        }
    });


    
})