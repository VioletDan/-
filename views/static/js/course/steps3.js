define(["jquery","template","util","ckeditor","form","bootstrap"],function($,template,util,CKEDITOR){
    var csid=util.subStr().id;
    //console.log(csid);
    $.ajax({
        url:"/api/course/lesson",
        type:"get",
        data:{
            cs_id:csid
        },
        success:function(data){
            //console.log(data);
            var html=template("lessons-tpl",data.result);
            $(".steps").html(html);
        }
    });
    //点击跳到添加课程
    $(".steps").on("click","#lesson",function(){
        // alert(1);
        var html=template("modal-tpl",{
            title:"添加课时",
            btnText:"添加",
            type:"add"
        });
        $(".modal-content").html(html);
		$("#chapterModal").modal("show");
    })
    //点击编辑跳转到模态框
    $(".steps").on("click","#editor",function(){
        var ctid=$(this).data("id");
        //alert(ctid);
        $.ajax({
            url:"/api/course/chapter/edit",
            type:"get",
            data:{
                ct_id:ctid,
            },
            success:function(data){
                if(data.code==200){
                    //console.log(data);
                    data.result.title="编辑课程";
                    data.result.btnText="保存";
                    data.result.type="editor";
                    var html=template("modal-tpl",data.result);
                    $(".modal-content").html(html);
                    $("#chapterModal").modal("show");
                }
                
            }
        });
       
    })
    //添加和编辑课程
    $(".modal-content").on("click","#btnSave",function(){
        //alert(1);
        var type=$(this).data("type");
        var isfree=0;
        if($("#isfree").prop("checked")){
            isfree=1;
        }
        var url="/api/course/chapter/add";
        if(type=="editor"){
            url="/api/course/chapter/modify";
        }
        $("form").ajaxSubmit({
            type:"post",
            url:url,
            data:{
                ct_is_free:isfree
            },
            success:function(data){
                if(data.code==200){
                    $("#chapterModal").modal("hide");
                    //局部渲染课时
                    //window.location.reload();
                    $.ajax({
                        url:"/api/course/lesson",
                        type:"get",
                        data:{
                            cs_id:csid
                        },
                        success:function(data){
                            if(data.code==200){
                                //console.log(data);
                                var html=template("lessonslist-tpl",data.result);
                                $(".lessons>ul").html(html);
                            }
                        }
                    })
                }
            }
        });
    })

            
})