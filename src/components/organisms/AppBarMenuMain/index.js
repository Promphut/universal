import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import {UpvoteBtn,NewStoryBtn,SignUpBtn,MenuItemList,UserMenu} from 'components'
import IconButton from 'material-ui/IconButton';
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
const Menus = styled.a`
  text-decoration: none;
  color:#8F8F8F;
  font-size:17px;
  font-family: 'Nunito';
  flex:1;
  padding:19px 0 19px 0;
  text-align:center;
  &:hover{
    color:#222222;
    cursor: pointer;
    text-decoration: underline;
  }
  &:active{
    background-color:#F4F4F4;
  }
`

const MenuContainer = styled.div`
  width:450px;
  height:auto;
  margin:0px auto 0px auto;
  display:flex;
  position:absolute;
  left: 50%; /* position the left edge of the element at the middle of the parent */
  transform: translate(-50%, 0);
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
  },
  downArrow:{
    color:'#8F8F8F',
    float:'right',
    margin:'0 20px 0 0'
  },
  Popover:{
    marginTop:'0',
    borderRadius:'0px',
    backgroundColor:'#F4F4F4'
  },
  MenuItem:{
    paddingLeft:'20px',
    color:'#222',
    fontSize:'17px'
  }
}

const AppBarMenuMain = React.createClass({
  getInitialState(){
    return{
      open:false,
      openUserMenu:false,
      anchorEl:{},
      anchorUserMenu:{}
    }
  },

  handleTouchTap(event){
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  },
  toggleUserMenu(event){
    event.preventDefault();
    this.setState({
      openUserMenu: true,
      anchorUserMenu: event.currentTarget,
    });
  },

  handleRequestClose(){
    this.setState({
      open: false,
      openUserMenu:false
    });
  },
  render(){
    if(!this.props.onScroll){
      var obj = Object.assign(styles.Paper,{background:'none',boxShadow: 'none'})
    }
    if(!this.props.logedIn){
      return(
        <Paper zDepth={1} style={styles.Paper}>
          <IconButton style={styles.menuIcon}><FontIcon className="material-icons">menu</FontIcon></IconButton>
          <a href="#"><img src='/aommoneyIcon.svg' style={styles.icon}/></a>
          <Login>Sign In</Login>
          <span style={{float:'right',margin:'19px 5px 19px 5px',color:'#C2C2C2',fontSize:'17px'}}>Or</span>
          <SignUpBtn style={styles.SignUpBtn}/>
          <MenuContainer>
            <Menus activeClassName='dropdownMenuActive'>Home</Menus>
            <Menus onClick={this.handleTouchTap} >Stories<FontIcon className="material-icons" style={styles.downArrow}>keyboard_arrow_down</FontIcon>
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose}
                style={styles.Popover}
              >
                <Menu width={226} menuItemStyle={styles.MenuItem}>
                  <MenuItem primaryText="All" />
                  <MenuItem primaryText="Saving" />
                  <MenuItem primaryText="Fund" />
                  <MenuItem primaryText="Stock" />
                  <MenuItem primaryText="Money Ideas" />
                  <MenuItem primaryText="Retirement" />
                </Menu>
              </Popover>
            </Menus>
            <Menus>About Us</Menus>
            <Menus>Contact</Menus>
          </MenuContainer>
        </Paper>
      )
    }else{
      return(
        <Paper zDepth={1} style={styles.Paper}>
          <IconButton style={styles.menuIcon}><FontIcon className="material-icons">menu</FontIcon></IconButton>
          <a href="#"><img src='/aommoneyIcon.svg' style={styles.icon}/></a>
          <div>
            <Avatar src='/icon.png' style={styles.Avatar} size={36} onClick={this.toggleUserMenu}/>
            <UserMenu openPopUp={this.state.openUserMenu} anchor={this.state.anchorUserMenu} closePopUp={this.handleRequestClose}/>
          </div>
          <NewStoryBtn style={styles.NewStoryBtn} />
          <MenuContainer>
            <Menus>Home</Menus>
            <Menus onClick={this.handleTouchTap} >Stories<FontIcon className="material-icons" style={styles.downArrow}>keyboard_arrow_down</FontIcon>
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose}
                style={styles.Popover}
              >
                <Menu width={226} menuItemStyle={styles.MenuItem}>
                  <MenuItem primaryText="All" />
                  <MenuItem primaryText="Saving" />
                  <MenuItem primaryText="Fund" />
                  <MenuItem primaryText="Stock" />
                  <MenuItem primaryText="Money Ideas" />
                  <MenuItem primaryText="Retirement" />
                </Menu>
              </Popover>
            </Menus>
            <Menus>About Us</Menus>
            <Menus>Contact</Menus>
          </MenuContainer>
        </Paper>
      )
    }
  }
})

export default AppBarMenuMain;