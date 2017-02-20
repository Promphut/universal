import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon'

var styles = {
  list:{
    color:'white'
  },
  listItem:{
    padding:'20px 20px 20px 20px',
    color:"white"
  }
}

const PublisherSettingMenu = React.createClass({
  getInitialState(){
    return{
      textStatus:'Unsave'
    }
  },
  render(){
    return(
      <List>
        <ListItem style={{...styles.listItem}} primaryText="dashboard" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>dashboard</FontIcon>} />
        <ListItem style={{...styles.listItem}} primaryText="Stories" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>description</FontIcon>} />
        <ListItem style={{...styles.listItem}} primaryText="Contact and About" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>contacts</FontIcon>} />
        <ListItem style={{...styles.listItem}} primaryText="Settings" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>settings</FontIcon>} />
      </List>
    )
  },
})



export default PublisherSettingMenu