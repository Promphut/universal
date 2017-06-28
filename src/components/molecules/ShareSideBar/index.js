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

class ShareSideBar extends React.Component {

	constructor(props) {
		super(props)

		this.state = { 
      status: false
    }
	}

  ToggleButton =() => {
    this.setState({status: !this.state.status})
  }

  render() {
    return (
      <Div style={this.props.style}>
        <No>{utils.numberFormat(this.props.shareCount)}</No>
          <div style={{color:'#8F8F8F',fontSize:'16px',fontWeight:'blod',textAlign:'center'}}>shares</div>
          <FbShareButton  button={<CirButton><i className="fa fa-facebook fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>} />
          {this.state.status && <TwtShareButton button={<CirButton style={{backgroundColor:'#60AADE',paddingLeft:'18px'}}><i className="fa  fa-twitter fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>} />}
          {this.state.status && <InShareButton  button={<CirButton style={{backgroundColor:'#0077b5',paddingLeft:'18px'}}><i className="fa  fa-linkedin fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>} />}
          {this.state.status && <LineShareButton button={<CirButton style={{backgroundColor:'#00c300',backgroundImage:'url(/pic/line.svg)',backgroundRepeat:'no-repeat' ,backgroundPosition:'center center'}}></CirButton>} />}
          <div onClick={this.ToggleButton}>
          {this.state.status && <CirButton style={{backgroundColor:'#C7C7C7',paddingLeft:'18px',paddingBottom:'10px'}}><i className="fa fa-times fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>}
          {!this.state.status && <CirButton style={{backgroundColor:'#C7C7C7',paddingLeft:'18px',paddingBottom:'1px'}}><i className="fa fa-ellipsis-h fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>}

          </div>
      </Div>
    )
  }
}

export default ShareSideBar
