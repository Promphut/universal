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
import _ from 'lodash'
const Container = styled.div`
  width:100%;
  z-index:100;
  overflow:hidden;
  height:141px;
  border-top:1px solid #000;
  border-right:1px solid #000;
  border-left:1px solid #000;
  .showText{
    padding:45px 40px;
  }
  .imgWidth{
    width:100%;
    height:141px;
  }
  .hideText{
    position:relative;
    top:-141px;
    width:87%;
    margin:0 0 0 13%;
  }
  &:hover{
    .hideText{
      z-index:-10;
    }
  }
`
const BG = styled(BGImg)`
  width:100%;
  animation: ${props=> props.hover?slideOut:slideIn} ${props=> props.hover?0.4:0.2}s forwards;
  &:hover{
    cursor:pointer;
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
  color:${props=> props.hover?props.theme.accentColor:'#222'};
  font-size:16px;
  height:141px;
  padding:45px 12px;
  text-align:center;
`
const Cover = styled.div`
  background:rgba(0,0,0,0.6);
`

const slideOut = keyframes`
	from {
    transform: translateX(-87%);
  }
  to {
    transform: translateX(0%);
  }
`
const slideIn = keyframes`
	from {
    transform: translateX(0%);;
  }
  to {
    transform: translateX(-87%);
  }
`

const TopNewsSmall = React.createClass({
  getInitialState(){
    return{
      hover:false
    }
  },
  hoverOff(){
    this.setState({
      hover:false
    })
  },
  hoverOn(){
    this.setState({
      hover:true
    })
  },
  render(){
    let {detail,style} = this.props
    return (
      <Container className="row" style={{...style}} onMouseOver={this.hoverOn} onMouseLeave={this.hoverOff} >
        <BG hover={this.state.hover} url={detail&&detail.url} src={detail&&detail.cover.medium} className='imgWidth mob-hidden' style={{backgroundPosition:'right'}}>
          <Cover>
            <BoxText className='nunito-font showText' hover={this.state.hover}>
              <span>
                {_.truncate(detail&&detail.ptitle, {
                  'length': 70,
                  'separator': ''
                })}
              </span>       
            </BoxText> 
          </Cover>
        </BG>
        <BoxText className='nunito-font hideText'>
          <span>
            {_.truncate(detail&&detail.ptitle, {
              'length': 70,
              'separator': ''
            })}
          </span>       
        </BoxText> 
      </Container>
    )
  }
})



export default TopNewsSmall;
