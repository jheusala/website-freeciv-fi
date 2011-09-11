/* Hash Functions */

var crypto = require('crypto'),
    hash = module.exports = {};

/* Create random hexadecimal token */
hash.createToken = function(chars) {
	return md5(''+Math.random(0, 0x7fffffff)).substr(0, chars || 32);
};

/* Create hash */
hash.create = function createHash(str, algorithm, encoding) {
	var shasum = crypto.createHash(algorithm || 'sha1');
	shasum.update(str);
	return shasum.digest(encoding || 'hex');
};

/* Create sha1 hash */
hash.sha1 = function(str, encoding) {
	return hash.create(str, 'sha1', encoding || 'hex');
};

/* Create md5 hash */
hash.md5 = function(str, encoding) {
	return hash.create(str, 'md5', encoding || 'hex');
}

/* EOF */
