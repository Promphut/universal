import React from 'react'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {FbIcon, TwtShareButton, FbShareButton, InShareButton, LineShareButton} from 'components';
import {findDOMNode as dom} from 'react-dom'
import utils from '../../../services/utils'

const Div = styled.div`
  width:70px;
  margin:20px 0 10px 0;
`

const No = styled.div`
  color:#222222;
  font-size:36px;
  text-align:center;
`

const CirButton = styled.div`
  width:61px;
  height:61px;
  border-radius:50%;
  background-color:#3A579A;
  padding:16px 0 0 21px;
  margin:15px auto 15px auto;
  &:hover{
    cursor:pointer;
  }
`

const ShareSideBar = ({style, shareCount}) => {
  if(status) {
    return (
      <Div style={{style}}>
        <No>{utils.numberFormat(shareCount)}</No>
        <div style={{visibility:'hidden'}}>
          <div style={{color:'#8F8F8F',fontSize:'16px',fontWeight:'blod',textAlign:'center'}}>shares</div>
          <FbShareButton  button={<CirButton><i className="fa fa-facebook fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>} />
          <TwtShareButton button={<CirButton style={{backgroundColor:'#60AADE',paddingLeft:'18px'}}><i className="fa  fa-twitter fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>} />
          <InShareButton  button={<CirButton style={{backgroundColor:'#0077b5',paddingLeft:'18px'}}><i className="fa  fa-linkedin fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>} />
          <LineShareButton button={<CirButton style={{backgroundColor:'#00c300',backgroundImage:'url(/pic/line.svg)',backgroundRepeat:'no-repeat' ,backgroundPosition:'center center'}}></CirButton>} />
        </div>
      </Div>
    )
  }  else {
    return (
      <Div style={{style}}>
        <No>{utils.numberFormat(shareCount)}</No>
        <div style={{color:'#8F8F8F',fontSize:'16px',fontWeight:'blod',textAlign:'center'}}>shares</div>
        <FbShareButton  button={<CirButton><i className="fa fa-facebook fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>} />
        <TwtShareButton button={<CirButton style={{backgroundColor:'#60AADE',paddingLeft:'18px'}}><i className="fa  fa-twitter fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>} />
        <InShareButton button={<CirButton style={{backgroundColor:'#0077b5',paddingLeft:'18px'}}><i className="fa  fa-linkedin fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>} />
        <LineShareButton button={<CirButton style={{backgroundColor:'#00c300',backgroundImage:'url(/pic/line.svg)',backgroundRepeat:'no-repeat' ,backgroundPosition:'center center'}}></CirButton>} />
      </Div>
    )
  }
}

export default ShareSideBar
