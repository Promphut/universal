import React from 'react'
import styled from 'styled-components'
import { OverlayImg, PublisherProfileSetting, PublisherPublishingSetting, PublisherThemeSetting } from 'components'
import auth from 'components/auth'
import api from 'components/api'

const Container = styled.div`
  width:100%;
`

class PublisherSettingPage extends React.Component {
  state = {
    publisher: {}
  }

  componentDidMount(){
    api.getPublisher(auth.getToken())
    .then(pub => {
      this.setState({publisher:pub})
    })
  }

  render(){
    let {publisher} = this.state

    return (
      <Container>
        <PublisherProfileSetting publisher={publisher} />
        <PublisherPublishingSetting />
        <PublisherThemeSetting />
      </Container>
    )
  }
}

export default PublisherSettingPage;
