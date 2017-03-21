import React from 'react'
import styled from 'styled-components'
import {AboutContainer, PrimaryButton, SecondaryButton} from 'components'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import auth from 'components/auth'
import api from 'components/api'

const Wrapper = styled.div`
`

const Dropdown = styled.div`
  display: inline-block;
  height: 50px;
`

const DropdownContent = styled.div`
  display: ${props => props.dropdown ? 'block' : 'none'}
  position: absolute;
  margin: 5px;
  padding: 0px;
  border: 2px solid rgba(0,178,180,1);
  background: white;
  z-index: 1;
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
      message: {},
      problems: [],
      saved: false,
      dropdown: false
    }
  },

  componentDidMount(){
    this.state.problems = ['problem 1', 'problem 2', 'problem 3', 'problem 4']

    api.getUser(null, auth.getToken())
    .then(user => {
      this.setState({
        user,
        head: 'Hello ' + user.display + '!',
        message: {
          username: user.display,
          email: user.email,
          tel: '',
          problem: this.state.problems[0],
          textarea: ''
        }
      })
    })
  },

  sendMessage() {
    const {username, email, tel, problem, textarea} = this.state.message
    if (username && email && problem) {
      console.log(this.state.message)

      this.setState({
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
    const problem = this.state.message.problem

    this.setState({
      message: {
        username: '',
        email: '',
        tel: '',
        problem,
        textarea: ''
      },
      saved: false
    })
  },

  selectProblem(problem) {
    const message = this.state.message

    this.setState({
      message: {
        ...message,
        problem
      },
      dropdown: false
    })
  },

  openDropdown() {
    this.setState({
      dropdown: true
    })
  },
  closeDropdown() {
    this.setState({
      dropdown: false
    })
  },

  handleChangeUsername() {
    const username = this.refs.username.getValue()
    const message = this.state.message

    this.setState({
      message: {
        ...message,
        username
      }
    })
  },
  handleChangeEmail() {
    const email = this.refs.email.getValue()
    const message = this.state.message

    this.setState({
      message: {
        ...message,
        email
      }
    })
  },
  handleChangeTel() {
    const tel = this.refs.tel.getValue()
    const message = this.state.message

    this.setState({
      message: {
        ...message,
        tel
      }
    })
  },
  handleChangeTextarea(event) {
    const message = this.state.message

    this.setState({
      message: {
        ...message,
        textarea: event.target.value
      }
    })
  },

  render() {
    let {user, head, message, problems, saved, dropdown} = this.state
    let {username, email, tel, problem, textarea} = this.state.message

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

    const problemSelect = (
      <span>{problem}
        <FontIcon className="material-icons" style={{color: '#00B2B4', float: 'right', padding: '8px 8px 0px 0px', marginLeft: '-8px'}}>
          keyboard_arrow_down
        </FontIcon>
      </span>
    )

    let button = []
    for (let i = 0; i < problems.length; i++){
      button.push(
        <FlatButton
          key={i}
          label={problems[i]}
          labelStyle={{fontWeight: 'bold', fontSize: '15px', color: '#00B2B4', fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
          style={{width: '385px', textAlign: 'left', display: 'inline-block'}}
          onTouchTap={() => this.selectProblem(problems[i])}
        />
      )
      button.push(<br/>)
    }

    return (
      <AboutContainer>
        <Wrapper>
          <Head className='title-font'>{head}</Head>
          <Subhead className='title-font'>What do you want to contact us about?</Subhead>
          <Dropdown onMouseOver={this.openDropdown} onMouseLeave={this.closeDropdown}>
            <SecondaryButton
              label={problemSelect}
              labelStyle={{textTransform:'none'}}
              style={{width: '400px'}}
              buttonStyle={{textAlign: 'left'}}
            />
            <DropdownContent dropdown={dropdown}>
              {button}
            </DropdownContent>
          </Dropdown>
          <Article className='content-font' style={{marginTop: '25px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas enim quae atque quo, consectetur? At dolor inventore officia alias sapiente dolores, eum amet esse quisquam eligendi, molestiae quaerat deleniti. Molestiae.</Article>
          <textarea
            cols="60" rows="10"
            ref='textarea'
            value={textarea}
            onChange={this.handleChangeTextarea}
          ></textarea>
          <TextField
            ref='username'
            value={username}
            onChange={this.handleChangeUsername}
            className='content-font'
            hintText={username ? '' : 'Your name'}
            hintStyle={textStyle}
            floatingLabelText={floatingLabelText('Contact by')}
            floatingLabelStyle={textStyle}
            floatingLabelFixed={true}
            inputStyle={textStyle}
          /><br />
          <TextField
            ref='email'
            value={email}
            onChange={this.handleChangeEmail}
            className='content-font'
            hintText={email ? '' : 'Email'}
            hintStyle={textStyle}
            floatingLabelText={floatingLabelText('Contact email')}
            floatingLabelStyle={textStyle}
            floatingLabelFixed={true}
            inputStyle={textStyle}
          /><br />
          <TextField
            ref='tel'
            value={tel}
            onChange={this.handleChangeTel}
            className='content-font'
            hintText={tel ? '' : 'Mobile Number'}
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
