define(["jquery","template","util","form","validate","datepicker","datepicker-zh"],function($,template,util){
   var query=util.subStr();
   if(query.tcid){
        $.ajax({
            type:'get',
            url:'/api/teacher/edit',
            data:{
                tc_id:query.tcid
            },
            success:function(data){
                //console.log(data);
                //0管理员1讲师
                data.result.title='讲师编辑';
                data.result.btnText='保存';
                data.result.type='editor';
                var html=template('teachmanage-tpl',data.result);
                $('.teacher').html(html);
                //日历插件
                $("input[name=tc_join_date]").datepicker({
					format: "yyyy-mm-dd",
					language: "zh-CN"
				});
                //表单验证
                $('#form').validate({
                    sendForm:false,
                    onBlur: true,
                    onKeyup: true,
                    sendForm:false,
                    description:{
                        "tcname": {
                            required: "请输入用户名",
                        },
                        "tcpass": {
                            required: "请输入密码",
                        },
                        "tcjoindate": {
                            required: "请输入入职时间",
                        },
                    },
                    eachInvalidField:function(){
                        this.parent().parent().addClass("has-error").removeClass("has-success");
                        this.parent().next().removeClass("hide").show();
                    },
                    eachvalidField:function(){
                        this.parent().parent().addClass("has-success").removeClass("has-error");
                    },
                    valid:function(){
                        //alert(1);
                        //表单提交
                        $('#form').ajaxSubmit({
                            type:'post',
                            url:'/api/teacher/update',
                            data:{
                                tc_id:query.tcid
                            },
                            success:function(data){
                                if(data.code==200){
                                    location.href='/teacher/list';
                                    //不要忘记加value
                                }
                            }
                        })
                    }
                })
            },
            error:function(){
                console.log('请求出错');
            }
        });
   }else{
        var html =template('teachmanage-tpl',{
            title:'讲师添加',
            btnText:'添加',
            type:'add'
        });
        $('.teacher').html(html);
        //日历插件
        $("input[name=tc_join_date]").datepicker({
            format: "yyyy-mm-dd",
            language: "zh-CN"
        });
        //表单验证
        $('#form').validate({
            onBlur: true,
			onKeyup: true,
            sendForm:false,
            description:{
                "tcname": {
					required: "请输入用户名",
				},
				"tcpass": {
					required: "请输入密码",
				},
				"tcjoindate": {
					required: "请输入入职时间",
				},
            },
            eachInvalidField:function(){
                this.parent().parent().addClass("has-error").removeClass("has-success");
				this.parent().next().removeClass("hide").show();
            },
            eachvalidField:function(){
                this.parent().parent().addClass("has-success").removeClass("has-error");
            },
            valid:function(){
                //表单提交
                $('#form').ajaxSubmit({
                    type:'post',
                    url:'/api/teacher/add',
                    success:function(data){
                        if(data.code==200){
                            location.href='/teacher/list';
                            //不要忘记加value
                        }
                    }
                })
            }

        })
   }

   //处理按钮事件
//    $('.teacher').on('click','#btnSave',function(){
//        var type=$(this).data('type');
//        var url='';
//        if(type=='editor'){
//            url='/api/teacher/update';
//        }else{
//            url='/api/teacher/add';
//        }
//        //表单提交
//        $('#form').ajaxSubmit({
//           type:'post',
//           url:url,
//           data:{
//             tc_id:query.tcid
//           },
//           success:function(data){
//             if(data.code==200){
//                 location.href='/teacher/list';
//                 //不要忘记加value
//             }
//           }
//        })
//         return false;
//    })


})