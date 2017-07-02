define(["jquery", "ckeditor", "datepicker", "datepicker-zh", "region"],function($,CKEDITOR){
    
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
})