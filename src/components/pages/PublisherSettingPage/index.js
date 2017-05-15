import React from 'react'
import styled from 'styled-components'
import { OverlayImg, PublisherProfileSetting,
   PublisherPublishingSetting,PublisherAnalyticSetting,PublisherThemeSetting } from 'components'
import auth from 'components/auth'
import api from 'components/api'
import { Tabs, Tab } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views';
//import Request from 'superagent'

const Container = styled.div`
  width:100%;
`
const Line = styled.div`
  position:relative;
  top:-2px;
  z-index:0;
  width:390px;
  height:1px;
  margin-left:20px;
  background-color:#C4C4C4;
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
const PublisherSettingPage = React.createClass({
	getInitialState(){
		return {
      publisher: {},
      selectTab:0
    }
	},

  componentDidMount(){
    api.getPublisher(auth.getToken())
    .then(pub => {
      this.setState({publisher:pub})
    })
  },

  handleChangeTab(e) {
		this.setState({selectTab: e})
	},

  render(){
    let {publisher,selectTab} = this.state
    var {theme} = this.context.setting.publisher
    const styles = {
      headline: {
				fontSize: 24,
				paddingTop: 16,
				marginBottom: 12,
				fontWeight: 400
			},
			tabs: {
				background: 'none',
				height: '50px',
				color: '#222222'
			},
			tab: {
				fontFamily: "'Nunito', 'Mitr'",
				fontSize: '16px',
				fontWeight: 'bold',
				textTransform: 'none'
			}
    }
		return (
      <Container>
        <Header>
          <Title>Settings</Title>
        </Header>
        <Tabs
          style={{ width: 390,margin:'20px',marginBottom:'0'}}
          tabItemContainerStyle={{ ...styles.tabs }}
          inkBarStyle={{ background: theme.accentColor, height: 3,zIndex:2 }}
          onChange={this.handleChangeTab}
          value={selectTab}>
          <Tab
            buttonStyle={{...styles.tab,color: selectTab == 0 ? theme.accentColor : '#C4C4C4'}}
            label={'Profile'}
            value={0}
          />
          <Tab
            buttonStyle={{...styles.tab,color: selectTab == 1 ? theme.accentColor : '#C4C4C4'}}
            label={'Publishing'}
            value={1}
          />
          <Tab
            buttonStyle={{...styles.tab,color: selectTab == 2 ? theme.accentColor : '#C4C4C4'}}
            label={'Theme'}
            value={2}
          />
        </Tabs>
        <Line/>
        <SwipeableViews
          index={selectTab}
          onChangeIndex={this.handleChangeTab}
        >
          <div>
            <PublisherProfileSetting publisher={publisher} />
          </div>
          <div>
            <PublisherPublishingSetting />
          </div>
          <div>
            <PublisherThemeSetting />
          </div>
        </SwipeableViews>
        {/*<PublisherAnalyticSetting analytic={publisher.analytic} />*/}
      </Container>
	  )
	}
});
PublisherSettingPage.contextTypes = {
	setting: React.PropTypes.object
};
export default PublisherSettingPage;
