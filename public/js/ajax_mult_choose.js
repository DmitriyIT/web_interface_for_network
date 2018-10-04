var wrap_div_fchoose = document.getElementsByClassName('fast_choose_block')[0];

var input = wrap_div_fchoose.getElementsByTagName('input')[0];
input.addEventListener('keyup', function(e) {
	if (this.value.length === 2) {
		var datalist = this.parentNode.getElementsByTagName('datalist')[0];
		$.ajax({
			type: "POST",
			url: "/upd_drd",
			data: JSON.stringify({userName: this.value}),
			dataType: "json",
			contentType: "application/json",
			success: function(data) { 
				push_to_drd(data, datalist);
			},
		});
	}
})

var button = wrap_div_fchoose.getElementsByTagName('button')[0];
button.addEventListener('click', function(e) {
	change_text(this);
	hide_show();

});

function change_text(button) {
	var first_st = 'Начать выбирать';
	var second_st = 'Отменить выбор';
	if (button.innerHTML == first_st) {
		button.innerHTML = second_st;
	} else {
		button.innerHTML = first_st;
	}
}

function hide_show() {
	var div_panel = document.getElementsByClassName('panel_for_choose');
	var buttons_del = document.getElementsByClassName('get_out_button');
	var check_boxes_conyainers = document.getElementsByClassName('for_fast_choose');
	for (var i = 0; i < div_panel.length; i++) {
		var form = div_panel[i].getElementsByTagName('form')[0];
		var button = buttons_del[i];
		var cb_cont = check_boxes_conyainers[i];
		if (form.style.display != 'none') {
			$(form).fadeOut(400, 'swing', function(){});
			$(button).fadeOut(400, 'swing', function(){});	
			$(cb_cont).fadeIn(400, 'swing', function(){});	
		} else {
			$(form).fadeIn(400, 'swing', function(){});
			$(button).fadeIn(400, 'swing', function(){});	
			$(cb_cont).fadeOut(400, 'swing', function(){});	
		}
		
	}
}


function send_res() {
	var input_name = document.getElementById('input_name_f_choose');
	var namePeople = input_name.value;

	var forms_id = get_forms_id();
	console.log(forms_id);

	for (var i = 0; i < forms_id.length; i++) {
		var form_id = forms_id[i];
		var files = takePhoto(form_id);
		data = {
			name: namePeople,
			folder: form_id,
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
	}
	var span_count_choose = document.getElementsByClassName('is_wrighten')[0].getElementsByTagName('span')[0];
	span_count_choose.innerHTML = +0;

	hide_show();
	var wrap_div_fchoose = document.getElementsByClassName('fast_choose_block')[0];
	var button = wrap_div_fchoose.getElementsByTagName('button')[0];
	change_text(button);
	input_name.value = '';
}

function get_forms_id() {
	var elems = fast_choose_form.elements;
	var forms = [];
	for (var i = 0; i < elems.length; i++) {
		if (elems[i].checked) {
			forms.push(elems[i].name);
		}
	}
	return forms;
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


var button_save = document.getElementsByClassName('save_changes')[0];
button_save.addEventListener('click', send_res);


var check_boxs = document.getElementsByClassName('for_fast_choose');
for (var i = 0; i < check_boxs.length; i++) {
	var checkbox = check_boxs[i];
	checkbox.addEventListener('click', function(e) {
		if (e.target.tagName == "LABEL") {
			make_calc(this);
		}
	});
}

function make_calc(chekbox_wrap) {
	var input = chekbox_wrap.getElementsByTagName('input')[0]
	var folder = input.getAttribute('name');
	var span_count = document.getElementsByClassName('is_wrighten')[0].getElementsByTagName('span')[0];
	var count = span_count.innerHTML;
	var count_of_line = document.getElementById('wrap_line' + folder).getElementsByClassName('elem_wrap_div').length;
	if (input.checked) {
		span_count.innerHTML = +count - count_of_line;
	} else {
		span_count.innerHTML = +count + count_of_line;
	}
}
