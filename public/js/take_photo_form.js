var wraps = document.getElementsByClassName('wrap_line_block');

for (var i = 0; i < wraps.length; i++) {
	form = wraps[i].getElementsByTagName('form')[0];
	form.addEventListener('submit', function(e) {
		// console.log(this);
		e.preventDefault();
		var name_of_people = this.choose_name.value;
		var folder = this.getAttribute('id');;
		var files = takePhoto(folder);
		data = {
			name: name_of_people,
			folder: folder,
			files: files
		};
		$.ajax({
			type: "POST",
			url: "/single_choose",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			success: function(data){ 
				var span_count = document.getElementsByClassName('text_none_photo')[0].getElementsByTagName('span')[0];
				var count = span_count.innerHTML;
				var count_of_line = document.getElementById('wrap_line' + data).getElementsByClassName('elem_wrap_div').length;
				span_count.innerHTML = +count - count_of_line;

				var id_elem_del = "div[id='wrap_line" + data + "']";
				$(id_elem_del).fadeOut(400, 'swing', function(){});
			},
		});
	})
}


function takePhoto(name) {
	var form = document.getElementById(name);
	var elems_of_form = form.elements;
	var res_imgs = [];
	for (var i = 0; i < elems_of_form.length; i++) {
		if (!elems_of_form[i].checked) {
			if (elems_of_form[i].getAttribute('form') == name) {
				res_imgs.push(elems_of_form[i].name);
			}
			// console.log(elems_of_form[i].name + ' ' + elems_of_form[i].checked);
		}
	}
	return res_imgs;
}

