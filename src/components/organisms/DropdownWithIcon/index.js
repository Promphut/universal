import React from 'react'
import styled from 'styled-components'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import {BoxMenu,EditMenu,MenuList} from 'components'
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'


const styles = {
  label:{
    fontSize:'30px'
  },
  underline:{
    background:'none',
    border:'none'
  },
  selected:{
    backgroundColor:'#00B2B4',
    color:'white',
    fill:'white'
  },
  menuItem:{
    fontSize:'22px',
    padding:'8px 40px 8px 15px',
  },
  newColumn:{
    color:'#00B2B4',
    fontWeight:'bold'
  },
  showInactive:{
    textDecoration:'underline',
    color:'#8F8F8F'
  }
}

const Text = styled.div`
  font-size:22px;
  color:#222;
  display:inline;
`

const List = styled(MenuItem)`
  height:60px;
  font-size:22px;
  &:hover{
    background-color:#00B2B4;
  }
`

const DropdownWithIcon = React.createClass({
  getInitialState(){
    return{
      value:'All',
      editState:false,
      editWhere:{},
      open:false,
    }
  },

  handleChange(e,int,val){
    this.setState({value:val})
  },

  handleRequestClose(){
    this.setState({
      open:false
    })
  },

  togglePopover(e){
    this.setState({
      open:true,
      anchorEl:e.currentTarget
    })
  },

  selected(e,val){
    //console.log(val)
    this.setState({value:val,open:false})
    //this.setState({value})
  },

  onFocus(e,item,ind){
    //console.log(e.target)
  },

  closeEdit(){
    this.setState({editState:false})
  },

  openEdit(e){
    this.setState({editState:true,editWhere:e.currentTarget})
  },

  render(){
    var {style,className,children} = this.props
    var {value,editState,editWhere,open,active,focus} = this.state
    return(
        <div className='row'>
          <FlatButton 
            className="hoverIcon"
            onClick={this.togglePopover}
            labelPosition="before"
            labelStyle={{fontSize:'22px'}}
            style={{width:'330px',height:'60px',border:open||editState?'1px solid #e2e2e2':'none'}}>
            <div stlye={{display:'block',overflow:'hidden',position:"relative",width:'100%'}}>
              <Text className='nunito-font'>{value}</Text>
              <FontIcon className='material-icons' style={{fontSize:'30px',color:'#8f8f8f',float:'right',top:'8px'}}>keyboard_arrow_down</FontIcon>
            </div>
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
            >
              <Menu 
                style={{width:'300px'}}
                onChange={this.selected}
                selectedMenuItemStyle={{...styles.selected}}
                menuItemStyle={{...styles.menuItem}}
                onItemTouchTap={this.onFocus}
                value={value}
              >
                <MenuItem value='All' >asdsad</MenuItem>
                <MenuItem value='eee' >asdsad</MenuItem>
                <MenuItem value='ddd' >asdsad</MenuItem>
                <MenuItem value='sss' >asdsad</MenuItem>
              </Menu>
            </Popover>
          </FlatButton>
          <IconButton
            className='hoverIcon'
            style={{border:open||editState?'1px solid #e2e2e2':'none',width:'60px',height:'60px'}}
            iconStyle={{color:'#8f8f8f'}}
            onClick={this.openEdit}
          > 
            <FontIcon className='material-icons'>settings</FontIcon>
            <EditMenu
              open={editState}
              anchorEl={editWhere}
              onRequestClose={this.closeEdit}
              >
              <BoxMenu>
                <MenuList>sadsad</MenuList>
                <MenuList>sadsad</MenuList>
                <MenuList>sadsad</MenuList>
              </BoxMenu>
            </EditMenu>
          </IconButton>
        </div>
    )
  }
})

export default DropdownWithIcon