function asyncFetch(url) {
    var deferred = $.Deferred();
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function(data) {
            deferred.notify("fetching");
            if (data) {
                // console.log(data.total);
                deferred.resolve(data);
            } else {
                deferred.reject("nothing got");
            }
        },
        error: function(xhr, errorType, error) {
            console.log("nihao")

        }

    });
    return deferred;
}


function setStyle(img_width, count) {
    $('div.coor').children('ul').css('width', (img_width * count) + 'px')
}

$(function() {
    var img_width = 198;
    var img_height = 156;
    var url = 'http://192.168.1.231:8086/h/api/index/getFriendlyList?rows=500';

    var promise = asyncFetch(url);
    promise.then(function(data) {
        if (data) {
            // console.log("zhixin")
            // 插入友链图片
            var imgs = data.rows;
            // console.log(imgs)
            var coor_str = '';
            var li_str = '';
            var i = 0;
            var href = '';
            var img_src = '';
            var len = imgs.length;
            while (i < len) {
                li_str = '<li>';
                href = imgs[i].tourl;
                img_src = imgs[i++].imgurl;
                li_str += '<a target="_blank" href="' + href + '"><img src="' + img_src + '"></a>';
                if (i < len) {
                    href = imgs[i].tourl;
                    img_src = imgs[i].imgurl;
                    li_str += '<a target="_blank" href="' + href + '"><img src="' + img_src + '"></a>';
                } else {
                    li_str += '</li>'
                }
                i++;
                coor_str += li_str;
            }
            $('div.coor').children('ul').html(coor_str);
            //coor,ul,li，img的css设置（宽度，高度，边距）
            var count = Math.ceil(data.total / 2);
            setStyle(img_width, count)
            // console.log($('.coor ul li').length);
            var li_len = $('.coor ul li').length;
            var li_width = parseInt($('.coor ul li').css('width'));
            // console.log("li_width:" + li_width);
            var curr = 0;
            var coor_timer = null;

            function tab1(curr) {
                if (curr > 0) {
                    $('.coor ul').animate({
                        left: -curr * li_width,
                    }, 500);
                } else {
                    $('.coor ul').css('left', 0);
                }
            }
            coor_timer = setInterval(function() {
                curr++;
                curr = (curr + li_len) % li_len;
                tab1(curr);
            }, 3000);
        }
    });

    /*coorderations start*/
})
