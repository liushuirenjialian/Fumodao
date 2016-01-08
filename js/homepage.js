
var toutiao_url = "http://games.hoolai.com/cms/?post_id=6643&json=get_post&include=title";
var news_url = "http://games.hoolai.com/cms/?cat=226&json=get_category_posts&include=title,categories,date&count=1000";
var android_url = "http://games.hoolai.com/cms/?post_id=6292&json=get_post&include=title,custom_fields";
var ios_url = "http://games.hoolai.com/cms/?post_id=6295&json=get_post&include=title,custom_fields";
$(function() {
    request(ios_url, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            if (data.post.custom_fields != {}) {
                var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                var scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
                var $btns = $('div.wrap').find('div.dl');
                var $ios = $btns.find('a.ios');
                console.log(data.post.custom_fields);
                var custom_fields = data.post.custom_fields;
                console.log(custom_fields.url == undefined);
                if (custom_fields.href_url != undefined) {
                    
                    $ios.attr('href', custom_fields.href_url[0]);
                } else {
                    if (custom_fields.intro != undefined) {
                        // var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                        // var scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
                        $ios.click(function() {
                            
                            $('div.pop2').append('<p class="erweima">' + custom_fields.intro[0] + '</p>')
                            $('div.pop2').css('display', 'block');
                            $(".touming_bg").html('<div id="pop" style="height: ' + scrollHeight + 'px; width:' + scrollWidth + 'px; opacity: 0.6; z-index: 99; position: absolute; top: 0px; left: 0; background: rgb(0, 0, 0);"></div>');
                        });
                        $('div.pop2 a.close').click(function() {
                            $('div.pop2').css('display', 'none');
                            $('.touming_bg').html('');
                        })
                        $(".touming_bg").click(function() {
                            $('div.pop2').css('display', 'none');
                            $(".touming_bg").html('');
                        });
                    } else {
                        // var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                        // var scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
                        $ios.click(function() {
                           
                            $('div.pop2').append('<p class="erweima">敬请期待！</p>')
                            $('div.pop2').css('display', 'block');
                            $(".touming_bg").html('<div id="pop" style="height: ' + scrollHeight + 'px; width:' + scrollWidth + 'px; opacity: 0.6; z-index: 99; position: absolute; top: 0px; left: 0; background: rgb(0, 0, 0);"></div>');
                        });
                        $('div.pop2 a.close').click(function() {
                            $('div.pop2').css('display', 'none');
                            $('.touming_bg').html('');
                        })
                        $(".touming_bg").click(function() {
                            $('div.pop2').css('display', 'none');
                            $(".touming_bg").html('');
                        });
                    }
                }
            }

        }
    });
    request(android_url, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            if (data.post.custom_fields != {}) {
                var $btns = $('div.wrap').find('div.dl');
                var $andr = $btns.find('a.android');
                console.log(data.post.custom_fields);
                var custom_fields = data.post.custom_fields;
                console.log(custom_fields.url == undefined);
                if (custom_fields.href_url != undefined) {
                    
                    $andr.attr('href', custom_fields.href_url[0]);
                } else {
                    if (custom_fields.intro != undefined) {
                        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                        var scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
                        $andr.click(function() {
                           
                            $('div.pop2').append('<p class="erweima">' + custom_fields.intro[0] + '</p>')
                            $('div.pop2').css('display', 'block');
                            $(".touming_bg").html('<div id="pop" style="height: ' + scrollHeight + 'px; width:' + scrollWidth + 'px; opacity: 0.6; z-index: 99; position: absolute; top: 0px; left: 0; background: rgb(0, 0, 0);"></div>');
                        });
                        $('div.pop2 a.close').click(function() {
                            $('div.pop2').css('display', 'none');
                            $('.touming_bg').html('');
                        })
                        $(".touming_bg").click(function() {
                            $('div.pop2').css('display', 'none');
                            $(".touming_bg").html('');
                        });
                    } else {
                        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                        var scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
                        $andr.click(function() {
                           
                            $('div.pop2').append('<p class="erweima">敬请期待！</p>')
                            $('div.pop2').css('display', 'block');
                            $(".touming_bg").html('<div id="pop" style="height: ' + scrollHeight + 'px; width:' + scrollWidth + 'px; opacity: 0.6; z-index: 99; position: absolute; top: 0px; left: 0; background: rgb(0, 0, 0);"></div>');
                        });
                        $('div.pop2 a.close').click(function() {
                            $('div.pop2').css('display', 'none');
                            $('.touming_bg').html('');
                        })
                        $(".touming_bg").click(function() {
                            $('div.pop2').css('display', 'none');
                            $(".touming_bg").html('');
                        });
                    }
                }
            }
        }
    });

    request(toutiao_url, function(err, data) { //今日头条
        if (err) {
            console.log(err);
        } else {
            var _data = data.post;
            // console.log(_data.length);
            if (_data) {
                $('div.news a.toutiao').text(_data.title).attr('href','newsContent.html#post_id='+_data.id);                
            } else {
                console.log("后台没有发文章");
            }


        }
    });

    request(news_url, function(err, data) { //新闻
        if (err) {
            console.log(err);
        } else {
            var _data = data.posts;
            var news_data = getDataList(228, _data);
            var gonggao_data = getDataList(230, _data);
            var activity_data = getDataList(229, _data);
            var newest_data = getDataList(227, _data);
            var $content = $('div.news').find('ul.content');

            var $newest = $('div.news').find('ul.title').find('li.newest');
            var $news = $('div.news').find('ul.title').find('li.newsx');
            var $activity = $('div.news').find('ul.title').find('li.activity');
            var $gonggao = $('div.news').find('ul.title').find('li.gonggao');
            $content.html(getNewsLis(newest_data, 227));
            setMoreTag();
            $newest.click(function() {
                $newest.siblings('li').removeClass('cur');
                $newest.addClass('cur');
                setMoreTag();
                $content.html(getNewsLis(newest_data, 227));
            });
            $news.click(function() {
                $news.siblings('li').removeClass('cur');
                $news.addClass('cur');
                setMoreTag();
                $content.html(getNewsLis(news_data, 228));
            });
            $activity.click(function() {
                $activity.siblings('li').removeClass('cur');
                $activity.addClass('cur');
                setMoreTag();
                $content.html(getNewsLis(activity_data, 229));
            });
            $gonggao.click(function() {
                $gonggao.siblings('li').removeClass('cur');
                $gonggao.addClass('cur');
                setMoreTag();
                $content.html(getNewsLis(gonggao_data, 230));
            });


            // console.log(news_data[0].title)
            // console.log(gonggao_data[0].title)
            // console.log(activity_data[0].title)
            // console.log(newest_data[0].title)

        }
    });

});


