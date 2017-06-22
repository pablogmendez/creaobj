'use strict';

exports = module.exports = function(app) {
	app.get('/build/:product/:stream', require('./api/build').getPendingBuild);
	app.put('/build/:product/:stream/:jobid', require('./api/build').updateBuild);
};
