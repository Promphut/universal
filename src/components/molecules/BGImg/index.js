import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { GradientOverlay } from 'components'

// const ImgLink = styled(Link)`
//   display:block;
//   background-position:center;
//   background-size:cover;
//   overflow:auto;
// `

const Filter = styled(GradientOverlay)`
  position:relative;
  display:block;
  overflow: ${props => (props.hidden ? 'hidden' : 'auto')};
  top:0;
  left:0;
  width:100%;
  height:100%;
`

const BGImg = ({
	style,
	className,
	src,
	url,
	alt,
	opacity,
	child,
	children,
	gradient
}) => {
	//console.log('URL', url, match)
	//if(!src) console.log('SRC', src)
	style = {
		display: 'block',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		overflow: 'auto',
		...style
	}
	if (src) style.backgroundImage = 'url(' + src + ')'

	if (url)
		return (
			<Link to={url || '#'} style={style} className={className} title={alt}>
				{opacity === -1
					? <div>
							{child ? child : ''}
							{children}
						</div>
					: <Filter opacity={opacity} gradient={gradient}>
							{child ? child : ''}
							{children}
						</Filter>}
			</Link>
		)
	else
		return (
			<div style={style} className={className} title={alt}>
				{opacity === -1
					? <div>
							{child ? child : ''}
							{children}
						</div>
					: <Filter opacity={opacity} gradient={gradient}>
							{child ? child : ''}
							{children}
						</Filter>}
			</div>
		)
}

export default BGImg
