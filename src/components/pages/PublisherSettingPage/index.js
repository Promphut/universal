import React from 'react'
import styled from 'styled-components'
import { OverlayImg, PublisherProfileSetting,
   PublisherPublishingSetting,PublisherAnalyticSetting,PublisherThemeSetting } from 'components'
import auth from 'components/auth'
//import Request from 'superagent'

const Container = styled.div`
  width:100%;
`
const PublisherSettingPage = React.createClass({
	getInitialState(){
		return {

    }
	},

  componentDidMount(){

  },

  render(){
    //var {publisher} = this.state
		return (
      <Container>
        <PublisherProfileSetting />
        <PublisherPublishingSetting />
        <PublisherAnalyticSetting />
        <PublisherThemeSetting />
      </Container>
	  )
	}
});

export default PublisherSettingPage;