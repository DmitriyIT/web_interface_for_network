var fs = require('fs');

/**
 * Send files to goto_folder
 * @param  array files (names)
 * @param  str   folder (full path, without '/' on the end)
 * @param  str   goto_folder (full path, without '/' on the end)
 */
function ch_folder_files(folder, files, goto_folder) {
	for (var i = 0; i < files.length; i++) {
		var file = files[i];

		var from = folder + '/' + file;
		var to = goto_folder + '/' + file;

		fs.renameSync(from, to);
	}
}

/**
 * Del folder -R 
 * @param  str path (full path, without '/' on the end)
 */
function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

module.exports.ch_folder = ch_folder_files;
module.exports.del_dir_R = deleteFolderRecursive;


// log .... new js module

// 3folders:
// - p_know: for choose by network
// - people: for learn network
// - innoun: for website