import React from 'react'
import styled from 'styled-components'
import {GraphDashboard, TopRank} from 'components'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import {Link} from 'react-router'
import api from 'components/api'

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
  border-top: 1px solid #E2E2E2;
  border-bottom: 1px solid #E2E2E2;
`

const TopHeader = styled.div`
  font-weight: bold;
  font-size: 18px;
`

const ButtonWrapper = styled.div`
  width: 100%;
`

const styles = {
  button: {
    display: 'block',
    width: '309px',
    height: '39px',
    margin: '20px auto 10px',
    borderRadius: '20px'
  },
  labelButton: {
    color: '#8F8F8F',
    textTransform: 'none',
    fontFamily: "'PT Sans', 'cs_prajad', sans-serif"
  }
}

const PublisherDashboardPage = React.createClass({
	getInitialState() {
		return {
    }
	},

  ShowAllButton(label, to) {
    return (
      <Link to={to} style={{width:'100px'}}>
        <FlatButton
          label={label}
          labelStyle={styles.labelButton}
          style={styles.button}
          backgroundColor="#F4F4F4"
          hoverColor="#E0E0E0"
        />
      </Link>
    )
  },

  render() {
    return (
      <Container>
        <Header>
          <Title>Overview</Title>
        </Header>
        <SubContainer>
          <GraphDashboard width={800} />
        </SubContainer>
        <GraphGap/>

        <SubContainer>
          <TopHeader className="sans-font">Top Stories</TopHeader>
          <TopRank/>
          {this.ShowAllButton('Show All Top Stories', '/editor/stories')}
        </SubContainer>
        <Divider/>

        <SubContainer>
          <TopHeader className="sans-font">Top Columns</TopHeader>
          <TopRank/>
          {this.ShowAllButton('Show All Top Columns', '/editor/columns')}
        </SubContainer>
        <Divider/>

        <SubContainer>
          <TopHeader className="sans-font">Top Writers</TopHeader>
          <TopRank/>
          {this.ShowAllButton('Show All Top Columns', '/editor/writers')}
        </SubContainer>
      </Container>
    )
  }
})

export default PublisherDashboardPage;
