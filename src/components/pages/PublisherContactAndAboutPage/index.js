import React from 'react'
import { TopBarWithNavigation, OverlayImg, PublisherContact,PublisherAbout} from 'components'

import styled from 'styled-components'

const Container = styled.div`
  width:100%;
`


const PublisherContactAndAboutPage = React.createClass({
  
	getInitialState(){
		return {}
	},

  render(){
		return (
      <Container>
        <PublisherContact />
        <PublisherAbout />
      </Container>
		  )
	}
});

export default PublisherContactAndAboutPage;