import React from 'react'
import Request from 'superagent'
import {Link} from 'react-router'
import cheerio from 'cheerio'
import styled from 'styled-components'

/*const Link2 = styled(Link)`
	svg path{
		fill:${props=>props.fill} !important;
	}
` */

const LogoLink = React.createClass({
	getInitialState(){
		//this.svg = ''
		return {
			svg:''
		}
	},

	componentWillReceiveProps(nextProps){
		if(this.props.src != nextProps.src || this.props.fill != nextProps.fill) {
			//console.log('componentWillReceiveProps')
			//this.props = nextProps
			//console.log('nextProps', nextProps)
			//this.setState({src:''}) // will reget the svg and render fill
			this.getSvg(nextProps.src)
			.then(svg => {
				this.setState({svg: svg})
				//console.log(this.props.fill)
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
			let {className, id, style, fill} = this.props
			// do svg manipulation
			let $ = cheerio.load(res.text, { xmlMode: true }),
				$svg = $('svg')
			if(!$svg) return
			$svg.addClass(className)
			//console.log(className,fill)
			
			if(!id) id = Math.round(Math.random()*10000)
			$svg.attr('id', id)
			//$svg.attr('fill', fill)

			if(style && style.width) $svg.attr('width',style.width)
			if(style && style.height) $svg.attr('height',style.height)

			if(fill){
				$svg.find('path').each(function(index,ele){
					$(this).attr('fill', fill)
					$(this).attr('id', id+$(this).attr('id'))
					//console.log(this)
				})
				$svg.find('use').each(function(index,ele){
					$(this).attr('fill', fill)
					$(this).attr('xlink:href', '#'+id+$(this).attr('xlink:href').replace('#', ''))
					//console.log(this)
				})
			}else{
				$svg.find('path').each(function(index,ele){
					//$(this).attr('fill', fill)
					$(this).attr('id', id+$(this).attr('id'))
					//console.log(this)
				})
				$svg.find('use').each(function(index,ele){
					//$(this).attr('fill', fill)
					$(this).attr('xlink:href', '#'+id+$(this).attr('xlink:href').replace('#', ''))
					//console.log(this)
				})
			}

			return $svg.toString()
			//console.log('SVG', res.text)
		})
	},

	render() {
		let {style, title, to, fill} = this.props

		return (<Link to={to} title={title} style={{...style}} dangerouslySetInnerHTML={{__html:this.state.svg}}></Link>)

		/*return (<Link2 to={to} title={title} fill={fill} style={{...style}} dangerouslySetInnerHTML={{__html:this.state.svg}}>

		</Link2>)*/
	}
});

LogoLink.contextTypes = {
	setting: React.PropTypes.object
};

export default LogoLink