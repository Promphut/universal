import React from 'react'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
const styles = {
  MenuItem:{
  },
  Popover:{
    padding:'0px',
    marginTop:'11px'
  },
  editMenu:{
    backgroundColor:'#222',
    color:'white'
  },
  Avatar:{
    
  },
  userMenu:{
    padding:'20px'
  }
};

const UserMenu = ({openPopUp,anchor,closePopUp})=>{
  return(
    <Popover
      open={openPopUp}
      anchorEl={anchor}
      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      onRequestClose={closePopUp}
      style={styles.Popover}
    >
      <Menu width={226} menuItemStyle={styles.MenuItem}>
        <MenuItem primaryText="Editor Mode" style={styles.editMenu} leftIcon={<FontIcon className='material-icons' style={{color:'white'}}>mode_edit</FontIcon>} />
        <MenuItem primaryText="Saving" style={styles.userMenu} leftIcon={<Avatar src='/icon.png' style={styles.Avatar} size={50} />} />
        <Divider />
        <MenuItem primaryText="Fund" />
        <MenuItem primaryText="Stock" />
        <MenuItem primaryText="Money Ideas" />
        <MenuItem primaryText="Retirement" />
      </Menu>
    </Popover>
  )
}

export default UserMenu