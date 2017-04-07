import React from 'react'
import styled from 'styled-components'
import {PublisherInsight} from 'components'

const Container = styled.div`
  width: 100%;
`

const PublisherInsightColumns = React.createClass({
  render() {
    return (
      <Container>
        <PublisherInsight title='Column Analytic'/>
      </Container>
    )
  }
})

export default PublisherInsightColumns
