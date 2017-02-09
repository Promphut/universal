import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import {UpvoteBtn} from 'components'
import IconButton from 'material-ui/IconButton';
import styled from 'styled-components'

const Downvote = styled.a`
  text-decoration: underline;
  color:#8F8F8F;
  font-size:14px;
`


const styles={
  Paper:{
    width:'100%',
  },
  menuIcon:{
    margin:'10px'
  },
  UpvoteBtn:{
    marginLeft:'30px'
  }
}



class AppBarMenu extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper zDepth={1} style={styles.Paper}>
        <IconButton style={styles.menuIcon}><FontIcon className="material-icons">menu</FontIcon></IconButton>
        <img src='/aommoneyIcon.svg'/>
        <UpvoteBtn style={styles.UpvoteBtn} text="Upvote | 18" />
        <Downvote href='#'>Downvote</Downvote>
      </Paper>
    );
  }
}

export default AppBarMenu;