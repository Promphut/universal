import React from 'react'
import {SignUp,SignUpFb,Logo,BackButton,CloseButton} from 'components'
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components'
import {Link,browserHistory} from 'react-router'

const Wrapper = styled.div`
	width:100%;
  height:100%;
  position:absolute;
  background: rgba(0,178,180,1);
  background: -moz-linear-gradient(-45deg, rgba(0,178,180,1) 0%, rgba(206,241,183,1) 100%);
  background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(0,178,180,1)), color-stop(100%, rgba(206,241,183,1)));
  background: -webkit-linear-gradient(-45deg, rgba(0,178,180,1) 0%, rgba(206,241,183,1) 100%);
  background: -o-linear-gradient(-45deg, rgba(0,178,180,1) 0%, rgba(206,241,183,1) 100%);
  background: -ms-linear-gradient(-45deg, rgba(0,178,180,1) 0%, rgba(206,241,183,1) 100%);
  background: linear-gradient(135deg, rgba(0,178,180,1) 0%, rgba(206,241,183,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00b2b4', endColorstr='#cef1b7', GradientType=1 );
`
const Modal = styled.div`
  width:100%;
  height:100%;
  position:absolute;
  background:rgba(0,0,0,0.6)
`

const Container = styled.div`
  margin:7% auto 0 auto;
  width:477px;
`
const BoxButton= styled.div`
  overflow:hidden;
  width:100%;
`

const SignUpPage = React.createClass({
	getInitialState(){
		return {
      statePage:true,
      visible:this.props.visible
    }
	},

  componentWillReceiveProps(nextProps){
    if(nextProps.visible!=this.props.visible){
      this.props.visible=this.props.visible
      this.setState({
        visible:nextProps.visible
      })
    }
  },

  changeStatePage(e){
    e.preventDefault()
    this.setState({
      statePage:!this.state.statePage
    })
  },

  checkBack(e){
    e.preventDefault()
    if(this.state.statePage){
      window.history.back();
    }else{
      this.setState({
        statePage:!this.state.statePage
      })
    }
  },

  closeModal(e){
    this.setState({
      visible:!this.state.visible
    })
  },

	render(){
    if(this.state.visible){
      var styles={}
    }else{
      var styles={display:'none'}
    }
    if(!this.props.modal){
      return (
		    <Wrapper style={{...styles}}>
          <Container>
            <div  style={{margin:'0 auto 15px auto',width:'146px'}}><Logo fill='#E2E2E2'/></div>
            <BoxButton>
              <Link to='#' onClick={this.checkBack} ><BackButton style={{float:'left'}}/></Link>
            </BoxButton>
            {this.state.statePage?<SignUpFb emailSignUp={this.changeStatePage}/>:<SignUp/>}
          </Container>
		   </Wrapper>
		  )
    }else{
      return (
		    <Modal style={{...styles}}>
          <Container>
            <div  style={{margin:'0 auto 15px auto',width:'146px'}}><Logo fill='#E2E2E2'/></div>
            <BoxButton>
              <Link to='#' onClick={this.checkBack} ><BackButton style={{float:'left'}}/></Link>
              <CloseButton onClick={this.closeModal} style={{float:'right',paddingTop:'0px'}}/>
            </BoxButton>
            {this.state.statePage?<SignUpFb emailSignUp={this.changeStatePage}/>:<SignUp/>}
          </Container>
		   </Modal>
		  )
    }

	}
});

export default SignUpPage