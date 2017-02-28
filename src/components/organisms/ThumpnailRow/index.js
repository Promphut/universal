import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {Thumpnail,ThumpnailSmall} from 'components'

const Container = styled.div`
  width:100%;
  display:flex;
  @media (max-width:480px) {
    width:100%;

  }
`
const Box = styled.div`
  flex:1;
`

const ThumpnailRow = ({detail,style,size})=>{
  var thumpnail = []
  var No = size=='small'?5:4
  for(let i=0;i<No;i++){
    thumpnail.push(
      size=='small'?<Box key={i}><ThumpnailSmall detail={detail[1]}  /></Box>:<Box key={i}><Thumpnail  detail={detail[1]}/></Box>
    )
  }
  return(
    <Container style={{...style}}>
      {thumpnail}
    </Container>
  )
}
    


export default ThumpnailRow;