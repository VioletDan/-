define(["jquery", "ckeditor",'template', "datepicker", "datepicker-zh", "region","uploadify","form"],function($,CKEDITOR,template){
    
	//向后台发送请求,渲染个人中心的内容
	$.ajax({
		url:'/api/teacher/profile',
		type:'get',
		success:function(data){
			//console.log(data);
			var html=template('person-tpl',data.result);
			$('.settings').html(html);
			//模板渲染成功后,才能使用插件
			//<插件的使用>
			//日历
			$("input[name=tc_birthday]").datepicker({
				format: "yyyy-mm-dd",
				language: "zh-CN"
			});
			$("input[name=tc_join_date]").datepicker({
				format: "yyyy-mm-dd",
				language: "zh-CN"
			});
			
			//省级联动
			$("#region").region({
				url: "/views/assets/jquery-region/region.json"
			});
			//富文本编辑器
			CKEDITOR.replace("introduce", {
				toolbarGroups: [
					{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
					{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
					{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
					{ name: 'styles' },
					{ name: 'colors' },
					{ name: 'about' }
				]
			});
			//上传图片
			$('#upfile').uploadify({
				swf: "/views/assets/uploadify/uploadify.swf",
				uploader: "/api/uploader/avatar",
				fileObjName: "tc_avatar",
				width:120,
				height:120,
				buttonText:'',
				itemTemplate:'<p></p>',
				onUploadSuccess:function(file, data){
					//因为data是一个json字符串,所以要转换成js对象
					var data=JSON.parse(data);
					$('.preview>img').attr('src',data.result.path);
					
				}	
			});
			//<插件的使用>
		},
		error:function(){
			console.log('请求出错');
		}
	});
	//点击保存按钮,发送请求,更新个人资料
	$('.settings').on('submit','form',function(){
		$(this).ajaxSubmit({
			url:'/api/teacher/modify',
			type:'post',
			success:function(data){
				if(data.code==200){
					alert("修改资料成功");
					location.href='/';
				}
			}
		});
		return false;
	})
	
	
})