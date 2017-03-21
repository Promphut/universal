import React from 'react'
import styled from 'styled-components'
import {AboutContainer, PrimaryButton, SecondaryButton} from 'components'
import TextField from 'material-ui/TextField'
import api from 'components/api'

const Wrapper = styled.div`
`

const Head = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 0px;
  @media (max-width: 480px) {
    font-size: 24px;
  }
`

const Subhead = styled.h4`
  font-size: 24px;
  font-weight: bold;
  margin-top: 0px;
  color: rgba(0,178,180,1);
  @media (max-width: 480px) {
    font-size: 16px;
  }
`

const Article = styled.div`
  font-size: 20px;
  margin: 40px 0px;
  @media (max-width: 480px){
    font-size: 16px;
    margin-top: 15px;
  }
`

const ButtonRow = styled.div`
  margin: 15px 0px;
  height: 20px;
`

const SuccessMessage = styled.em`
  font-size: 14px;
  margin-left: 25px;
  position: relative;
  top: 50%;
  color: rgba(0,178,180,1);
  transition: 0.2s;
  opacity: ${props=> props.saved ? 1 : 0};
  @media (max-width: 480px) {
    font-size: 10px;
  }
`

const ContactPage = React.createClass({
  getInitialState() {
    return {
      user: {},
      head: "Hi there!",
      username: '',
      email: '',
      tel: '',
      saved: false
    }
  },

  componentDidMount(){
    api.getUser()
    .then(user => {
      this.user = user
      this.setState({
        head: 'Hello ' + user.display + '!',
        user,
        username: user.display,
        email: '',
        tel: '',
      })
    })
  },

  sendMessage() {
    const {username, email, tel} = this.state
    if (username && email) {
      console.log(this.state)

      this.setState({
        username: '',
        email: '',
        tel: '',
        saved: true
      })
    } else {
      console.log('Please enter require value')

      this.setState({
        saved: false
      })
    }
  },

  resestMessage() {
    this.setState({
      username: '',
      email: '',
      tel: '',
      saved: false
    })
  },

  handleChangeUsername() {
    const username = this.refs.username.getValue()
    this.setState({username})
  },
  handleChangeEmail() {
    const email = this.refs.email.getValue()
    this.setState({email})
  },
  handleChangeTel() {
    const tel = this.refs.tel.getValue()
    this.setState({tel})
  },

  render() {
    let {user, head, username, email, tel, saved} = this.state

    const floatingLabelText = (text) => {
      return (
        <span>
          <span style={{
            color: 'red',
            marginRight: '5px'
          }}>*</span>
          {text}
        </span>
      )
    }

    const textStyle = {
      fontSize: '18px',
      '@media screen and (maxWidth: 480px)': {
        fontSize: '14px'
      }
    }

    return (
      <AboutContainer>
        <Wrapper>
          <Head className='title-font'>{head}</Head>
          <Subhead className='title-font'>What do you want to contact us about?</Subhead>
          <SecondaryButton label='Website has problems' labelStyle={{textTransform:'none'}} />
          <Article className='content-font'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas enim quae atque quo, consectetur? At dolor inventore officia alias sapiente dolores, eum amet esse quisquam eligendi, molestiae quaerat deleniti. Molestiae.</Article>
          <textarea name="" id="" cols="60" rows="10"></textarea>
          <TextField
            ref='username'
            value={username}
            defaultValue={username}
            onChange={this.handleChangeUsername}
            className='content-font'
            hintText="Your name"
            hintStyle={textStyle}
            floatingLabelText={floatingLabelText('Contact by')}
            floatingLabelStyle={textStyle}
            floatingLabelFixed={true}
            inputStyle={textStyle}
          /><br />
          <TextField
            ref='email'
            value={email}
            defaultValue={email}
            onChange={this.handleChangeEmail}
            className='content-font'
            hintText="Email"
            hintStyle={textStyle}
            floatingLabelText={floatingLabelText('Contact email')}
            floatingLabelStyle={textStyle}
            floatingLabelFixed={true}
            inputStyle={textStyle}
          /><br />
          <TextField
            ref='tel'
            value={tel}
            defaultValue={tel}
            onChange={this.handleChangeTel}
            className='content-font'
            hintText="Mobile Number"
            hintStyle={textStyle}
            floatingLabelText="Contact Phone"
            floatingLabelStyle={textStyle}
            floatingLabelFixed={true}
            inputStyle={textStyle}
          /><br />
          <ButtonRow>
            <PrimaryButton label='Save' style={{float: 'left'}} buttonStyle='Flat' onClick={this.sendMessage} />
            <SecondaryButton label='Reset' style={{float: 'left', marginLeft: '25px'}} onClick={this.resestMessage}/>
            <SuccessMessage saved={saved}>Saved successfully</SuccessMessage>
          </ButtonRow>
        </Wrapper>
      </AboutContainer>
    )
  }
})

export default ContactPage;
