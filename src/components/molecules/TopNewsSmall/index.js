import React, {Component} from 'react';
import {Link} from 'react-router';
import styled,{keyframes} from 'styled-components'
import {BGImg, ShareDropdown} from 'components'
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import moment from 'moment'

const Container = styled.div`
  width:100%;
  z-index:100;
  overflow:hidden;
  border-top:1px solid #000;
  border-right:1px solid #000;
  border-left:1px solid #000;
  display:flex;
  .imgWidth{
    width:40px;
    height:141px;
  }
  .des-hidden{
    display:block;
  }
  @media (min-width:481px) {
    .des-hidden{
      display:none;
    }
  }
  @media (max-width:480px) {
    width:100%;
    padding:10px 0 20px 0;
    margin-left:auto;
    margin-right:auto;
    .mob-hidden{
      display:none;
    }
    .imgWidth{
      float:none;
      width:100%;
      height:175px;
    }
  }
`
const BG = styled(BGImg)`
  &:hover{

  }
`
const NameLink = styled(Link)`
  display: block;
  color:white;
  font-weight:bold;
  font-size:20px;
  height:50px;
  text-overflow: ellipsis;
  white-space: wrap;
  overflow: hidden;
  @media (max-width:480px) {
    font-size:15px;
  }
  &:hover{
    color:${props=>props.theme.accentColor}
    cursor:pointer;
  }
`

const BoxText = styled.div`
  width:100%;
  color:#222;
  font-size:12px;
  height:141px;
  padding:12px;
  display:flex;
  text-align:center;
	vertical-align: middle;
  align-items: center;
`




const TopNewsSmall = React.createClass({
  render(){
    let {detail,style} = this.props
    //let {ptitle,cover,writer,column,votes,comments,updated,url,readTime} = detail

    return (
      <Container style={{...style}}>
        <BG src='/tmp/story-list/1486747497349-robertjinx.jpeg' className='imgWidth mob-hidden' /> 
        <BoxText className='nunito-font'>
          <span>
                        เปิดบ้าน VR Sphere ท่องโลกเสมือนจริง ด้วยพาหนะแห่งจินตนาการของคนไทยคนไทยคนไทยคนไทยค
            นไทยคนไทยคนไทยคนไทยคนไทย จินตนาการของคนไทย
          </span>       
        </BoxText>
      </Container>
    )
  }
})



export default TopNewsSmall;
