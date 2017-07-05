define(["jquery","template","util","ckeditor","form"],function($,template,util,CKEDITOR){
    var csid=util.subStr().id;
    //console.log(csid);
    $.ajax({
        url:'/api/course/basic',
        type:'get',
        data:{
            cs_id:csid
        },
        success:function(data){
            //console.log(data);
            if(data.code==200){
                var html=template('steps1-tpl',data.result);
                $('.steps').html(html);
                //富文本域
                CKEDITOR.replace('brief');
                }
        },
        error:function(){
            console.log("请求出错");
        }
    });
    //更新课程信息
    $('.steps').on('submit','form',function(){
        // alert(1);
        $(this).ajaxSubmit({
            type:'post',
            url:'/api/course/update/basic',
            success:function(data){
                //console.log(data);
                if(data.code==200){
                    location.href="/course/step2?id="+data.result.cs_id;
                }
            },
            error:function(){
                console.log("请求出错");
            }
        });
        return false;
    })
    
            
})