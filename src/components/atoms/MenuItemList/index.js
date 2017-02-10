import React from 'react'
import styled from 'styled-components'

var Menu = styled.div`
  width:226px;
  font-size:17px;
  color:#222222;
  padding:15px;
  font-family:'Nunito';
  &:hover{
    text-decoration:underline;
    font-weight:bold;
  }
`

const MenuItemList = ()=>{
  return(
    <Menu/>
  )
}

export default MenuItemList