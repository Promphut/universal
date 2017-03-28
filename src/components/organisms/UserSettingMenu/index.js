import React, {PropTypes} from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import {List, ListItem, makeSelectable} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon'
import {Link,browserHistory} from 'react-router'
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar'
import auth from 'components/auth'


var styles = {
  list:{
    color:'white'
  },
  listItem:{
    padding:'20px',
    color:"white",
    fontWeight:'bold'
  }
}

const User = styled(Link)`
  padding-left: 20px;
  &:hover { color: White; }
`

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 30px 30px 30px;
  font-size: 20px;

  & > * {
    vertical-align: top;
    display: inline-block;
    color: White;
    margin: 0;
  }
`

const Item = styled(ListItem)`
  padding: 20px;
  color: White;

  & div div {
    font-family: 'Nunito', 'Mitr', sans-serif;
    font-size: 17px;
    font-weight: bold;
    padding-left: 10px;
  }
`

const SelectableList = makeSelectable(List);

const UserSettingMenu = React.createClass({
  getInitialState(){
    return {
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

  changePath(path){
    browserHistory.push(path)
  },  

  render(){
    let {display, pic, url} = this.props.user
    //if(!display || !pic) return (<div></div>)

    return (
      <div>
        <Card>
          {pic && <Avatar src={pic.medium} style={{marginTop:'12px'}} size={50}/>}
          {display && <User to={url}>{display}</User>}
        </Card>

        <SelectableList value={this.state.selectedIndex} style={{padding:1}}>
          <Divider />
          <ListItem style={{...styles.listItem, padding:'35px 20px 35px 20px'}} onClick={()=>this.changePath('/me/stories')} value='/me/stories' primaryText="My Stories" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>description</FontIcon>} />
          <Divider />
          <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/me/settings')} value='/me/settings' primaryText="Profile" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>person</FontIcon>} />
          <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/me/settings/account')} value='/me/settings/account' primaryText="Account" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>settings</FontIcon>} />
        </SelectableList>
      </div>
    )
  },
})

UserSettingMenu.propTypes = {
  user: PropTypes.object
}

export default UserSettingMenu