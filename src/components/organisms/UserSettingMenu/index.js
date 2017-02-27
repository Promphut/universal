import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import {List, ListItem, makeSelectable} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon'
import {Link,browserHistory} from 'react-router'
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar'
var styles = {
  list:{
    color:'white'
  },
  listItem:{
    padding:'20px',
    color:"white"
  }
}

const User = styled.div`
  font-size:20px;
  line-height:1.3;
`

const SelectableList = makeSelectable(List);

const UserSettingMenu = React.createClass({
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
        <ListItem style={{...styles.listItem,padding:'30px 20px 30px 20px'}} primaryText={<User>Ochawin Chirasottikul</User>} leftAvatar={<Avatar src="/tmp/avatar.png" style={{marginTop:'12px'}} size={50}/>} />
        <Divider />
        <ListItem style={{...styles.listItem,padding:'35px 20px 35px 20px'}} onClick={()=>this.changePath('/me/stories')} value='/me/stories' primaryText="My Stories" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>description</FontIcon>} />
        <Divider />
        <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/me/settings')} value='/me/settings' primaryText="Profile" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>person</FontIcon>} />
        <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/me/settings/account')} value='/me/settings/account' primaryText="Account" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>settings</FontIcon>} />
      </SelectableList>
    )
  },
})



export default UserSettingMenu