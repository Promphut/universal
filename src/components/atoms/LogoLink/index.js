import React from 'react'
import Request from 'superagent'
import {Link} from 'react-router'
import cheerio from 'cheerio'

const LogoLink = React.createClass({
	getInitialState(){
		this.svg = ''

		return {
			src: ''
		}
	},

	componentWillReceiveProps(nextProps){
		if(this.props.fill !== nextProps.fill) {
			//console.log('componentWillReceiveProps')
			this.setState({src:''}) // will reget the svg and render fill
		}
	},

	//componentWillMount(){
		//let src 
		// if(isMobile()) src = this.props.src.mobile
		// else src = this.props.src.desktop
	//},

	getSvg(src){
		return Request.get(src)
		.then(res => {
			this.svg = res.text
			if(!this.svg) return

			let fill = this.props.fill
			let {className,id} = this.props

			// do svg manipulation
			let $ = cheerio.load(this.svg, { xmlMode: true }),
				$svg = $('svg')
			if(!$svg) return
			$svg.addClass(className)
			$svg.attr('id', id)
			//$svg.attr('fill', '#ff0000')
			if(fill) $svg.find('path').attr('fill', fill)

			this.svg = $svg.toString()
			return src
			//console.log('SVG', res.text)
		})
	},

	render() {
		let {style, title, to} = this.props

		let pub = this.context.setting ? this.context.setting.publisher : {}
		let pubLogo = pub.theme ? pub.theme.logo : '' 

		if(!this.state.src && pubLogo) {
			this.getSvg(pubLogo)
			.then(src => {
				this.setState({src: src})
			})
		}

		return (<Link to={to} title={title} style={{...style}} dangerouslySetInnerHTML={{__html:this.svg}}></Link>)
	}
});

LogoLink.contextTypes = {
	setting: React.PropTypes.object
};

export default LogoLink