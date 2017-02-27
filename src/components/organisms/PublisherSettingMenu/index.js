import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import {List, ListItem, makeSelectable} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon'
import {Link,browserHistory} from 'react-router'

var styles = {
  list:{
    color:'white'
  },
  listItem:{
    padding:'20px 20px 20px 20px',
    color:"white"
  }
}

const SelectableList = makeSelectable(List);

const PublisherSettingMenu = React.createClass({
  getInitialState(){
    return{
      selectedIndex:this.props.pathname
    }
  },
  componentWillReceiveProps(nextProps){
    if(nextProps!=this.props){
      this.setState({
        selectedIndex: nextProps.pathname,
      });
    }
  },

  componentDidMount(){

  },

  changePath(e){
    browserHistory.push(e)
  },  

  render(){
    return(
      <SelectableList value={this.state.selectedIndex}>
        <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/editor/')} value='/editor/' primaryText="dashboard" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>dashboard</FontIcon>} />
        <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/editor/stories')} value='/editor/stories' primaryText="Stories" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>description</FontIcon>} />
        <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/editor/contact')} value='/editor/contact' primaryText="Contact and About" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>contacts</FontIcon>} />
        <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/editor/settings')} value='/editor/settings' primaryText="Settings" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>settings</FontIcon>} />
      </SelectableList>
    )
  },
})



export default PublisherSettingMenu