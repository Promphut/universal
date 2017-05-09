import Cookies from 'react-cookie'
import config from '../config'

const domain = {domain:config.DOMAIN, path:'/'}

var cookies = {}
cookies = {
	// Set cookie string by name
	set(cookieName, str){ 
		Cookies.save(cookieName, str, domain)
	},

	// Set cookie json by name
	setJSON(cookieName, json){
		Cookies.save(cookieName, JSON.stringify(json), domain)
	},

	// Get cookie string by name
	get(cookieName){
		//return Cookies.get(cookieName, domain)
		return Cookies.load(cookieName, domain) || null
		//return Cookies.load(cookieName)
	},

	// Get cookie json by name
	getJSON(cookieName){
		let json 

		try{
		  json = JSON.parse(cookies.get(cookieName))
		} 
		catch(err) {json = null}

		return json
	},

	// Remove cookie by name
	remove(cookieName){
		Cookies.remove(cookieName, domain)
	},
	
	// // Set article viewed flag in cookie
	// viewArticle(aid){
	// 	let viewed = cookies.getJSON('viewed') || []
	// 	if(viewed && aid!=null){
	// 		viewed.push(aid)
	// 		viewed = _.uniq(viewed)
	// 		//console.log('viewed', viewed)
	// 		cookies.setJSON('viewed', viewed)
	// 	}
	// },

	// getArticlesViewed(articles){
	// 	let viewed = cookies.getJSON('viewed') || []

	// 	if(viewed && articles && articles.length>0) { 
	// 		articles.forEach(a => {
	// 			a.viewed = viewed.indexOf(a._id)!==-1
	// 		})

	// 		//console.log('articles', articles)
	// 	}
	// }
}

module.exports = cookies