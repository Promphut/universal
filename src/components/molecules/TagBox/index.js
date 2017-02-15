import React from 'react'
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon';

const Tag = styled.div`
  float:left;
  border:1px solid #8F8F8F;
  color:#8F8F8F;
  text-align:center;
  padding:10px 15px 10px 15px;
  font-size:16px;

  &:hover{
    box-shadow: 0px 0px 1px #888888;
    text-shadow:0 0 1px #8F8F8F;
    cursor:pointer;
  }
`

const TagBox = ({text,style}) => {
  var stl = style 
  return(
    <Tag style={{...stl}}>{text}</Tag>
  )
}

export default TagBox