function setMoreTag() {
    var $more = $('div.news_content').children('a.more');
    var $newsTitle = $('div.news_content').children('ul.title').children('li');
    var tag = 227;
    var $cur;
    $newsTitle.each(function() {
        if ($(this).hasClass('cur')) {
            $cur = $(this);
        }
    });
    // console.log($cur)
    if ($cur.hasClass('newest')) {
        tag = 188;
    }
    if ($cur.hasClass('newsx')) {
        tag = 189;
    }
    if ($cur.hasClass('gonggao')) {
        tag = 200;
    }
    if ($cur.hasClass('activity')) {
        tag = 199;
    }
    $more.attr('href', 'newsList.html#' + tag);
}
function morebut(){
    var $more=$('div.news_content').children('a.more');
    var $newsTitle=$('div.news_content').children('ul.title').children('li');
    var tag=227;
    $newsTitle.each(function(){//each ()方法用来让dom循环结构更简单更不易出错 迭代juery对象中的每一个dom元素
        //每次回调函数执行时，会传递当前循环次数作为参数回调函数是在当前dom元素为上下文的语境中触发的pngthis指向这个元素
        if($(this).hasClass('cur')){
            $cur=$(this);
        }
    })
    if($cur.hasClass('newest')){
        tag= 188;
    }
    if($cur.hasClass('newsx')){
        tag=189;
    }
    $more.attr('href','newsList.html#'+tag);

}

function getDate(date) {
    var _date = date.substr(0, 10);
    return _date;
}

function getNewsLis(dataList, tag) {

    var lis_str = '';
    var data;
    if (dataList) {
        var data_len = dataList.length;
        if (data_len >= 4) {
            for (var i = 0; i < 4; i++) {
                data = dataList[i];
                lis_str += '<li><a href="newsContent.html#post_id=' + data.id + '&tag=' + tag + '">' + data.title + '</a><span">' + getDate(data.date) + '</span></li>'
            }
        } else {
            for (var i = 0; i < data_len; i++) {
                data = dataList[i];
                lis_str += '<li><a href="newsContent.html#post_id=' + data.id + '&tag=' + tag + '">' + data.title + '</a><span>' + getDate(data.date) + '</span></li>'
            }
        }
    }

    return lis_str;
}

function getDataList(cat, posts) {
    var posts_len = posts.length;
    var dataList = [];
    if (posts_len == 0) {
        return null;
    }
    for (var j = 0; j < posts_len; j++) {
        var cat_len = posts[j].categories.length;

        for (var i = cat_len - 1; i >= 0; i--) {
            if (posts[j].categories[i].id == cat) {
                dataList.push(posts[j]);
            }
        }

    }
    return dataList;
}

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
