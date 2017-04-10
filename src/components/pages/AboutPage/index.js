import React from 'react'
import styled from 'styled-components'
import { ContactAndAboutContainer, ShareButton, TwtShareButton, FbShareButton } from 'components'
import api from 'components/api'

const Wrapper = styled.div`
`

const Head = styled.h1`
  font-size: 36px;
  font-Weight: bold;
  color: ${props=> props.theme.primaryColor};
  @media (max-width: 480px) {
    font-size: 24px;
  }
`

const Article = styled.div`
  font-size: 20px;
  margin-top: 40px;
  @media (max-width: 480px){
    font-size: 16px;
    margin-top: 15px;
  }
`

const HiddenMobile = styled.div`
  @media (max-width: 480px){
    display: none;
  }
`

const AboutPage = React.createClass({
  getInitialState(){
    return {
      aboutUs: ''
    }
  },

  componentDidMount(){
    api.getPublisherAboutUs()
    .then(aboutUs => {
      this.setState({
        aboutUs: aboutUs
      })
    })
  },

  render() {
    return (
      <ContactAndAboutContainer>
        <Wrapper>
          <Head className='title-font'>About Us</Head>
          <Article className='content-font' dangerouslySetInnerHTML={{__html:this.state.aboutUs}}></Article>
          <HiddenMobile>
            <FbShareButton button={<ShareButton className='fa fa-facebook' number='112' color='58,88,155'/>} />
            <TwtShareButton button={<ShareButton className='fa fa-twitter' number='118' color='96,170,222' style={{marginLeft: '15px'}}/>} />
          </HiddenMobile>
        </Wrapper>
      </ContactAndAboutContainer>
    )
  }
})

export default AboutPage;
