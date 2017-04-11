import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import styled, {css} from 'styled-components'
import {PrimaryButton} from 'components'
const Container = styled.div`
  display:block;
  background-position:center;
  background-size:cover;
  overflow:auto;
`
const Title = styled.h4`
  text-align:center;
  font-size:20px;
  font-weight:bold;
  margin:25px 0 20px 0;
  @media (max-width:480px){
    font-size:18px;
  }
`
const Desc = styled.div`
  text-align:center;
  font-size:16px;
  margin:0 0 20px 0;
  @media (max-width:480px){
    font-size:14px;
  }
`
const Img = styled.div`
  background-position:center;
  width:249px;
  height:223px;
  background-size:cover;
  margin:60px auto 0 auto;
  @media (max-width:480px){
    width:111px;
    height:100px;
  }
`



const EmptyStory = ({style, className, title,description,hideButton}) => {
	return (
  	<Container style={{...style}} className={className}>
      <Img style={{backgroundImage:'url(/pic/pic.png)'}}/>
      <Title>{title}</Title>
      <Desc>{description}</Desc>
      {hideButton||<div className='hidden-mob' style={{width:'152px',margin:'0 auto 0 auto'}}><Link to='/me/stories/new'><PrimaryButton 	label="Write a Story" /></Link></div>}
    </Container>
	)
}

EmptyStory.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  hideButton: PropTypes.bool
}

export default EmptyStory;
