$(function() {
    // var settings = {
    //     contents: 'pages',
    //     num:1,
    //     ini: '0',
    //     prevBtn: 'prev',
    //     nextBtn: 'next'
    // };
    function nextPage() {
        var num = 1;//一页显示条数
        var initNum = 0;//第一页
        var $main = $('div.main').find('content223');
        var pages = $main.find('ul#pages');
        // console.log(pages)
        var prev = $main.find("li#prev");
        var next = $main.find('li#next');
        var len = Math.ceil(pages.children('li').length / num);//页数
        console.log(pages.children('li').length)

        //初始化显示第一页内容 隐藏后面
        function init(numToShow) {

            var numToShow = numToShow;
            for(var j = 0; j < len; j ++) {
                for(var i = 1; i <= num; i ++) {
                    if(pages.children('li').eq(j * num + i) == undefined) {
                        continue;
                    }
                    console.log(pages.children('li').eq(j * num + i))
                    pages.children('li').eq(j * num + i).css('display','none');
                    console.log("zhixing")
                }
            }
            for (var k = 1; k <= num; k ++ ) {
                if(pages.children('li').eq(numToShow * num + k) == undefined) {
                    continue;
                }
                pages.children('li').eq(numToShow * num + k).css('display','inline-block');
            }
        }


        init(0);
    }
    nextPage();
});