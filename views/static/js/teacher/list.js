define(["jquery","template","bootstrap"],function($,template){
    //渲染列表
    $.ajax({
        url:'/api/teacher',
        type:'get',
        success:function(data){
            //console.log(data);
            if(data.code==200){
                var html = template('list-tpl',data);
                $("#teacherlist").html(html);
            }
        },
        error:function(){
            console.log("请求出错");
        }
    });
    //模态框 利用事件委托事件
    $('#teacherlist').on('click',".btn-check",function(){
        var tcid = $(this).parent().data('id');
        $.ajax({
            type:'get',
            url:'/api/teacher/view',
            data:{
                tc_id:tcid
            },
            success:function(data){
                //console.log(data.result);
                if(data.code==200){
                    var html = template('modal-tpl',data.result);
                    $('#teacherModal').html(html);
                    $('#teacherModal').modal('show');
                }
            },
            error:function(){
                console.log('请求出错');
            }
        });
    });
    //注销和启用讲师功能
    $('#teacherlist').on('click','.btn-onff',function(){
        var tcid = $(this).parent().data('id');
        var tcstatus=$(this).data('status');
        var $that=$(this);
        $.ajax({
            type:"post",
            url:'/api/teacher/handle',
            data:{
                tc_id:tcid,
                tc_status:tcstatus
            },
            success:function(data){
                //console.log(data);
                if(data.code==200){
                    //每次后台返回的数据都渲染到data-stasus上,然其动态的变化,在判断按钮状况
                    $that.data('status',data.result.tc_status);
                    if(data.result.tc_status==1){
                        //data.result.tc_status是1,代表从前台传过去的是0,按钮的内容为注销,所以判断后台的状态,就可以动态的改变按钮的内容了
                        $that.removeClass('btn-warning');
                        $that.text("启 用");
                        $that.addClass('btn-success');
                    }else{
                        $that.removeClass('btn-success');
                        $that.text("注 销");
                        $that.addClass('btn-warning');
                    }
                }
            },
            error:function(){
                console.log('请求出错');
            }
        });
    });




})
