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
  display:flex;
  .imgWidth{
    width:100%;
    height:222px;
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
  color:#8E8E8E;
  font-size:14px;
  @media (max-width:480px) {
    font-size:12px;
  }
`

const NameLink = styled(Link)`
  display: block;
  color:#222;
  font-weight:bold;
  font-size:18px;
  &:hover{
    color:${props=>props.theme.accentColor};
  }
  @media (max-width:480px) {
    font-size:15px;
  }
`

const BoxText = styled.div`
  float:left;
  width:477px;
  padding-left:38px;
  @media (max-width:480px) {
    width:100%;
    padding-left:0px;
    margin-top:10px;
  }
`

const Box = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
  padding:25px 0 0 20px;
`

const ArticleBox = React.createClass({
  render(){
    let {detail,style} = this.props
    let {ptitle,cover,writer,column,votes,comments,updated,url,readTime,contentShort} = detail
    var {theme} = this.context.setting.publisher
    //console.log('URL', url)

    let writherDisplay = ''
    if (writer && writer.display) {
      writherDisplay = writer.display ? writer.display : ''
    }
    return (
      <Container style={{...style}}>
        <div style={{flex:'1'}}>
          <Div className='sans-font' style={{margin:'0 0 8px 0'}}>{moment(updated).fromNow()}</Div>
          <BGImg url={url} src={cover.medium || cover.small} className='imgWidth'/>
        </div>
        <Box>
          <div className='row'>
            <div style={{width:'16px',height:'1px',background:'#8E8E8E',flex:1,margin:'10px 10px 0 0'}}></div>
            <Div className='sans-font' style={{margin:'0 0 7px 0',flex:20}}>{readTime + ' min read'}</Div>
          </div>
          <NameLink to={url} className='nunito-font' style={{marginTop:'5px'}}>{ptitle}</NameLink>

          <Div className='nunito-font' style={{marginTop:'10px'}}>{_.truncate(contentShort, {
                'length': 200,
                'separator': ''
              })}</Div>
          <Div className='nunito-font' style={{ marginTop: "auto"}}>by <strong><Link to={writer&&writer.url}> {writer.display} </Link></strong> in <Link to={column&&column.url} style={{color:theme.accentColor,fontWeight:'bold'}}>{column.name}</Link></Div>
        </Box>
      </Container>
    )
  }
})

ArticleBox.contextTypes = {
	setting: React.PropTypes.object
};


export default ArticleBox;
