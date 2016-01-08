$(function() {
url="http://games.hoolai.com/cms/?post_id=6611&json=get_post";
function request(url, cal) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        success: function(resp) {
            cal(false, resp);
        },
        error: function(resp) {
            cal(resp)
        }
    });
}
function delHtmlTag(str) {
    var strTemp = str.replace(/<[^>]+>/g, ""); //去掉所有的html标记
    // if (strTemp.length > 54) {
    //     strTemp = strTemp.substring(0, 54);
    // }
    return strTemp ;
}
function strToJson(str){
    var json = (new Function("return " + str))();
    return json;
}
// function strToJson(str){
//      var json = eval('(' + str + ')');
//      return json;
// }
function readJson(str) {

}
request(url, function(err, data) { //今日头条
        if (err) {
            console.log(err);
        } else {
            var _data = data.post;
            // console.log(_data.length);
            // var str = JSON.parse(delHtmlTag(_data.content));
            var str = delHtmlTag(_data.content);
            console.log(typeof str);
            var str1 = str.replace(new RegExp(/(&#8220;)/g),'"');
            var str2 = str1.replace(new RegExp(/(&#8221;)/g),'"');
            var str3 = str2.replace(new RegExp(/(&#215;)/g),'x');
            // var json = JSON.parse(str2);
            console.log(str3);
            // $('div.content').text(str3);
            // var str3 = strToJson(str2);
            // console.log(str3)
            console.log(decodeURI("http://games.hoolai.com/cms/wp-content/uploads/2015/07/胡1莱三国-300&#215;300.png"));
            


        }
    });
});