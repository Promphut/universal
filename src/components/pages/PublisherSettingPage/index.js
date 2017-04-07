import React from 'react'
import styled from 'styled-components'
import { OverlayImg, PublisherProfileSetting,
   PublisherPublishingSetting,PublisherAnalyticSetting,PublisherThemeSetting } from 'components'
import auth from 'components/auth'
import api from 'components/api'
//import Request from 'superagent'

const Container = styled.div`
  width:100%;
`
const PublisherSettingPage = React.createClass({
	getInitialState(){
		return {
      publisher: {}
    }
	},

  componentDidMount(){
    api.getPublisher(auth.getToken())
    .then(pub => {
      this.setState({publisher:pub})
    })
  },

  render(){
    let {publisher} = this.state

		return (
      <Container>
        <PublisherProfileSetting publisher={publisher} />
        <PublisherPublishingSetting />
        <PublisherAnalyticSetting analytic={publisher.analytic} />
        <PublisherThemeSetting />
      </Container>
	  )
	}
});

export default PublisherSettingPage;
