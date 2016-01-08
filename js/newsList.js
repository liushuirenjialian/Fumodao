function request(url, cal) {
    $.ajax({
        url: url,
        dataType: "jsonp",
        type: "get",
        success: function(resp) {
            cal(false, resp);
            // showHeros();
        },
        error: function(resp) {
            cal(resp);
        }
    });
}

function getDataList(cat, data) {
    var dataList = [],
        dataLen = data.length;
    for (var i = 0; i < dataLen; i++) {
        var catLen = data[i].categories.length;
        for (var j = 0; j < catLen; j++) {
            if (data[i].categories[j].id == cat) {
                dataList.push(data[i]);
            }
        }
    }
    return dataList;

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

        for (var i = 0; i < data_len; i++) {
            data = dataList[i];
            lis_str += '<li><a href="newsContent.html#post_id=' + data.id + '&tag=' + tag + '">' + data.title + '</a><span>' + getDate(data.date) + '</span></li>'
        }
    }
    return lis_str;
}

function setMoreTag() {
    // var $more = $('div.news').children('a.more');
    var $newsTitle = $('div.news').children('ul.title').children('li');
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
    // $more.attr('href', 'newsList.html#' + tag);
}

$(function() {
    var url = "http://games.hoolai.com/cms/?json=get_category_posts&cat=226&include=title,content,categories,custom_fields,date&count=10000";
    request(url, function(err, data) { //新闻
        if (err) {
            console.log(err);
        } else {
            var _data = data.posts;
            console.log(_data.length)
            var news_data = getDataList(228, _data);
            console.log('news:'+news_data.length)
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

        }
    });

});
