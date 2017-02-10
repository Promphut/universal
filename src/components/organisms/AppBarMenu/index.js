import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import {UpvoteBtn,NewStoryBtn,SignUpBtn} from 'components'
import IconButton from 'material-ui/IconButton';
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar';

const Downvote = styled.a`
  text-decoration: underline;
  color:#8F8F8F;
  font-size:14px;
  font-family: 'Nunito';
  &:hover{
    color:#222222;
  }
`

const Login = styled.a`
  text-decoration: none;
  color:#8F8F8F;
  font-size:17px;
  font-weight:bold;
  float:right;
  font-family: 'Nunito';
  margin:19px;
  text-align:center;
  &:hover{
    color:#222222;
    cursor: pointer;
    text-decoration: underline;
  }
`

var styles={
  Paper:{
    width:'100%',
    height:'60px',
    boxShadow: '1px 1px 1px #e2e2e2'
    //background:'none'
  },
  menuIcon:{
    margin:'6px',
    float:'left'
  },
  UpvoteBtn:{
    margin:'12px 15px 10px 90px',
  },
  Avatar:{
    float:'right',
    margin:'13px',
    marginRight:'20px'
  },
  NewStoryBtn:{
    float:'right',
    margin:'12px',
    marginRight:'30px'
  },
  icon:{
    float:'left',
    margin:'22px'
  },
  SignUpBtn:{
    float:'Right',
    margin:'12px'
  }
}



const AppBarMenu = ({onScroll,logedIn}) => {
    if(!onScroll){
      var obj = Object.assign(styles.Paper,{background:'none',boxShadow: 'none'})
    }
    if(!logedIn){
      return(
        <Paper zDepth={1} style={styles.Paper}>
          <IconButton style={styles.menuIcon}><FontIcon className="material-icons">menu</FontIcon></IconButton>
          <a href="#"><img src='/aommoneyIcon.svg' style={styles.icon}/></a>
          <UpvoteBtn style={styles.UpvoteBtn}  text="Upvote | 18" />
          <Downvote href='#'>Downvote</Downvote>
          <Login>Sign In</Login>
          <span style={{float:'right',margin:'19px 5px 19px 5px',color:'#C2C2C2',fontSize:'17px'}}>Or</span>
          <SignUpBtn style={styles.SignUpBtn}/>
        </Paper>
      )
    }else{
      return(
        <Paper zDepth={1} style={styles.Paper}>
          <IconButton style={styles.menuIcon}><FontIcon className="material-icons">menu</FontIcon></IconButton>
          <a href="#"><img src='/aommoneyIcon.svg' style={styles.icon}/></a>
          <UpvoteBtn style={styles.UpvoteBtn}  text="Upvote | 18" />
          <Downvote href='#'>Downvote</Downvote>
          <Avatar src='/icon.png' style={styles.Avatar} size={36}/>
          <NewStoryBtn style={styles.NewStoryBtn} />
        </Paper>
      )
    }
}

export default AppBarMenu;