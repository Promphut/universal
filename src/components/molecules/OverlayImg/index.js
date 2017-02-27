import React, {PropTypes} from 'react'
import styled, {css} from 'styled-components'
import {GradientOverlay} from 'components'

const Container = styled.div`
	position:relative;
	overflow:hidden;
`
const styles={
	img:{
		backgroundSize:'cover',
		backgroundPosition:'center'
	}
}

const OverlayImg = (props) => {
	return (
		<Container style={{...props.style}} className={props.className}>
			<img src={props.src} style={ {...(props.orientedBy==='height' ? {height: '100%'} : {width: '100%'}), ...props.imgStyle,...styles.img} }/>
			<GradientOverlay opacity={props.opacity} />
		</Container>
	)
}

OverlayImg.propTypes = {
	// Mandatory
	src: PropTypes.string.isRequired,

	// Non mandatory
	style: PropTypes.object,
	orientedBy: PropTypes.string,
	imgStyle: PropTypes.object,
	opacity: PropTypes.number
}

export default OverlayImg;