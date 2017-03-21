import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {BGImg} from 'components'
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import moment from 'moment'

const Container = styled.div`
  width:731px;
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
    width:297px;
    padding:10px 0 20px 0;
    margin-left:auto;
    margin-right:auto;
    .mob-hidden{
      display:none;
    }
    .imgWidth{
      float:none;
      width:297px;
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
  width:462px;
  padding-left:15px;
  @media (max-width:480px) {
    width:100%;
    padding-left:0px;
    margin-top:10px;
  } 
`

const DropDown = styled.div`
  float:right;
  &:hover{
    cursor:pointer;
  }
`

const DivDes = styled.div`

`

const ArticleBox = React.createClass({
  getInitialState(){
    return{
      open:false
    }
  },
  
  handleTouchTap(e){
    e.preventDefault();
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    })
  },

  handleRequestClose(){
    this.setState({
      open: false,
    });
  },

  render(){
    let {detail,style} = this.props
    let {title,cover,writer,column,votes,comments,updated,url} = detail

    return (
      <Container style={{...style}}>
        <BGImg url={url} src={cover} className='imgWidth mob-hidden' />
        <BoxText className='sans-font'>
          <DivDes>
            <DropDown  onClick={this.handleTouchTap}><FontIcon className="material-icons" style={{color:'#8f8f8f'}}>keyboard_arrow_down</FontIcon>
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                style={{border:'2px solid #00B2B4'}}
                onRequestClose={this.handleRequestClose}
              >
                <MenuItem style={{color:'#00B2B4',fontSize:'17px'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#00B2B4'}}>share</FontIcon>}>Share</MenuItem>
                <MenuItem style={{color:'#00B2B4',fontSize:'17px'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#00B2B4'}}>link</FontIcon>}>Copy Link</MenuItem>
              </Popover>
            </DropDown>
            <Div>A story of <span style={{textDecoration:'underline'}}><Link to={column.url}>{column.name}</Link></span></Div>
          </DivDes>
          <BGImg url={url} src={cover} className='imgWidth des-hidden'/>
          <NameLink to={url} style={{marginTop:'10px'}}>{title}</NameLink>
          <div className="row" style={{margin:'10px 0 10px 0'}}>
            <Link to={writer.url}><Avatar src={writer.pic.medium}/></Link>
            <div style={{margin:'5px 0 0 8px'}}>
              <NameLink to={writer.url} style={{fontSize:'14px'}}>{writer.display} </NameLink>
              <Div stlye={{fontSize:'12px'}}>{moment(updated).fromNow()} hrs ago</Div>
            </div>
          </div>
          <Div style={{margin:'10px 0 0 0'}}>{votes.total} Votes  <span style={{marginLeft:'15px'}}>{comments.count} Comments</span> <span style={{float:'right'}}>Read 5 min</span></Div>
        </BoxText>
      </Container>
    )
  }
})


    


export default ArticleBox;