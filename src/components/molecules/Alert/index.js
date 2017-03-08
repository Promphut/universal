import React, {PropTypes} from 'react'
import styled, {css} from 'styled-components'
import Popover from 'material-ui/Popover'
import {PrimaryButton } from 'components'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon'
import Menu from 'material-ui/Menu'

const Box = styled.div`
  width:224px;
  border:1px solid #00B2B4;
  padding:10px;
  background:white;
`

const Desc = styled.div`
  font-size:18px;
  color:#222;
  padding:10px;
`

const Inner = ({description,child,confirm})=>{
  return(
    <Box>
      <IconButton>
        <FontIcon className='material-icons'>close</FontIcon> 
      </IconButton>
      {description?<Desc className='sans-font'>{description}</Desc>:''}
      {child?child:''}
      <PrimaryButton label='Confirm' onClick={confirm} style={{margin:'15px 0 15px 0'}}/>
    </Box>
  )
}

const Alert = ({style,className,child,confirm,description,open,anchorEl,onRequestClose}) => {
	return (
    <Popover 
    style={{...style}} 
    className={className}
    open={open}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
    anchorEl={anchorEl}
    onRequestClose={onRequestClose}
    children={<Inner child={child} description={description} confirm={confirm}></Inner>}
    >

    </Popover>     
	)
}

export default Alert;