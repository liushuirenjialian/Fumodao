$(function() {
	var url = "http://games.hoolai.com/cms/?json=get_category_index&parent=220";
	function request(url, cal) {
		$.ajax({
			url: url,
			dataType: "jsonp",
			type: "get",
			success: function(resp) {
				cal(false, resp);
			},
			error: function(resp) {
				cal(resp);
			}
		})
	}

	request(url, function(err, data) {
		if(err) {

			console.log(err);
		} else {
			var _data = data.categories;
			var len = _data.length;
			var $content = $("ul.content");
			var li_str = '';

			for(var i = 0; i < len; i ++) {
				li_str += '<li class="' + _data[i].slug + '"><a href=' + _data[i].slug + '.html?cat=222>' + _data[i].title + '</a></li>';
			}
			$content.append(li_str);
		}
	});
});