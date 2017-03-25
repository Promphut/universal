import React from 'react'
import styled from 'styled-components'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import auth from 'components/auth'
import api from 'components/api'
import RichTextEditor from 'react-rte'
import {ContactAndAboutContainer, PrimaryButton, SecondaryButton} from 'components'

const Wrapper = styled.div`
`

const Dropdown = styled.div`
  display: inline-block;
  height: 50px;
`

const DropdownContent = styled.div`
  // visibility: ${props => props.dropdown ? 'visible' : 'hidden'};
  // opacity: ${props => props.dropdown ? '1' : '0'};
  // transition: ${props => props.dropdown ? '.2s' : '0s'};
  display: ${props => props.dropdown ? 'block' : 'none'};
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
      dropdown: false,
      error: {}
      // ,textarea: RichTextEditor.createEmptyValue()
    }
  },

  componentDidMount(){
    api.getPublisher(null)
    .then(pub => {
      pub.contactCats.forEach((val) => {
        this.state.problems.push(val.catName);
      })

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
      .catch(() => {
        this.setState({
          user: {},
          head: 'Hi there!',
          message: {
            username: '',
            email: '',
            tel: '',
            problem: this.state.problems[0],
            textarea: ''
          }
        })
      })
    })
  },

  sendMessage() {
    const {username, email, tel, problem, textarea} = this.state.message
    const contactCat = problem
    const contact = {
      name: username,
		  email,
		  tel,
		  detail: textarea
    }

    // if (username && email && problem) {
      api.sendContactEmail(contactCat, contact)
      .then(contact => {
        this.setState({
          saved: true
        })
      })
      .catch(err => {
        this.setState({
          saved: false,
          error: {
            username: err.errors.name ? err.errors.name.message : '',
            email: err.errors.email ? err.errors.email.message : '',
            textarea: err.errors.detail
          }
        })
      })
    // } else {
    //   //console.log('Please enter require value')
    //
    //   this.setState({
    //     saved: false
    //   })
    // }
  },

  resestMessage() {
    const problem = this.state.message.problem

    this.setState({
      message: {
        username: ';',
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
    const error = this.state.error

    this.setState({
      message: {
        ...message,
        username
      },
      error: {
        ...error,
        username: ''
      }
    })
  },
  handleChangeEmail() {
    const email = this.refs.email.getValue()
    const message = this.state.message
    const error = this.state.error

    this.setState({
      message: {
        ...message,
        email
      },
      error: {
        ...error,
        email: ''
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
    const error = this.state.error

    this.setState({
      message: {
        ...message,
        textarea: event.target.value
      },
      error: {
        ...error,
        textarea: ''
      }
    })
  },

  // onChange(value) {
  //   //console.log(value)
  //   this.setState({textarea : value});
  // },

  render() {
    let {user, head, message, problems, saved, dropdown, error} = this.state
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
        <div key={i}>
          <FlatButton
            label={problems[i]}
            labelStyle={{fontWeight: 'bold', fontSize: '15px', color: '#00B2B4', fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
            style={{width: '385px', textAlign: 'left', display: 'inline-block'}}
            onTouchTap={() => this.selectProblem(problems[i])}
          /><br/>
        </div>
      )
    }

    return (
      <ContactAndAboutContainer>
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
            style={{borderColor: error.textarea ? '#F44336' : '#A9A9A9'}}
          ></textarea>
          {/*<RichTextEditor
            value={this.state.textarea}
            onChange={this.onChange}
          />*/}
          <TextField
            ref='username'
            value={username ? username : ''}
            onChange={this.handleChangeUsername}
            className='content-font'
            hintText={username ? '' : 'Your name'}
            hintStyle={textStyle}
            floatingLabelText={floatingLabelText('Contact by')}
            floatingLabelStyle={textStyle}
            floatingLabelFixed={true}
            inputStyle={textStyle}
            errorText={error.username ? error.username : ''}
          /><br />
          <TextField
            ref='email'
            value={email ? email : ''}
            onChange={this.handleChangeEmail}
            className='content-font'
            hintText={email ? '' : 'Email'}
            hintStyle={textStyle}
            floatingLabelText={floatingLabelText('Contact email')}
            floatingLabelStyle={textStyle}
            floatingLabelFixed={true}
            inputStyle={textStyle}
            errorText={error.email ? error.email : ''}
          /><br />
          <TextField
            ref='tel'
            value={tel ? tel : ''}
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
      </ContactAndAboutContainer>
    )
  }
})

export default ContactPage;
