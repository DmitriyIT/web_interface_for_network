/**
 * Return arr of people which name have str pattern
 *
 * @param  string   str     
 * @param  obj      peoples = {
 * 	"name": hash(12342...),
 * 	...
 * }
 * @return array[str]
 */
function get_People_by_str(str, peoples) {
	var arr_res = [];
	var regexp = new RegExp(str, 'i');
	for (var x in peoples) {
		if (regexp.test(x)) {
			arr_res.push(x);
		}
	}

	return arr_res;
}
module.exports = get_People_by_str;