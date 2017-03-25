module.exports = {
	set: function(obj, str, val) {
	    str = str.split(".");
	    while (str.length > 1){
	    	let key = str.shift()
	    	if(!obj[key]) obj[key] = {}
	        obj = obj[key];
	    }
	    return obj[str.shift()] = val;
	},

	getTotalPages: function(itemsLimit, itemsCount){
		let count = Math.ceil(itemsCount / itemsLimit)
		return isNaN(count) ? 0 : count
	},

	// pub = publisher object
	// getThemeLogo: function(theme){
	// 	return theme && theme.logo ? 
	// 		{
	// 			desktop:theme.logo, 
	// 			mobile:theme.slogo || theme.logo
	// 		} : null
	// }
}