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
  overflow: ${props => props.hidden ? 'hidden' : 'auto'};
  top:0;
  left:0;
  width:100%;
  height:100%;
`

const BGImg = ({style, className, src, url, alt, opacity, hidden, child, children}) => {
	return (
  	<ImgLink to={url} style={{...style, backgroundImage:'url('+src+')'}}
      className={className} title={alt}>
      {opacity === -1 ? (<div>
        {child?child:''}
        {children}
      </div>) : (<Filter opacity={opacity} hidden={hidden}>
        {child?child:''}
        {children}
      </Filter>)
      }
    </ImgLink>
	)
}

export default BGImg;
