import React from 'react'
import styled from 'styled-components'
import {PublisherInsight} from 'components'

const Container = styled.div`
  width: 100%;
`

const PublisherInsightStories = React.createClass({
  render() {
    return (
      <Container>
        <PublisherInsight title='Story Analytic'/>
      </Container>
    )
  }
})

export default PublisherInsightStories
