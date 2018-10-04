
var hbs          = require('hbs');
var bodyParser   = require('body-parser');
var express      = require('express');

var config       = require('./config.json');
var people_json  = require('./people_json.json');
var give_img     = require('./take_img_folders.js');
var get_people   = require('./ajax_upd_menu_serv.js');
var move_files   = require('./folder_change_vs_files.js');
var add_check_p  = require('./add_check_people.js');


var path = require('path');

var _invalidateRequireCacheForFile = function(filePath){
    delete require.cache[path.resolve(filePath)];
};
var requireNoCache =  function(filePath){
    _invalidateRequireCacheForFile(filePath);
    return require(filePath);
};


var app               = express();
var jsonParser        = bodyParser.json();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	res.send("smth theare ;)");
});


app.post('/chek_people', jsonParser, function(request, response) {
    if (!request.body) return response.sendStatus(400);
    var flag = add_check_p.check(request.body.name, people_json);
    response.json(flag);
});
app.post('/add_people', jsonParser, function(request, response) {
    if (!request.body) return response.sendStatus(400);
    var flag = add_check_p.check(request.body.name, people_json);
    if (flag) {
        add_check_p.add(request.body.name, 'people_json.json');
        people_json = requireNoCache('./people_json.json');
    }
    response.json(flag);
});

app.post('/upd_drd', jsonParser, function(request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    var arr_res = get_people(request.body.userName, people_json);
    response.json(arr_res);
});

app.post('/del_line', jsonParser, function(request, response) {
    if (!request.body) return response.sendStatus(400);
    var folder = request.body.folder;
    var path_delete = __dirname + '/public/img/' + config.path_to_people + '/' + folder;
    move_files.del_dir_R(path_delete);

    response.json(folder);
});

app.post('/ajaxPost', jsonParser, function(request, response) {
    if (!request.body) return response.sendStatus(400);
    // console.log(request.body);
    response.json(`${request.body.userName} - ${request.body.userAge}`);
});

app.post('/single_choose', jsonParser, function(request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    path_folder_from = __dirname + '/public/img/people_dont_und/' + request.body.folder;
    files = request.body.files;
    path_folder_to = __dirname + '/public/img/people_for_network/' + people_json[request.body.name];

    move_files.ch_folder(path_folder_from, files, path_folder_to);
    move_files.del_dir_R(path_folder_from);

    response.json(request.body.folder);
});

app.post('/multiple_choose', jsonParser, function(request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.json(`${request.body.userName} - ${request.body.userAge}`);
});

app.get('/web', function(req, res) {
    var elems_of_folder  = give_img(__dirname, config.path_to_people);

    var context = {
        path_mb: 'img/people/awd.png',
        obj: elems_of_folder.array_of_folders,
        count_files: elems_of_folder.count_files
    };
	res.render("web_page.hbs", context);
});

app.listen(config.port_listen, config.ip_listen);
