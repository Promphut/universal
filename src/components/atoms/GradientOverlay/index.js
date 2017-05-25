import React from 'react'
import styled from 'styled-components'

/* Props:
	opacity e.g. 0.3
*/
const GradientOverlay = styled.div`
	background: -moz-linear-gradient(-45deg,  rgba(202,130,172,${props => props.opacity || 0.15}) 0%, rgba(49,77,170,${props => props.opacity || 0.15}) 100%);
	background: -webkit-linear-gradient(-45deg,  rgba(202,130,172,${props => props.opacity || 0.15}) 0%,rgba(49,77,170,${props => props.opacity || 0.15}) 100%);
	background: linear-gradient(135deg,  rgba(202,130,172,${props => props.opacity || 0.15}) 0%,rgba(49,77,170,${props => props.opacity || 0.15}) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4dca82ac', endColorstr='#4d314daa',GradientType=1 );

	bottom:0;
	top:0;
	left:0;
	right:0;
	position:absolute;
	z-index:0;
`

const GradientBlack = styled.div`
	background: rgba(0,0,0,${props => props.opacity || 0.15}) 0%;

	bottom:0;
	top:0;
	left:0;
	right:0;
	position:absolute;
	z-index:0;
`

const Gradient = ({ children, opacity, gradient }) => {
	console.log('aaaa', gradient)
	if (gradient == 'black') {
		return (
			<GradientBlack>
				{children}
			</GradientBlack>
		)
	} else {
		return (
			<GradientOverlay>
				{children}
			</GradientOverlay>
		)
	}
}

export default GradientOverlay
