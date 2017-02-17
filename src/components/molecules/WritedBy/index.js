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
  @media (min-width:481px) {
    .menu-font {
      font-family: 'Nunito', 'Mitr';
      font-size: 16px;
      font-weight: bold;
    }
    .title-font {
      font-family: 'PT Serif', 'Mitr';
      font-size: 36px;
    }
    .content-font {
      font-family: 'PT Sans', 'cs_prajad', sans-serif;
      font-size: 20px;
    }
  }

  /* FOR MOBILE */
  @media (max-width:480px) {
    .menu-font {
      font-family: 'Nunito', 'Mitr';
      font-size: 16px;
      font-weight: bold;
    }
    .title-font {
      font-family: 'Roboto Slab', 'Mitr';
      font-size: 36px;
    }
    .content-font {
      font-family: 'Roboto', 'cs_prajad', sans-serif;
      font-size: 20px;
    }
  }
  
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
      <Link to="#"><Avatar src='/tmp/avatar.png' size={49} style={{float:'left',marginTop:'8px'}}/></Link>
      <Contain className="content-font" style={{fontSize:'17px'}}>by <Span1>{name}</Span1>, {date} <br/> writer of <strong>{column}</strong></Contain>
    </div>
  )
}

export default WritedBy