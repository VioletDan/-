define(['jquery',"form","util"],function ($,util) {
    $('#form').submit(function(){
        $(this).ajaxSubmit({
            url:'/api/course/create',
            type:'post',
            success:function(data){
                // alert(1);
                // console.log(data);
                if(data.code==200){
                    location.href='/course/step1?id='+data.result.cs_id;
                }
                
            }
        })
        return false;
    })
});