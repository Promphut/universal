import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import {List, ListItem, makeSelectable} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon'
import {Link,browserHistory} from 'react-router'
import auth from 'components/auth'

const Wrapper = styled.div`
  .open {
    transform: rotate(180deg);
    transition-duration: 1s;
  }
`

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
      open: item.state.open
    })
  },

  toggleNested() {
    this.setState({
      open: !this.state.open
    })
  },

  render(){
    //console.log(this.props.pathname.split('/'))
    let {theme} = this.context.setting.publisher
    var {selectedIndex, open} = this.state
    return (
      <Wrapper>
      <SelectableList  style={{padding:0}}>
        <ListItem style={{...styles.listItem,backgroundColor:selectedIndex=='/editor/'&&theme.accentColor||
          this.props.pathname=="/editor/stories" && theme.accentColor ||
          this.props.pathname=="/editor/columns" && theme.accentColor ||
          this.props.pathname=="/editor/writers" && theme.accentColor
        }}
          onClick={()=>this.changePath('/editor/')}
          value={this.props.pathname=="/editor/"&& this.props.pathname ||
          this.props.pathname=="/editor/stories" && this.props.pathname ||
          this.props.pathname=="/editor/columns" && this.props.pathname ||
          this.props.pathname=="/editor/writers" && this.props.pathname
          }
          primaryTogglesNestedList={true}
          className='nunito-font' primaryText="Insights"
          open={open}
          rightIcon={<FontIcon className={'material-icons ' + (open ? 'open' : '')} onClick={this.toggleNested} style={{color:'white'}}>keyboard_arrow_up</FontIcon>}
          nestedItems={[
            <ListItem
              onClick={()=>this.changePath('/editor/')}
              value='/editor/'
              style={{...styles.listNestedItem,color:selectedIndex=='/editor/'?theme.accentColor:'white'}}
              primaryText="Overview"
            />,
            <ListItem
              onClick={()=>this.changePath('/editor/stories')}
              value='/editor/stories'
              style={{...styles.listNestedItem,color:selectedIndex=='/editor/stories'?theme.accentColor:'white'}}
              primaryText="Stories"
            />,
            <ListItem
              onClick={()=>this.changePath('/editor/columns')}
              value='/editor/columns'
              style={{...styles.listNestedItem,color:selectedIndex=='/editor/columns'?theme.accentColor:'white'}}
              primaryText="Columns"
            />,
            <ListItem
              onClick={()=>this.changePath('/editor/writers')}
              value='/editor/writers'
              style={{...styles.listNestedItem,color:selectedIndex=='/editor/writers'?theme.accentColor:'white'}}
              primaryText="Writers"
            />
          ]}
          nestedListStyle={{background: 'rgba(255,255,255,0.2)', padding: '0px'}}
        />
        <ListItem style={{...styles.listItem,backgroundColor:selectedIndex=='/editor/manage'&&theme.accentColor}} onClick={()=>this.changePath('/editor/manage')} value='/editor/manage' className='nunito-font' primaryText="Manage Stories"/>
        {this.isAdmin && <ListItem style={{...styles.listItem,backgroundColor:selectedIndex=='/editor/contact'&&theme.accentColor}} onClick={()=>this.changePath('/editor/contact')} value='/editor/contact' className='nunito-font' primaryText="Contact & About"/>}
        {this.isAdmin && <ListItem style={{...styles.listItem,backgroundColor:selectedIndex=='/editor/settings'&&theme.accentColor}} onClick={()=>this.changePath('/editor/settings')} value='/editor/settings' className='nunito-font' primaryText="Settings"/>}
      </SelectableList>
    </Wrapper>
    )
  },
})

PublisherSettingMenu.contextTypes = {
	setting: React.PropTypes.object
}

export default PublisherSettingMenu
