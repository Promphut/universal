import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import {List, ListItem, makeSelectable} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon'
import {Link,browserHistory} from 'react-router'
import auth from 'components/auth'

var styles = {
  list:{
    color:'white'
  },

  listItem:{
    padding:'20px 20px 20px 20px',
    color:"white",
    fontFamily: "'Nunito', 'Mitr', sans-serif",
    fontWeight: 'bold'
  }
}

const SelectableList = makeSelectable(List);

const PublisherSettingMenu = React.createClass({
  getInitialState(){
    this.isAdmin = false

    return {
      selectedIndex:this.props.pathname
    }
  },
  
  componentWillReceiveProps(nextProps){
    if(nextProps.pathname!=this.props.pathname){
      this.setState({
        selectedIndex: nextProps.pathname,
      });
    }
  },

  componentDidMount(){
    this.setState({selectedIndex: this.props.pathname})
  },

  componentWillMount(){
    this.isAdmin = auth.hasRoles(["ADMIN"])
  },

  changePath(e){
    browserHistory.push(e)
  },  

  render(){
    return (
      <SelectableList value={this.state.selectedIndex} style={{padding:0, marginTop: '30px'}}>
        <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/editor/')} value='/editor' className='nunito-font' primaryText="Dashboard" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>dashboard</FontIcon>} />
        <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/editor/stories')} value='/editor/stories' className='nunito-font' primaryText="Stories" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>description</FontIcon>} />

        {this.isAdmin && <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/editor/contact')} value='/editor/contact' className='nunito-font' primaryText="Contact & About" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>contacts</FontIcon>} />}
        {this.isAdmin && <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/editor/settings')} value='/editor/settings' className='nunito-font' primaryText="Settings" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>settings</FontIcon>} />}

      </SelectableList>
    )
  },
})



export default PublisherSettingMenu