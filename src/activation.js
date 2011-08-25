
/**
 * Module dependencies.
 */

var config = require('./config.js'),
    _rand = require('./rand.js'),
    _db = require('./couchdb.js').activations,
    _lib = module.exports = {};

/* Test activation key */
_lib.test = (function(key, callback) {
	_db.get(key, function (err, doc) {
		var undefined;
		if(err) callback(err);
		else callback(undefined, doc);
	});
});

/* Remove activation key */
_lib.remove = (function(key, callback) {
	_lib.test(key, function(err, data) {
		if(err) return callback(err, data);
		else _db.remove(key, data._rev, function (err, res) {
			callback(err, res);
		});
	});
});

/* Create new activation keyword */
_lib.create_key = (function() {
	return _rand.string(32);
});

/* Create new activation request for data */
_lib.create = (function(data, callback) {
	var undefined, key = _lib.create_key();
	data.creation = new Date();
	_db.save(key, data, function (err, res) {
		if (err) return callback(err);
		callback(undefined, key);
	});
});

/* EOF */