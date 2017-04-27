import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {BGImg, ShareDropdown} from 'components'
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import moment from 'moment'

const Container = styled.div`
  width:100%;
  padding:30px 0 30px 0;
  border-bottom:1px solid #e2e2e2;
  overflow:hidden;
  .imgWidth{
    width:254px;
    height:149px;
    float:left;
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

const Div = styled.div`
  color:#8F8F8F;
  font-size:13px;
  @media (max-width:480px) {
    font-size:12px;
  }
`

const NameLink = styled(Link)`
  display: block;
  color:#222;
  font-weight:bold;
  font-size:18px;
  @media (max-width:480px) {
    font-size:15px;
  }
`

const BoxText = styled.div`
  float:left;
  width:850px;
  padding-left:38px;
  @media (max-width:480px) {
    width:100%;
    padding-left:0px;
    margin-top:10px;
  }
`

const DivDes = styled.div`
`

const NewsBox = React.createClass({
  render(){
    let {detail,style} = this.props
    let {ptitle,cover,writer,column,votes,comments,updated,url,readTime} = detail
    //console.log('URL', url)
    return (
      <Container style={{...style}}>
        <BGImg url={url} src={cover.small || cover.medium} alt={ptitle || ''} className='imgWidth mob-hidden' />
        <BoxText className='sans-font'>
          <DivDes>
            <ShareDropdown url={url} />
          </DivDes>
          <BGImg url={url} src={cover.medium || cover.small} className='imgWidth des-hidden'/>
          <NameLink to={url} className='serif-font' >{ptitle}</NameLink>
        </BoxText>
      </Container>
    )
  }
})





export default NewsBox;
