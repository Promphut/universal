import React from 'react'
import styled from 'styled-components'
import {GraphDashboard} from 'components'

const Container = styled.div`
`

const SubContainer = styled.div`
	padding: 32px
`

const Header = styled.div`
	margin: 0;
	padding: 0;
  height: 80px;
	width: 100%;
  background: #F4F4F4;
  display: flex;
`

const Title = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  font-family: 'Nunito', 'Mitr';
  font-size: 22px;
  font-weight: bold;
  padding-left: 32px;
`

const GraphGap = styled.div`
  height: 30px;
  background: #F4F4F4;
  border-top: 2px solid #E2E2E2;
  border-bottom: 2px solid #E2E2E2;
`

const TopHeader = styled.div`
  font-weight: bold;
  font-size: 18px;
`

const PublisherDashboardPage = React.createClass({
	getInitialState() {
		return {
    }
	},

  render() {
    return (
      <Container>
        <Header>
          <Title>Overview</Title>
        </Header>
        <SubContainer>
          <GraphDashboard/>
        </SubContainer>
        <GraphGap/>
        <SubContainer>
          <TopHeader className="sans-font">Top Stories</TopHeader>
        </SubContainer>
      </Container>
    )
  }
})

export default PublisherDashboardPage;
