module.exports = {
	set: function(obj, str, val) {
	    str = str.split(".");
	    while (str.length > 1)
	        obj = obj[str.shift()];
	    return obj[str.shift()] = val;
	}
}