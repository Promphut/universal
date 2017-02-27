import React from 'react'
import { TopBarWithNavigation, OverlayImg, PublisherContact,PublisherAbout} from 'components'

import styled from 'styled-components'

const Container = styled.div`
  width:100%;
`


const PublisherContactAndAboutPage = React.createClass({
  
	getInitialState(){
  this.publisher = this.props.params.publisher
		return {}
	},

  render(){
		return (
      <Container>
        <PublisherContact data={this.publisher}/>
        <PublisherAbout data={this.publisher}/>
      </Container>
		  )
	}
});

export default PublisherContactAndAboutPage;