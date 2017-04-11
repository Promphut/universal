import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import {List, ListItem, makeSelectable} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon'
import {Link,browserHistory} from 'react-router'
import auth from 'components/auth'

const styles = {
  list:{
    color:'white'
  },

  listItem:{
    padding:'16px 20px',
    color:"white",
    fontFamily: "'Nunito', 'Mitr', sans-serif",
    fontWeight: 'bold'
  },

  listNestedItem:{
    padding:'5px 20px',
    color:"white",
    fontFamily: "'Nunito', 'Mitr', sans-serif",
    fontWeight: 'bold'
  }
}
const Con = styled.div`
  &>div>span.nunito-font {
    fill:white;
    background:white;
  }
`

const SelectableList = makeSelectable(List);

const PublisherSettingMenu = React.createClass({
  getInitialState(){
    this.isAdmin = false

    return {
      selectedIndex:this.props.pathname,
      open:true
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

  handleNestedListToggle(item){
    this.setState({
      open: item.state.open,
    });
  },

  render(){
    return (
      <Con>
      <SelectableList value={this.state.selectedIndex} style={{padding:0}}>
        <ListItem style={{...styles.listItem}}
          onClick={()=>this.changePath('/editor/')} value='/editor'
          className='nunito-font' primaryText="Insights"
          open={this.state.open}
          onNestedListToggle={this.handleNestedListToggle}
          leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>dashboard</FontIcon>}
          nestedItems={[
            <ListItem
              onClick={()=>this.changePath('/editor/')}
              value='/editor/'
              style={{...styles.listNestedItem}}
              primaryText="Overview"
            />,
            <ListItem
              onClick={()=>this.changePath('/editor/stories')}
              value='/editor/stories'
              style={{...styles.listNestedItem}}
              primaryText="Stories"
            />,
            <ListItem
              onClick={()=>this.changePath('/editor/columns')}
              value='/editor/columns'
              style={{...styles.listNestedItem}}
              primaryText="Columns"
            />,
            <ListItem
              onClick={()=>this.changePath('/editor/writers')}
              value='/editor/writers'
              style={{...styles.listNestedItem}}
              primaryText="Writers"
            />
          ]}
          nestedListStyle={{background: 'rgba(255,255,255,0.2)', padding: '0px'}}
        />
        <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/editor/manage')} value='/editor/manage' className='nunito-font' primaryText="Manage Stories" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>description</FontIcon>} />
        {this.isAdmin && <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/editor/contact')} value='/editor/contact' className='nunito-font' primaryText="Contact & About" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>contacts</FontIcon>} />}
        {this.isAdmin && <ListItem style={{...styles.listItem}} onClick={()=>this.changePath('/editor/settings')} value='/editor/settings' className='nunito-font' primaryText="Settings" leftIcon={<FontIcon className="material-icons" style={{color:'white'}}>settings</FontIcon>} />}
      </SelectableList>
      </Con>
    )
  },
})



export default PublisherSettingMenu
