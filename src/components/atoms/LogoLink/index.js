import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import styled from 'styled-components'

const LogoLink = React.createClass({
	getInitialState(){
		return {
			//src: '',
			fill: ''
		}
	},

	componentWillReceiveProps(nextProps){
		if(this.props.fill != nextProps.fill){
			this.setState({fill: nextProps.fill})
		}
	},

	fillSvgDocument(fill){
		//console.log('FILL', fill)
		let {className} = this.props

		try {
			let svg = this.svgObject.contentDocument
			if(className) svg.class += ' ' + className

			svg.querySelectorAll('path')
			.forEach(ele => ele.setAttribute('fill', fill))

			svg.querySelectorAll('use')
			.forEach(ele => ele.setAttribute('fill', fill))
		}
		catch(e){}
	},

	componentDidMount(){
		this.svgObject.addEventListener("load", () => {
			//console.log('SVG LOADED', this.props.fill)
			let fill = this.props.fill
			if(fill) this.fillSvgDocument(fill)
		})
	},
	componentDidUpdate(prevProps, prevState){
		if (prevProps.fill !== this.props.fill) {
			let {fill} = this.state
			//console.log('FILL CHANGED')

			if(fill){
				this.fillSvgDocument(fill)
			} else {
				// force inside content to reload
				try {
					this.svgObject.contentDocument.location.reload()
				}
				catch(e){}
			}
		}
	},

	render() {
		let {style, title, to} = this.props
		let id = 'svg_'+Math.round(Math.random()*10000)

		return (<Link to={to} title={title} style={{...style}}>
			<object id={id} data={this.props.src} type="image/svg+xml" ref={(input) => {this.svgObject = input}} style={{pointerEvents:'none'}}></object>
		</Link>)
	}
});

LogoLink.contextTypes = {
	setting: React.PropTypes.object
};

export default LogoLink
