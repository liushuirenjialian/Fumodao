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
    })
}
function getDataList(data, cat) {
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
function createListHtml(_data, cat) {
    var dataOut = getDataList(_data, cat);
    var $content = $("div.content" + cat);
    var $list_nav = $content.find("div.list_nav");
    var $gif = $content.find('img.gif');
    var $list = $list_nav.find("div#list");
    var $heros = $list.find("ul.heros");
    var len = dataOut.length;
    /*左边list start*/
    if (len != 0) {
        // if (dataOut[0].custom_fields.gif != undefined) {
        //     $gif.attr('src', dataOut[0].custom_fields.gif[0]);
        // }
        var li_str = '';
        for (var i = 0; i < len; i++) {
            if (dataOut[i].custom_fields.icon != undefined) {
                li_str += '<li><span class="shadow"></span><img src="' + dataOut[i].custom_fields.icon[0] + '" alt=""></li>';
            }
        }
        $heros.html(li_str);
        $heros.find('li').eq(0).find('span').css('display','none');
    }
    /*左边list end*/
    /*右边英雄内容 start*/
    var $heros_contents = $content.find('div.heros_contents');
    if (len != 0) {
        for (var i = 0; i < len; i++) {
        	$heros_contents.append('<div class="hero_content hero_content'+i+' hide"><img class="gif" src="" alt=""><div class="qiyuan"><div class="img"></div></div><img class="hero_img" src="" alt=""><ul class="star"></ul><ul class="jineng"></ul><div class="wuqi"><img src=""><span></span></div></div>');//每个数据都是一个英雄
        	var $hero_content = $heros_contents.find('div.hero_content'+i);
            // console.log($hero_content);
        	var $qiyuan = $hero_content.find('div.qiyuan div.img');
        	var $star = $hero_content.find('ul.star');
        	var $jineng = $hero_content.find('ul.jineng');
        	var $wuqi = $hero_content.find('div.wuqi');
            var $gif1 = $hero_content.find('img.gif');
            /*奇缘*/
            if (dataOut[i].custom_fields.gif != undefined) {
                // console.log(dataOut[i].custom_fields.gif[0]);
                $gif1.attr('src', dataOut[i].custom_fields.gif[0]);
                // console.log(dataOut[i].custom_fields.gif[0]);
            }
            /*奇缘*/
            addQiyuan(dataOut[i], $qiyuan);
            /*右边英雄图*/
            if(dataOut[i].custom_fields.image != undefined) {
            	$hero_content.find('img.hero_img').attr('src', dataOut[i].custom_fields.image[0]);
            }
            /*star*/
            if(dataOut[i].custom_fields.star_num != undefined) {
                // $star.html('');
            	for(var j = 0; j < dataOut[i].custom_fields.star_num[0]; j ++) {
            		$star.append('<li><img src="img/hero/star.png" alt=""></li>');
            	}
            }
            /*技能*/
            addJineng(dataOut[i], $jineng);
            /*武器*/
            if(dataOut[i].custom_fields.weapon_name != undefined) {
            	$wuqi.find('span').text = dataOut[i].custom_fields.weapon_name[0];
            	if(dataOut[i].custom_fields.weapon_image != undefined) {
            		$wuqi.find('img').attr('src', dataOut[i].custom_fields.weapon_image[0]);
            	}
            }
        }
        $heros_contents.find('.hero_content').first().removeClass('hide');
    }
    /*右边英雄内容 end*/

}
function addJineng(data, $jineng) {
	if(data.custom_fields.skill1_image != undefined) {
		if(data.custom_fields.skill1_name != undefined) {
			$jineng.append('<li><img src="'+data.custom_fields.skill1_image[0]+'"><span>'+data.custom_fields.skill1_name+'</span></li>');
		} else {
			$jineng.append('<li><img src="'+data.custom_fields.skill1_image[0]+'"><span></span></li>');
		}
	}
	if(data.custom_fields.skill2_image != undefined) {
		if(data.custom_fields.skill2_name != undefined) {
			$jineng.append('<li><img src="'+data.custom_fields.skill2_image[0]+'"><span>'+data.custom_fields.skill2_name+'</span></li>');
		} else {
			$jineng.append('<li><img src="'+data.custom_fields.skill2_image[0]+'"><span></span></li>');
		}
	}
	if(data.custom_fields.skill3_image != undefined) {
		if(data.custom_fields.skill3_name != undefined) {
			$jineng.append('<li><img src="'+data.custom_fields.skill3_image[0]+'"><span>'+data.custom_fields.skill3_name+'</span></li>');
		} else {
			$jineng.append('<li><img src="'+data.custom_fields.skill3_image[0]+'"><span></span></li>');
		}
	}
	if(data.custom_fields.skill4_image != undefined) {
		if(data.custom_fields.skill4_name != undefined) {
			$jineng.append('<li><img src="'+data.custom_fields.skill4_image[0]+'"><span>'+data.custom_fields.skill4_name+'</span></li>');
		} else {
			$jineng.append('<li><img src="'+data.custom_fields.skill4_image[0]+'"><span></span></li>');
		}
	}
}
function addQiyuan(data, $qiyuan) {
    if (data.custom_fields.karma1_image != undefined) {
        if (data.custom_fields.karma1_intro != undefined) {
            $qiyuan.append('<div><img src="' + data.custom_fields.karma1_image[0] + '" alt=""><span class="description hide">' + data.custom_fields.karma1_intro[0] + '</span></div>');
        } else {
            $qiyuan.append('<div><img src="' + data.custom_fields.karma1_image[0] + '" alt=""><span class="description hide"></span></div>');
        }
    }
    if (data.custom_fields.karma2_image != undefined) {
        if (data.custom_fields.karma2_intro != undefined) {
            $qiyuan.append('<div><img src="' + data.custom_fields.karma2_image[0] + '" alt=""><span class="description hide">' + data.custom_fields.karma2_intro[0] + '</span></div>');
        } else {
            $qiyuan.append('<div><img src="' + data.custom_fields.karma2_image[0] + '" alt=""><span class="description hide"></span></div>');
        }

    }
    if (data.custom_fields.karma3_image != undefined) {
        if (data.custom_fields.karma3_intro != undefined) {
            $qiyuan.append('<div><img src="' + data.custom_fields.karma3_image[0] + '" alt=""><span class="description hide">' + data.custom_fields.karma3_intro[0] + '</span></div>');
        } else {
            $qiyuan.append('<div><img src="' + data.custom_fields.karma3_image[0] + '" alt=""><span class="description hide"></span></div>');
        }
    }
}
function nextPage(curContent) {
    // console.log(curContent);
    var num = 2;//一页显示条数
    var curNum = 0;//第一页

    var pages = curContent.find('ul#pages');
    // console.log(pages)
    var prev = curContent.find("li#prev");
    var next = curContent.find('li#next');
    // console.log(prev)
    var len = Math.ceil(pages.children('li').length / num);//页数
    // console.log(pages.children('li').length)

    //初始化显示第一页内容 隐藏后面
    function init(numToShow) {

        var numToShow = numToShow;
        for(var j = 0; j < len; j ++) {
            for(var i = 0; i < num; i ++) {
                if(pages.children('li').eq(j * num + i) == undefined) {
                    continue;
                }
                // console.log(j * num + i)
                pages.children('li').eq(j * num + i).css('display','none');
                // console.log("zhixing")
            }
        }
        for (var k = 0; k < num; k ++ ) {
            if(pages.children('li').eq(numToShow * num + k) == undefined) {
                continue;
            }
            pages.children('li').eq(numToShow * num + k).css('display','inline-block');
        }
    }

    init(0);
    prev.click(function() {
        if(curNum == 0) {
            return false;
        } else {
            // console.log("curNum" + curNum);
            init(curNum-1);
            return curNum--;
        }
    });
    next.click(function() {
        // console.log("len:"+len)
        if(curNum == len-1) {
            return false;
        } else {
            init(curNum+1);
            return curNum++;
        }
    });
}

$(function() {
    var url = "http://games.hoolai.com/cms/?json=get_category_posts&cat=221&include=title,content,categories,custom_fields&count=10000";

    request(url, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var _data = data.posts;
            /*创建html内容 start*/
            createListHtml(_data, 222);
            createListHtml(_data, 224);
            createListHtml(_data, 223);
            /*创建html内容 end*/
            var $title = $('div.main').find('ul.title').find('li');
            var $contents = $('div.main').find('div.content');
            
            /*点击英雄类型，显示对应的列表和英雄 start*/
            $title.each(function(index) {
                var _this = $(this); //the current obje
                _this.click(function() {
                    $contents.addClass('hide');
                    $contents.eq(index).removeClass('hide');
                });
            });
            /*点击英雄类型，显示对应的列表和英雄 end*/

            /*点击左边列表项，显示右边对应英雄内容  start*/
            $contents.each(function() {
                var _this = $(this);
                if(! _this.hasClass('hide')) {
                    // var $gif = _this.find('img.gif');
                    var $list = _this.find('#list').find('ul.heros').children('li');
                    var $hero_content = _this.find('div.heros_contents').find('div.hero_content');
                    $list.each(function(index){
                        var $this = $(this);
                        $this.click(function() {
                            $list.find('span').css('display','inline-block');

                            $(this).find('span').css('display','none');
                            // $gif.attr('src',)
                            $hero_content.addClass('hide');
                            $hero_content.eq(index).removeClass('hide');
                        });
                    });

                    var $qy = $('div.qiyuan').find('div.img').find('div');
                    $qy.each(function() {
                        var $qyThis = $(this);
                        $qyThis.hover(
                            function(){
                                $qyThis.find('span.description').removeClass('hide');
                            },function() {
                                $qyThis.find('span.description').addClass('hide');
                            });
                    });
                    /*分页*/
                    nextPage(_this);
                }
            });
            /*点击左边列表项，显示右边对应英雄内容  end*/
        }
    });



});

