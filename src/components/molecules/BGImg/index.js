import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
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

const BGImg = ({style, className, src, url, alt, opacity, child, children, match}) => {
  //console.log('URL', url, match)
	return (
  	<ImgLink to={url || '#'} style={{...style, backgroundImage:'url('+src+')'}}
      className={className} title={alt}>
      {opacity === -1 ? (<div>
        {child?child:''}
        {children}
      </div>) : (<Filter opacity={opacity}>
        {child?child:''}
        {children}
      </Filter>)
      }
    </ImgLink>
	)
}

export default BGImg;
