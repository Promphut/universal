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
const Name = styled.div`
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
  
  handleTouchTap(event){
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  },

  handleRequestClose(){
    this.setState({
      open: false,
    });
  },

  render(){
    var {detail,style} = this.props
    var {title,cover,writer,column,votes,comments,updated} = detail
    return(
      <Container style={{...style}}>
        <BGImg src={cover} className='imgWidth mob-hidden' />
        <BoxText className='sans-font'>
          <DivDes>
            <DropDown  onClick={this.handleTouchTap}><FontIcon className="material-icons" style={{color:'#8f8f8f'}}>keyboard_arrow_down</FontIcon>
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose}
              >
                <MenuItem style={{border:'2px solid #00B2B4',color:'#00B2B4',fontSize:'17px'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#00B2B4'}}>share</FontIcon>}>Share</MenuItem>
                <MenuItem style={{border:'2px solid #00B2B4',color:'#fff',fontSize:'17px',backgroundColor:'#00B2B4'}} className='nunito-font' leftIcon={<FontIcon className="material-icons" style={{color:'#fff'}}>link</FontIcon>}>Copy Link</MenuItem>
              </Popover>
            </DropDown>
            <Div>A story of <span style={{textDecoration:'underline'}}>{column.name}</span></Div>
          </DivDes>
          <BGImg src={cover} className='imgWidth des-hidden'/>
          <Name style={{marginTop:'10px'}}>{title}</Name>
          <div className="row" style={{margin:'10px 0 10px 0'}}>
            <Avatar src={writer.pic.medium}/>
            <div style={{margin:'5px 0 0 8px'}}>
              <Name style={{fontSize:'14px'}}>{writer.display} </Name>
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