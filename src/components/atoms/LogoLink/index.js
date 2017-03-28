import React from 'react'
import Request from 'superagent'
import {Link} from 'react-router'
import cheerio from 'cheerio'

const LogoLink = React.createClass({
	getInitialState(){
		//this.svg = ''
		return {
			svg:''
		}
	},

	componentWillReceiveProps(nextProps){
		if(this.props!== nextProps) {
			//console.log('componentWillReceiveProps')
			//this.setState({src:''}) // will reget the svg and render fill
			this.getSvg(nextProps.src)
			.then(svg => {
				this.setState({svg: svg})
				//console.log(svg)
			})
		}
	},

	componentDidMount(){
		this.getSvg(this.props.src)
		.then(svg => {
			this.setState({svg: svg})
			//console.log("test")
		})
	},

	getSvg(src){
		return Request.get(src)
		.then(res => {
			if(!res.text) return
			let fill = this.props.fill
			let {className,id,style} = this.props
			// do svg manipulation
			let $ = cheerio.load(res.text, { xmlMode: true }),
				$svg = $('svg')
			if(!$svg) return
			$svg.addClass(className)
			//console.log(className,fill)
			
			$svg.attr('id', id)
			//$svg.attr('fill', fill)
			if(style && style.width) $svg.attr('width',style.width)
			if(style && style.height) $svg.attr('height',style.height)
			if(fill){
				$svg.find('path').each(function(index,ele){
					$(this).attr('fill',fill)
					//console.log(this)
				})
				$svg.find('use').each(function(index,ele){
					$(this).attr('fill',fill)
					//console.log(this)
				})
			}
			return $svg.toString()
			//console.log('SVG', res.text)
		})
	},

	render() {
		let {style, title, to} = this.props

		return (<Link to={to} title={title} style={{...style}} dangerouslySetInnerHTML={{__html:this.state.svg}}></Link>)
	}
});

LogoLink.contextTypes = {
	setting: React.PropTypes.object
};

export default LogoLink