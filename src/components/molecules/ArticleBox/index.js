import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {OverlayImg} from 'components'
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

const Container = styled.div`
  width:731px;
  padding:20px 0 20px 0;
  border-bottom:1px solid #e2e2e2;
  overflow:hidden;
  .imgWidth{
    width:254px;
    height:149px;
    float:left;
  }
  @media (max-width:480px) {
    width:297px;
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
const DivMob = styled.div`
  @media (min-width:481px) {
    display:none;
  } 
`
const DivDes = styled.div`
  @media (max-width:480px) {
    display:none;
  } 
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
    var {name,photo,writer,column,vote,comment,date} = detail
    return(
      <Container style={{...style}}>
        <DivMob>
          <DropDown  onClick={this.handleTouchTap}><FontIcon className="material-icons" style={{color:'#8f8f8f'}}>keyboard_arrow_down</FontIcon>
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
            >
              <Menu>
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help &amp; feedback" />
                <MenuItem primaryText="Settings" />
                <MenuItem primaryText="Sign out" />
              </Menu>
            </Popover>
          </DropDown>
          <Div>A story of <span style={{textDecoration:'underline'}}>{column}</span></Div>
        </DivMob>
        <OverlayImg src={photo} className='imgWidth'/>
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
                <Menu>
                  <MenuItem primaryText="Refresh" />
                  <MenuItem primaryText="Help &amp; feedback" />
                  <MenuItem primaryText="Settings" />
                  <MenuItem primaryText="Sign out" />
                </Menu>
              </Popover>
            </DropDown>
            <Div>A story of <span style={{textDecoration:'underline'}}>{column}</span></Div>
          </DivDes>
          <Name >{name}</Name>
          <div className="row" style={{margin:'10px 0 10px 0'}}>
            <Avatar src={writer.photo}/>
            <div style={{margin:'5px 0 0 8px'}}>
              <Name style={{fontSize:'14px'}}>{writer.name} </Name>
              <Div stlye={{fontSize:'12px'}}>{writer.date} hrs ago</Div>
            </div>
          </div>
          <Div style={{margin:'10px 0 0 0'}}>{vote} Votes  <span style={{marginLeft:'15px'}}>{comment} Comments</span> <span style={{float:'right'}}>Read 5 min</span></Div>
        </BoxText>
      </Container>
    )
  }
})


    


export default ArticleBox;