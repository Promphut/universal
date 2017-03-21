import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import styled, {css} from 'styled-components'
import {GradientOverlay} from 'components'

const ImgLink = styled(Link)`
  display:block;
  background-position:center;
  background-size:cover;
  overflow:auto;
`

const Filter = styled(GradientOverlay)`
  position:relative;
  display:block;
  overflow:auto;
  top:0;
  left:0;
  width:100%;
  height:100%;
`

const BGImg = ({style, className, src, url, opacity, child, children}) => {
	return (
  	<ImgLink to={url} style={{...style, backgroundImage:'url('+src+')'}} className={className}>
      <Filter opacity={opacity} >
        {child?child:''}
        {children}
      </Filter>
    </ImgLink>
	)
}

export default BGImg;