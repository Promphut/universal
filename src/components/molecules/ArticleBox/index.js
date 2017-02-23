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
`
const Div = styled.div`
  color:#8F8F8F;
  font-size:13px;
`
const Name = styled.div`
  color:#222;
  font-weight:bold;
  font-size:18px;
`
const BoxText = styled.div`
  float:left;
  width:462px;
  padding-left:15px;
`
const DropDown = styled.div`
  float:right;
  &:hover{
    cursor:pointer;
  }
`

const ArticleBox = React.createClass({
  getInitialState(){
    return{
      open:false
    }
  },
  handleTouchTap(event){
    // This prevents ghost click.
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
        <OverlayImg src={photo} style={{width:'254px',height:'149px',float:'left'}}/>
        <BoxText className='sans-font'>
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