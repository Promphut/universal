import React from 'react'
import {SignUp,SignUpFb,LogoLink,BackButton,CloseButton,EmailSignUp,SignIn2} from 'components'
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components'
import {Link,browserHistory} from 'react-router'
import Request from 'superagent';
const Wrapper = styled.div`
	width:100%;
  height:100%;
  position:absolute;
  background: ${props=> props.theme.primaryColor};
  background: -moz-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: -webkit-gradient(left top, right bottom, color-stop(0%, ${props=> props.theme.primaryColor}), color-stop(100%, ${props=> props.theme.secondaryColor} ));
  background: -webkit-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: -o-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: -ms-linear-gradient(-45deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  background: linear-gradient(135deg, ${props=> props.theme.primaryColor} 0%, ${props=> props.theme.secondaryColor} 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00b2b4', endColorstr='#cef1b7', GradientType=1 );
  @media (max-width:480px) {
    background:${props=>props.page?'':'white'};
    height: 100vh;
  }
`
const Modal = styled.div`
  width:100%;
  height:100%;
  position:absolute;
  background:rgba(0,0,0,0.6)
`

const Container = styled.div`
  margin:7% auto 0 auto;
  width:600px;
  @media (max-width:480px) {
    width: 100vw;
		height: 100vh;
  }
`
const BoxButton= styled.div`
  overflow:hidden;
  width:100%;

`

const SignUpPage = React.createClass({
	getInitialState(){
		return {
      statePage:1,
      visible:this.props.visible,
    }
	},

  componentWillReceiveProps(nextProps){
    if(nextProps.visible!=this.props.visible){
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
    var {statePage} = this.state
    if(statePage==1){
      browserHistory.goBack()
    }else{
      this.setState({
        statePage:1
      })
    }
  },

  closeModal(e){
    this.setState({
      visible:!this.state.visible
    })
  },

  checkEmail(e,email){
    e.preventDefault()
    console.log(email)
    this.setState({statePage:4})
  },

	render(){
    var {statePage} = this.state
    var { theme } = this.context.setting.publisher
    return (
      <Wrapper style={{display:this.state.visible?'block':'none'}} page={statePage}>
        <Container>
          <div  style={{margin:'0 auto 15px auto',width:'146px'}}>
            <LogoLink src={theme.logo} fill='#E2E2E2' id={'logoSignIn'} to='/'/>
          </div>
          <BoxButton>
            <Link to='#' onClick={this.checkBack} className='hidden-mob'>
              <BackButton style={{float:'left'}} />
            </Link>
            <Link to='#' onClick={this.checkBack} className='hidden-des'>
              <BackButton style={{float:'left'}} />
            </Link>
          </BoxButton>
          {statePage==1&&<EmailSignUp onSubmit={this.checkEmail} />}
          {statePage==2&&<SignUp onSubmit={this.checkEmail} />}
          {statePage==3&&<SignUpFb onSubmit={this.checkEmail} />}
          {statePage==4&&<SignIn2 onSubmit={this.checkEmail} />}
        </Container>
      </Wrapper>
    )
	}
});

SignUpPage.contextTypes = {
	setting: React.PropTypes.object
}

export default SignUpPage
