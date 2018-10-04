
var big_lines = document.getElementsByClassName('wrap_line_block');


for(var i = 0; i < big_lines.length; i++) {
	big_lines[i].addEventListener('click', function(e) {
		if (e.target.tagName === 'IMG') {
			var show_block = this.getElementsByClassName('left_block_show')[0];
			show_block.style.backgroundImage = "url('" + e.target.src + "')";
		}
	})

	var elems = big_lines[i].getElementsByClassName('elem_wrap_div');
	var width_elem = elems[0].offsetWidth + 25;
	console.log(width_elem);
	big_lines[i].getElementsByClassName('wrap_for_scroll_rb')[0].style.width = (+elems.length * width_elem) + 'px';
}

// For show first big image
for(var i = 0; i < big_lines.length; i++) {
	var left_block_show = big_lines[i].getElementsByClassName('left_block_show')[0];
	var img_src = big_lines[i].getElementsByTagName('img')[1].src;
	left_block_show.style.backgroundImage = "url('" + img_src + "')";
}
