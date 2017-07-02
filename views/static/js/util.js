define(function(){
    return {
        subStr:function () {
            var url=location.search;
            var str=url.slice(1);
            //console.log(str);//name=123&age=18
            var obj={}; 
            var str2=str.split('&');
            //console.log(str2);//["name=123", "age=18"]
            for(var k in str2){
                var str3=str2[k].split('=');//['name',123]
                obj[str3[0]]=str3[1];//{name: "123", age: "18"}
            }
            return obj;
           
            
        },
        getSubstr:function (key){
            return subStr()[key];
        }
    };
});
