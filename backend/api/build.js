"use strict";

var exec = require('child_process').exec;
var cmd = '/home/pablo/Escritorio/test1.sh';

exports.getPendingBuild = function(req, res, next) {
	exec(cmd, function(error, stdout, stderr) {
		if(error) {
			console.log(error);
			console.log(stdout);
			return res.send({});
		}
		var arr = stdout.trim().split("|");
		console.log(arr);
		res.json({ m1: arr[0], m2: arr[1], m3: arr[2], m4: arr[3] });   
	});
};

exports.updateBuild = function(req, res, next) {
	console.log(req.params.product);
	console.log(req.params.stream);
	console.log(req.params.jobid);
	res.send("OK");
};
