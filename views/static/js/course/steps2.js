define(["jquery","template","util","ckeditor","form","uploadify","jcrop"],function($,template,util,CKEDITOR){
    var csid=util.subStr().id;
    var x = 0;
	var y = 0;
	var w = 0;
	var h = 0;
    var jcrop_api;
    //console.log(csid);
    $.ajax({
        type:"get",
        url:'/api/course/picture',
        data:{
            cs_id:csid
        },
        success:function(data){
            //console.log(data);
            if(data.code==200){
                var html=template('steps2-tpl',data.result);
                $('.steps').html(html);
                //上传图片
                $("#uploadBtn").uploadify({
                    swf: "/views/assets/uploadify/uploadify.swf",
                    uploader:"/api/uploader/cover",
                    buttonText:'选择图片',
                    buttonClass: "btn btn-sm btn-success",
                    width:70,
                    itemTemplate:'<p></p>',
				    fileObjName: "cs_cover_original",
                    formData: {
                        cs_id: csid
                    },
                    onUploadSuccess:function(file, data,response){
                        //因为data是一个json字符串,所以要转换成js对象
                        var data=JSON.parse(data);
                        //console.log(data);
                        $('.preview>img').attr('src',data.result.path);                       
                    }
                });
                //修复插件小问题
                $('#uploadBtn-button').css("line-height","1.5");
            }          
        },
        error:function(){
            console.log("请求出错");
        }
    }); 
    //裁剪图片
    $('.steps').on("click","#cropBtn",function(){
        var type=$(this).attr("otype");
        if(type=="cut"){
            $(".thumb>img").remove();
            $(".preview>img").Jcrop({
                boxWidth: 400,
                aspectRatio: 2,
                setSelect: [0, 0, 200, 200]
            },function(){
                jcrop_api = this;
                thumbnail = this.initComponent('Thumbnailer', { width: 240, height: 120, thumbnail: ".thumb"});
            });
            $(".preview").on("cropmove", function(a, b, c){
                x = c.x;
                y = c.y;
                w = c.w;
                h = c.h;    
            })
            $(this).attr("otype","save");
            $(this).text("保存图片");
        }else{
            //console.log(x,y,w,h);
            //data-type有毛病
            $.ajax({
                type:"post",
                url:"/api/course/update/picture",
                data:{
                    cs_id:csid,
                    x:x,
                    y:y,
                    w:w,
                    h:h
                },
                success:function(data){
                    //console.log(data);
                    location.href="/course/step3?id="+data.result.cs_id;
                }
            });
        }
        return false;
    })   
})