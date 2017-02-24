import React from 'react'
import {Link} from 'react-router'
import styled from 'styled-components'

var Tag = styled(Link)`
  color:#00B2B4;
  font-weight:bold;
  font-style: italic;
  font-size:19px;
  &:hover{
    cursor:pointer;
    color:#00B2B4;
    opacity:0.5;
  }
  @media(max-width:480px){
    font-size:14px;
  }
`

const UserTag = (props)=>{
  return(
    <Tag  style={{...props.style}} className={props.className}/>
  )
}

export default UserTag