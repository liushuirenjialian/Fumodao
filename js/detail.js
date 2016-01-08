function request(url) {
    var deferred = $.Deferred();
    $.ajax({
        url: url,
        type: "POST",
        dataType: "JSONP",
        success: function(data, status, xhr) {
            deferred.notify("fetching");
            if (data) {
                deferred.resolve(data.post);
            } else {
                deferred.reject("nothing got");
            }
        },
        error: function(xhr, errorType, error) {
           
        }
    });
    return deferred;
}
//get the  section of  url 
function getArgs(strs) {
    var _strs = strs.length > 0 ? strs.substring(1) : '',
        args = {},
        items = _strs.split('&'),
        len = items.length,
        mame = null,
        value = null,
        item = [];
    if (_strs.length == 0) {
        console.log('没有要读取的字符串');
        return;
    }
    for (var i = 0; i < len; i++) {
        item = items[i].split("=");
        name = item[0];
        value = item[1];
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        args[name] = value;
    }
    return args;
}
// ?
$(function() {
    var content_img = $('div.con div img');
    content_img.each(function() {
        $this = $(this);
        console.log($this.css('width') + 'aa' + $this.css('height'));
    })

   

     

    var hash = window.location.hash;
    var args = getArgs(hash);

    var tag ='';
    if(args) {
        tag = args['tag'];
    }
  //add the title of head
    if (tag == 188) {
        $('div.tab_pos').text('最新消息');
    }
    if (tag == 229) {
          $('div.tab_pos').text('活动')
    }
    if (tag == 228) {
          $('div.tab_pos').text('新闻')
    }
    if (tag == 230) {
       $('div.tab_pos').text('公告')
    }
    


    // console.log(args); TODAY  HOT  HOW To DETAIL?  
   //如tag=186 ，nav ul li 下的a url 为188   否则：传值 tag
/*   var tag='';
    if (args['tag'] == 227) { //新闻资讯href  186 hot 导航栏 新闻资讯的href加
        $('div.nav').children('ul').children('li').find('a.news').attr('href', 'newsList.html#227'); //188 newest
    } else {
        $('div.nav').children('ul').children('li').find('a.news').attr('href', 'newsList.html#' + args['tag']);
    }
*/
    var url = 'http://games.hoolai.com/cms/?post_id=' + args['post_id'] + '&json=get_post&include=title,content,author,date';
    var promise = request(url);
    promise.then(function(data) {
        if (data) {
            $('div.con').children('p.info').text('作者：' + data.author.name + ' 发布时间：' + data.date);
            $('div.con').children('h2.title').text(data.title);
            $('div.con').children('div.article_content').html(data.content);

            /*start   图片宽度控制在900px以内，小于900不处理，大于900等比例压缩*/
            var images = $('div.con div.article_content img');
            // console.log('img:' + images)
            var cur_width = 860;
            images.each(function() {
                    // console.log("zhi")
                    if (images) {
                        var width = parseInt($(this).css('width'));
                        var height = parseInt($(this).height());
                        console.log('width:' + width + '' + 'height:' + height)
                        console.log(width > cur_width)
                        if (width > cur_width) {
                            var cur_height = height / width * cur_width;
                            $(this).width(cur_width);
                            $(this).height(cur_height);
                            console.log('width:' + $(this).css('width') + '' + 'height:' + $(this).height())
                        };
                    }
                })
                /*end      图片宽度控制在900px以内，小于900不处理，大于900等比例压缩*/
                /*start    图片居中居左居右处理*/
            $('.article_content img').parent().wrap('<div class="pic"></div>')

            var $pics = $('div.con').find('div.pic');

            $pics.each(function() {
                    var $this = $(this);
                    var $img = $this.find('img');
                    if ($img.hasClass('aligncenter')) {
                        $this.css('text-align', 'center');
                    }
                    if ($img.hasClass('alignleft')) {
                        $this.css('text-align', 'left');
                    }
                    if ($img.hasClass('alignright')) {
                        $this.css('text-align', 'right');
                    }
                    if ($img.hasClass('alignnone')) {
                        $this.css('text-align', 'center');
                    }
                })
                /*end        图片居中居左居右处理*/
        }
    });

});
