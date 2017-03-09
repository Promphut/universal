import React, {PropTypes} from 'react'
import styled, {css} from 'styled-components'
import Popover from 'material-ui/Popover'
import {PrimaryButton } from 'components'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon'
import Menu from 'material-ui/Menu'


//children={<Inner child={child} description={description} confirm={confirm}></Inner>}

const EditMenu = React.createClass({

  getInitialState(){
    return{

    }
  },

  render(){
    var {style,className,child,confirm,description,open,anchorEl,onRequestClose} = this.props
    return (
      <Popover
        style={{...style}} 
        className={className}
        open={open}
        anchorOrigin={{horizontal:"left",vertical:"center"}}
        targetOrigin={{horizontal:"left",vertical:"center"}}
        anchorEl={anchorEl}
        onRequestClose={onRequestClose}
      > 
       {this.props.children}
      </Popover>  
    )
  }
})
	
export default EditMenu;