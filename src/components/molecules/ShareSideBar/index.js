import React from 'react'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {FbIcon, TwtShareButton, FbShareButton} from 'components';
import {findDOMNode as dom} from 'react-dom'

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

//if height less than 900px remove last item

const ShareSideBar = React.createClass({
  getInitialState(){
    return{
      stopPos:this.props.stop
    }
  },

  render(){
    var {detail,style} = this.props

    //console.log(window.location)
    return(
      <Div style={{style}}>
        <No>{detail.shares.total}</No>
        <div style={{color:'#8F8F8F',fontSize:'16px',fontWeight:'blod',textAlign:'center'}}>shares</div>
        <FbShareButton button={<CirButton><i className="fa fa-facebook fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>} />
        <TwtShareButton button={<CirButton style={{backgroundColor:'#60AADE',paddingLeft:'18px'}}><i className="fa  fa-twitter fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>} />
      </Div>
  )
  },
})



export default ShareSideBar
