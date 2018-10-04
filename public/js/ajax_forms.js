// var form_send = document.forms.user_prop;

// form_send.addEventListener('submit', function (e) {
// 	e.preventDefault();
// 	var userName = form_send.userName.value;
// 	var userAge = form_send.userAge.value;

// 	data = {
// 		userName: userName,
// 		userAge: userAge
// 	};
// 	$.ajax({
// 		type: "POST",
// 		url: "/ajaxPost",
// 		data: JSON.stringify({userName: userName, userAge: userAge}),
// 		dataType: "json",
// 		contentType: "application/json",
// 		success: function(data){ 
// 			console.log(data);
// 			// $('#awd').text = data;
// 		},
// 	});
// });

var buttons_del_line = document.getElementsByClassName('get_out_button');

for (var i = 0; i < buttons_del_line.length; i++) {
	buttons_del_line[i].addEventListener('click', function(e) {
		var folder_for_del = this.getAttribute('fold_del');
		data = {
			folder: folder_for_del
		};
		$.ajax({
			type: "POST",
			url: "/del_line",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			success: function(data) { 
				var span_count = document.getElementsByClassName('text_none_photo')[0].getElementsByTagName('span')[0];
				var count = span_count.innerHTML;
				var count_of_line = document.getElementById('wrap_line' + data).getElementsByClassName('elem_wrap_div').length;
				span_count.innerHTML = +count - count_of_line;

				var id_elem_del = "div[id='wrap_line" + data + "']";
				console.log(id_elem_del);

				$(id_elem_del).fadeOut(400, 'swing', function(){});
			},
		});
	});
}

var wrap_div_add = document.getElementsByClassName('add_people')[0];
var input_add = wrap_div_add.getElementsByTagName('input')[0];
var button_add = wrap_div_add.getElementsByTagName('button')[0];
var res_flag = wrap_div_add.getElementsByTagName('p')[0];

input_add.addEventListener('keyup', function(e) {
	if (this.value.length > 3) {
		data = {
			name: this.value
		};
		$.ajax({
			type: "POST",
			url: "/chek_people",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			success: function(data) { 
				if (data) {
					res_flag.innerHTML = "Такое имя можно внести";
				} else {
					res_flag.innerHTML = "Такое имя уже есть";
				}
			},
		});
	}
});

button_add.addEventListener('click', function(e) {
	var name = this.parentNode.getElementsByTagName('input')[0].value;
	data = {
		name: name
	};
	$.ajax({
		type: "POST",
		url: "/add_people",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: "application/json",
		success: function(data) { 
			if (data) {
				res_flag.innerHTML = "Имя внесено";
			} else {
				res_flag.innerHTML = "Такое имя уже есть";
			}
		},
	});
})
