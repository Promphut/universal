import React from 'react'
import styled from 'styled-components'
import { TopBarWithNavigation, OverlayImg, PublisherProfileSetting,
   PublisherPublishingSetting,PublisherAnalyticSetting,PublisherThemeSetting } from 'components'

const Container = styled.div`
  width:100%;
`


const PublisherSettingPage = React.createClass({
	getInitialState(){
    this.publisher = this.props.params.publisher
		return {}
	},

  componentDidMount(){

  },

  render(){
		return (
      <Container>
        <PublisherProfileSetting data={this.publisher}/>
        <PublisherPublishingSetting data={this.publisher}/>
        <PublisherAnalyticSetting data={this.publisher}/>
        <PublisherThemeSetting data={this.publisher}/>
      </Container>
		  )
	}
});

export default PublisherSettingPage;