import React from 'react'
import styled from 'styled-components'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router-dom'
import moment from 'moment'
import truncate from 'lodash/truncate'
const Container = styled.div`
  width:100%;
  padding:8px;
`

const Contain = styled.div`
  color:#8F8F8F;
  font-size:17px;
  float:left;
  .imgWidth{
    width:49px;
    height:49px;
  }
  @media (max-width:480px){
    width:280px;
    font-size:14px;
    .imgWidth{
      width:36px;
      height:36px;
    }
  }
`

const Span1 = styled.div`
  color:#222;
  font-weight:bold;
  font-size:19px;
  margin-bottom:5px;
  display:inline;
`

const Cir = styled.div`
  background-color:#0046A0;
  width:20px;
  height:20px;
  border-radius:50%;
  display:inline;
  margin-right:10px;
`

const FromColumn = ({style, column}) => {
  //console.log('WritedBy',column)
  if(!column) {
    return (
      <Container></Container>
    )
  }

  return (
    <Container style={{...style}}>
      <div className='row'>
        <Cir/><Span1><a href={column.url || '#'} style={{color:'#222',marginBottom:'5px'}}>{column.name}</a></Span1>
      </div>
      <Contain className="content-font">
        {truncate(column.shortDesc, {
                'length': 95,
                'separator': ''
              })}
      </Contain>

    </Container>
  )
}
 

export default FromColumn