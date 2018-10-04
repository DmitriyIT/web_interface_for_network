var fs = require('fs');

function get_elems_of_dir(path) {
    var elems_of_dir = [];
    var elems_of_dir_start = fs.readdirSync(path);

    for (var j = 0; j < elems_of_dir_start.length; j++) {
        if (!/^\./.test(elems_of_dir_start[j])) {
            elems_of_dir.push(elems_of_dir_start[j]);
        }
    }
    return elems_of_dir;
}

function get_img(dirname, path_to_people) {
    var count_of_files = 0;
    var array_of_folders = [];
    var path = dirname + '/public/img/' + path_to_people;
    var items = fs.readdirSync(path);

    for (var i = 1; i < items.length; i++) {
        if (!(/\./.test(items[i]))) {
            var path_in = path + '/' + items[i];
            if (fs.statSync(path_in).isDirectory()) {
                var elems_of_dir = get_elems_of_dir(path_in);
                count_of_files += elems_of_dir.length;
                var files = [];

                for (var j = 0; j < elems_of_dir.length; j++) {
                    files.push({
                        name: elems_of_dir[j],
                        path: path_to_people + '/' + items[i] + '/' + elems_of_dir[j]
                    });
                    // files_path.push(path_to_people + '/' + items[i] + '/' + elems_of_dir[j]);
                }

                var obj_push = {
                    folder: items[i],
                    files: files
                }
                array_of_folders.push(obj_push);
            }
        }
    }
    return {
        array_of_folders: array_of_folders,
        count_files: count_of_files
    };
}

module.exports = get_img;