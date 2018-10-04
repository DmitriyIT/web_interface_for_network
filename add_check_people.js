var fs = require('fs');

/**
 * Check on find name in list of names
 * @param  str name      
 * @param  obj obj_peoples
 * @return false if this name is busy
 * 		  true if not 
 */
function check_people(name, obj_peoples) {
	for (var x in obj_peoples) {
		if (name == x) {
			return false;
		}
	}
	return true;
}


function add_people(name, file_path) {
	// Write to json file
	var data = fs.readFileSync(file_path, 'utf-8');
	var now_time = Date.now();

	data = JSON.parse(data);
	data[name] = now_time;

	json_out = JSON.stringify(data);
	fs.writeFileSync(file_path, json_out, 'utf-8');

	// Create dir for new people
	var path_dir1 = __dirname + '/public/img/people_for_network/' + now_time;
	var path_dir2 = __dirname + '/public/img/people_und/' + now_time;
	create_dir_for_people(path_dir1);
	create_dir_for_people(path_dir2);
}

function create_dir_for_people(path_to_dir) {
	if (!fs.existsSync(path_to_dir)){
	    fs.mkdirSync(path_to_dir);
	}
}

module.exports.check = check_people;
module.exports.add = add_people;