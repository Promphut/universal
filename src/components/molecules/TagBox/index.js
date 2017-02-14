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
`

const TagBox = ({text,style}) => {
  var stl = style 
  return(
    <Tag style={{...stl}}>{text}</Tag>
  )
}

export default TagBox