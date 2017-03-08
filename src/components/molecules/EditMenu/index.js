import React, {PropTypes} from 'react'
import styled, {css} from 'styled-components'
import Popover from 'material-ui/Popover'
import {PrimaryButton } from 'components'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon'
import Menu from 'material-ui/Menu'

const BoxMenu = styled.div`
  height:60px;
  background:#00B2B4;
  min-width:60px;
`

// const Menu = styled.div`
//   font-size:18px;
//   color:white;
//   min-height:60px;
//   paddind:10px 15px 10px 15px; 
// `
const Edit = styled(Popover)`

`

const Inner = ({description,child,confirm})=>{
  return(
    <BoxMenu>

    </BoxMenu>
  )
}

//children={<Inner child={child} description={description} confirm={confirm}></Inner>}

const EditMenu = ({style,className,child,confirm,description,open,anchorEl,onRequestClose}) => {
	return (
    <Edit
      style={{...style}} 
      className={className}
      open={open}
      anchorOrigin={{horizontal:"right",vertical:"center"}}
      targetOrigin={{horizontal:"left",vertical:"center"}}
      anchorEl={anchorEl}
      onRequestClose={onRequestClose}
    />   
	)
}

export default EditMenu;