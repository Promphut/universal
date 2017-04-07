import React from 'react'
import styled from 'styled-components'
import {PublisherInsightView, PublisherInsightTrend, PublisherInsightShare,
	PublisherInsightGrowth} from 'components'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views';

const Container = styled.div`
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

const Item = styled.div`
	padding: 32px
`

const styles = {
  tabs: {
    background: 'none',
    height: '76.5px'
  },
  tab: {
    fontFamily:"'Nunito', 'Mitr'",
    color: '#222222',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'none'
  }
}

const PublisherInsight = React.createClass({
	getInitialState() {
		return {
      slideIndex: 0
    }
	},

  handleChange(value) {
    this.setState({
      slideIndex: value
    })
  },

  render() {
		const {theme} = this.context.setting.publisher
		const {title} = this.props

    return (
      <Container>
        <Header>
          <Title>
            {title}
          </Title>
          <Tabs style={{flex:'1', paddingRight:'32px'}}
            tabItemContainerStyle={styles.tabs}
            inkBarStyle={{background:theme.accentColor, height:'5px'}}
            onChange={this.handleChange}
            value={this.state.slideIndex}
          >
            <Tab buttonStyle={styles.tab} label="View" value={0} />
            <Tab buttonStyle={styles.tab} label="Trend" value={1} />
            <Tab buttonStyle={styles.tab} label="Share" value={2} />
            <Tab buttonStyle={styles.tab} label="Growth Score" value={3} />
          </Tabs>
        </Header>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <Item>
						<PublisherInsightView />
          </Item>
          <Item>
						<PublisherInsightTrend />
          </Item>
          <Item>
						<PublisherInsightShare />
          </Item>
					<Item>
						<PublisherInsightGrowth />
					</Item>
        </SwipeableViews>
      </Container>
    )
  }
})

PublisherInsight.contextTypes = {
	setting: React.PropTypes.object
}

export default PublisherInsight
