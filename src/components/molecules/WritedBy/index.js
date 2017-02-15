import React from 'react'
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router'

const Contain = styled.div`
  color:#8F8F8F;
  font-size:17px;
  float:left;
  margin:10px;
  
`
const Span1 = styled.span`
  color:#222;
  font-weight:bold;
`

const WritedBy = ({style,detail}) => {
  var stl = style 
  var {name,date,column} = detail
  return(
    <div style={{...stl,overflow:'auto',width:'100%'}}>
      <Link to="#"><Avatar src='/tmp/avatar.png' size={49} style={{float:'left'}}/></Link>
      <Contain>by <Span1>{name}</Span1>, {date} <br/> writer of <strong>{column}</strong></Contain>
    </div>
  )
}

export default WritedBy