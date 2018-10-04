var dr_wrap, dr_input, dr_wrap_items, dr_items;

dr_wrap = document.getElementsByClassName('myDropdownMenu')[0];
dr_wrap_items = dr_wrap.getElementsByClassName('dropDownContent')[0];
dr_input = dr_wrap.querySelector('input');
dr_items = dr_wrap.querySelectorAll('a');

for (var i = 0; i < dr_items.length; i++) {
    dr_items[i].preventDefault;
}

function makeChoose(e) {
    dr_input.value = e.target.innerHTML;
    clickDropDown();
}
dr_wrap_items.addEventListener('click', makeChoose);

function clickDropDown() {
    if (dr_wrap_items.style.display == 'none' || dr_wrap_items.style.display == "") {
        dr_wrap_items.style.display = 'block' ;
    } else {
        dr_wrap_items.style.display = 'none' ;
    }
}
dr_input.addEventListener('click', clickDropDown);

function hide_menu() {
    dr_wrap_items.style.display = 'none';
}

function updateInputFind() {
    var text_in = dr_input.value.toUpperCase();
    for (var i = 0; i < dr_items.length; i++) {
        if (dr_items[i].innerHTML.toUpperCase().indexOf(text_in) > -1) {
            dr_items[i].style.display = 'block';
        } else {
            dr_items[i].style.display = 'none';
        }
    }
}
dr_input.addEventListener('keyup', updateInputFind);

