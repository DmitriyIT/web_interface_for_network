var wrap_data_inputs = document.getElementsByClassName('div_wrap_input');


for (var i = 0; i < wrap_data_inputs.length; i++) {
	var input = wrap_data_inputs[i].getElementsByTagName('input')[0];

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
}

function push_to_drd(arr, datalist) {
	var list = document.createElement('datalist');
	arr.forEach(item => {
		let option = document.createElement('option');
		option.value = item;
		list.appendChild(option);
	})
	datalist.innerHTML = list.innerHTML;
}