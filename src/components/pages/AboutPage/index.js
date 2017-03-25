import React from 'react'
import styled from 'styled-components'
import {ContactAndAboutContainer, ShareButton} from 'components'
import api from 'components/api'
const Wrapper = styled.div`
`

const Head = styled.h1`
  font-size: 36px;
  font-Weight: bold;
  color: rgba(0,178,180,1);
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

const AboutPage = React.createClass({

  render() {
    return (
      <ContactAndAboutContainer>
        <Wrapper>
          <Head className='title-font'>About Us</Head>
          <Article className='content-font'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas enim quae atque quo, consectetur? At dolor inventore officia alias sapiente dolores, eum amet esse quisquam eligendi, molestiae quaerat deleniti. Molestiae.</Article>
          <ShareButton className='fa fa-facebook' onClick={api.shareFB} number='112' color='58,88,155'/>
          <a href={config.TWT}><ShareButton className='fa fa-twitter' number='118' color='96,170,222' style={{marginLeft: '15px'}}/></a>
        </Wrapper>
      </ContactAndAboutContainer>
    )
  }
})

export default AboutPage;
