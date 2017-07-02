define(["jquery","template","util","form"],function($,template,util){
   var query=util.subStr();
   if(query){
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
   }
   //处理按钮事件
   $('.teacher').on('click','#btnSave',function(){
       var type=$(this).data('type');
       var url='';
       if(type=='editor'){
           url='/api/teacher/update';
       }else{
           url='/api/teacher/add';
       }
       //表单提交
       $('#form').ajaxSubmit({
          type:'post',
          url:url,
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
        return false;
   })


})