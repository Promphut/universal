import React from 'react'
import PropTypes from 'prop-types'
import {SignUp,SignUpFb,LogoLink,BackButton,CloseButton,SignIn2} from 'components'
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components'
import api from 'components/api'
import {Link} from 'react-router-dom'

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

class SignUpPage extends React.Component {
  static contextTypes = {
	setting: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      statePage:1,
      visible:props.visible,
      user:{}
    }
  }

  changeStatePage = (e) => {
    e.preventDefault()

    this.setState({
      statePage:!this.state.statePage
    })
  }

  checkBack = (e) => {
    e.preventDefault()

    if(this.state.statePage){
      this.props.history.goBack()

    }else{
      this.setState({
        statePage:!this.state.statePage
      })
    }
  }

  closeModal = (e) => {
    this.setState({
      visible:!this.state.visible
    })
  }

  checkEmail = (e,email) => {
    e.preventDefault()
    api.checkSignUp(email).then((u)=>{
      if(u){
        u.email = email
        //console.log(u)
        if(u.facebook.id) this.setState({statePage:3,user:u})
        else this.setState({statePage:4,user:u})
      }else{
        this.setState({statePage:2,user:email})
      }
    })
  }

componentWillReceiveProps(nextProps){
    if(nextProps.visible!=this.props.visible){
      this.setState({
        visible:nextProps.visible
      })
    }
  }

	render(){
    var {statePage,user} = this.state
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
          {statePage==2&&<SignUp user={user} />}
          {statePage==3&&<SignUpFb user={user} />}
          {statePage==4&&<SignIn2 user={user} />}
        </Container>
      </Wrapper>
    )
	}
}

export default SignUpPage
