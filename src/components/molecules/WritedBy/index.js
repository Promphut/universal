import React from 'react'
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router'

const Container = styled.div`
  display:flex;
  width:100%;
  padding:8px;
`

const Contain = styled.div`
  color:#8F8F8F;
  font-size:17px;
  float:left;
  margin:10px;
  .imgWidth{
    width:49px;
    height:49px;
  }
  @media (max-width:480px){
    font-size:14px;
    .imgWidth{
      width:36px;
      height:36px;
    }
  }
`
const Span1 = styled.span`
  color:#222;
  font-weight:bold;
`

const WritedBy = ({style,detail}) => {
  var {name,date,column} = detail
  return(
    <Container style={{...style}}>
      <div><Link to="#"><Avatar src='/tmp/avatar.png' className='imgWidth' style={{float:'left',marginTop:'8px'}}/></Link></div>
      <Contain className="content-font">by <Span1>{name}</Span1>, {date} <br/> writer of <strong>{column}</strong></Contain>
    </Container>
  )
}

export default WritedBy