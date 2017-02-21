import React from 'react'
import { TopBarWithNavigation, OverlayImg, PublisherProfileSetting,
   PublisherPublishingSetting,PublisherAnalyticSetting,PublisherThemeSetting } from 'components'

import styled from 'styled-components'

const Container = styled.div`
  width:100%;
`


const PublisherSettingPage = React.createClass({
	getInitialState(){
		return {}
	},

  render(){
		return (
      <Container>
        <PublisherProfileSetting/>
        <PublisherPublishingSetting/>
        <PublisherAnalyticSetting/>
        <PublisherThemeSetting />
      </Container>
		  )
	}
});

export default PublisherSettingPage;