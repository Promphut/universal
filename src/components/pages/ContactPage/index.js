import React from 'react'
import styled from 'styled-components'
import {AboutContainer, PrimaryButton, SecondaryButton} from 'components'
import TextField from 'material-ui/TextField';

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
    font-size: 16p
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

const ContactPage = React.createClass({
  getInitialState() {
    return {
      head: "Hi there!"
    }
  },

  render() {
    let {head} = this.state
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
    const hintStyle = {
      fontSize: '20px',
      '@media screen and (max-width: 480px)': {
        fontSize: '16px'
      }
    }
    const floatingLabelStyle = {
      fontSize: '18px',
      '@media screen and (max-width: 480px)': {
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
            hintText="Your name"
            hintStyle={hintStyle}
            floatingLabelText={floatingLabelText('Contact by')}
            floatingLabelStyle={floatingLabelStyle}
            floatingLabelFixed={true}
          /><br />
          <TextField
            hintText="Email"
            hintStyle={hintStyle}
            floatingLabelText={floatingLabelText('Contact email')}
            floatingLabelStyle={floatingLabelStyle}
            floatingLabelFixed={true}
          /><br />
          <TextField
            hintText="Mobile Number"
            hintStyle={hintStyle}
            floatingLabelText="Contact Phone"
            floatingLabelStyle={floatingLabelStyle}
            floatingLabelFixed={true}
          /><br />
        <PrimaryButton label='Save' buttonStyle='Flat' />
          <SecondaryButton label='Reset' style={{margin: '15px'}}/>
        </Wrapper>
      </AboutContainer>
    )
  }
})

export default ContactPage;
