import React from 'react';
import PropTypes from 'prop-types';
import {
  TrendingSideBar,
  TopBarWithNavigation,
  ArticleBox,
  BGImg,
  Footer,
  StaffPickSideBar,
  TopHome,
  TopVideoHome,
  TopNewsHome,
  LogoLink,
  BackToTop,
  BgWithLogo,
  Stick,
  SeeMore,
  HighlightHome
} from '../../../components';
import styled from 'styled-components';
import api from '../../../services/api';
import slider from 'react-slick';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import FontIcon from 'material-ui/FontIcon';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import utils from '../../../services/utils';
import isEmpty from 'lodash/isEmpty';
import config from '../../../config';

const Wrapper = styled.div`
	@media (max-width:480px) {
		max-width: 100%;
		width:100%;
  }
`;

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding: 100px 0 0 0;
	min-height: calc(100vh - ${props => (props.isMobile ? '261px' : '261px')});

	@media (max-width:480px) {
		padding: 16px 0 0 0;
  }
	@media (min-width: 768px) and (max-width: 992px) {
		padding: 80px 0 0 0;
  }

`;

const Main = styled.div`
	flex: 3 780px;
	max-width: 780px;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		padding:0 16px 0 16px;
  }
	@media (min-width: 768px) and (max-width: 992px) {
    flex: 3 720px;
		max-width: 720px;
  }
`;
const Feed = styled.div`
	flex: 12 1120px;
	max-width: 1120px;
	display:flex;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
  }
`;

const Aside = styled.div`
	flex: 1 300px;
	max-width: 300px;
	margin-left:60px;
	z-index: 9;
	@media (max-width: 1160px) {
		display:none;
	}
`;
const Text = styled.div`
	color:#8F8F8F;
	font-size:19px;
`;
const Dash = styled.div`
  margin:5px 0 0 0;
  width:30px;
  height:4px;
  background-color:${props => props.theme.accentColor};
  @media (max-width:480px) {
    width:20px;
  }
`;

const TextLine = styled.div`
  color:${props => props.theme.primaryColor};
  font-size:28px;
  font-weight:bold;
  @media (max-width:480px) {
    font-size:14px;
  }
`;
const Onload = styled.div`
	width:100%;
	height:70px;
	margin:50px 0 50px 0;
`;

const MiniBoxDark = styled.div`
	flex:1;
	height:222px;
	background-color:${props => props.theme.primaryColor};
	display:flex;
  align-items: center;
  justify-content: center;
`;
const Line = styled.div`
  position:relative;
  top:-2px;
  z-index:-5;
  width:100%;
  height:1px;
  background-color:#C4C4C4;
`;
const BG = styled(BGImg)`
	width:100%;
	height:350px;
	display:flex !important;
	align-items:center !important;
	justify-content:center !important;
`;
const Tagline = styled.div`
	font-size:20px;
	margin:0 auto 0 auto;
	width:600px;
	text-align:center;
  color:white;
  @media (max-width:480px) {
    font-size:14px;
  }
`;
const Img = styled.img`
	width:749px;
	height:100px;
`;
const ImgGif = styled.img`
	width:849px;
	height:200px;
`;

const SeemoreContainer = styled.div`
	margin-top: 26px;
	width: 100%;
	display: flex;
	justify-content: center;
	@media (max-width:480px) {
		margin-bottom: 26px;
		padding-bottom:26px;
  }
`;

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  tabs: {
    background: 'none',
    height: '60px',
    color: '#222222',
  },
  tab: {
    fontFamily: "'Nunito', 'Mitr'",
    fontSize: '20px',
    fontWeight: 'bold',
    textTransform: 'none',
  },
};

class HomePage extends React.Component {
  static contextTypes = {
    setting: PropTypes.object,
  };

  state = {
    isMobile: false,
    completed: 0,
    selectTab: 0,

    page: 0,
    feedCount: 1,
    feed: [],
    hasMoreFeed: true,
    animate: false,
  };

  constructor(props) {
    super(props);

    this.publisher = {
      cover: {},
    };
    this.writer = [];
    this.column = [];
  }

  FEED_LIMIT = utils.isMobile() ? config.FEED_LIMIT_MOBILE : config.FEED_LIMIT;

  onload = () => (
    <Onload>
      <div className="row">
        <CircularProgress
          size={60}
          thickness={6}
          style={{ width: '60px', margin: '0 auto 0 auto' }}
        />
      </div>
    </Onload>
  );
  reloadFeed = () => {
    this.setState(
      {
        page: 0,
        feedCount: 1,
        feed: [],
        hasMoreFeed: true,
      },
      () => {
        this.loadFeed(this.state.tag._id)();
      },
    );
  };
  loadFeed = () => () => {
    // console.log('LOAD FEED0', tagId, this.loading)
    // ensure this method is called only once at a time
    if (this.loading === true) return;
    this.loading = true;
    // console.log('LOAD FEED1')

    let page = this.state.page;
    // console.log('page', page)

    api.getFeed('stories', { status: 1 }, 'latest', null, page, this.FEED_LIMIT).then((result) => {
      let feed = this.state.feed.concat(result.feed);
      this.setState(
        {
          page: ++page,
          feed,
          feedCount: result.count['1'] ? result.count['1'] : 0,
          hasMoreFeed: feed.length < this.FEED_LIMIT ? false : page < 2,
        },
        () => {
          this.loading = false;
        },
      );
    });
  };
  handleChangeTab = (e) => {
    this.setState({ selectTab: e });
  };

  componentDidMount() {
    this.setState({
      isMobile: utils.isMobile(),
      completed: 100,
    });
  }
  componentWillUnmount() {

  }

  render() {
    let { isMobile, completed, selectTab } = this.state;
    let { feedCount, feed, hasMoreFeed, animate } = this.state;
    let pub = this.context.setting.publisher;
    let { theme } = this.context.setting.publisher;

    return (
      <Wrapper>
        {!isEmpty(pub) && !utils.isMobile() && <BgWithLogo data={pub} />}

        <TopBarWithNavigation onLoading={this.props.onLoading} />

        {/* {!isMobile&&<HighlightHome/>} */}
        {isMobile&&<TopHome />}

        {/* <TopVideoHome className='hidden-mob'></TopVideoHome> */}
        <Content isMobile={isMobile}>
          <Main>
            <TextLine className="sans-font">LATEST</TextLine>
            <Dash style={{ margin: '5px 0 0 0' }} />
              <InfiniteScroll
                loadMore={this.loadFeed()}
                hasMore={hasMoreFeed}
                loader={this.onload()}
              >
                <div>
                  {feed.length != 0 &&
                    feed.map((item, index) => (
                      <ArticleBox final={index == feed.length - 1} detail={item} key={index} />
                    ))}
                </div>
              </InfiniteScroll>

            {!hasMoreFeed &&
              <SeemoreContainer>
                <SeeMore url={'/stories/all?type=stories&sort=latest&page=1'} />
              </SeemoreContainer>}

            {/* <Tabs
              style={{ width: '100%' }}
              tabItemContainerStyle={{ ...styles.tabs }}
              inkBarStyle={{ background: theme.accentColor, height: 3 }}
              onChange={this.handleChangeTab}
              value={selectTab}
              className="hidden-des"
            >
              <Tab
                buttonStyle={{
                  ...styles.tab,
                  color: selectTab == 0 ? '#222' : '#c4c4c4',
                }}
                label="Stories"
                value={0}
              />
              <Tab
                buttonStyle={{
                  ...styles.tab,
                  color: selectTab == 1 ? '#222' : '#c4c4c4',
                }}
                label="News"
                value={1}
              />

            </Tabs> */}

            {/* <Line /> */}

            {/* {utils.isMobile() &&
              <SwipeableViews
                index={selectTab}
                animateHeight
                disableLazyLoading
                style={{ overflow: 'hidden' }}
                onChangeIndex={this.handleChangeTab}
                className="hidden-des"
              >

                <div>
                  <InfiniteScroll
                    loadMore={this.loadFeed()}
                    hasMore={hasMoreFeed}
                    loader={this.onload()}
                  >
                    <div>
                      {feed.length != 0 &&
                        feed.map((item, index) => (
                          <ArticleBox final={index == feed.length - 1} detail={item} key={index} />
                        ))}
                    </div>
                  </InfiniteScroll>

                  {!hasMoreFeed &&
                    <SeemoreContainer>
                      <SeeMore url={'/stories/all?type=article&sort=latest&page=1'} />
                    </SeemoreContainer>}
                </div>

                <div className="news">
                  <TopNewsHome />
                </div>

              </SwipeableViews>} */}
          </Main>
          <Aside>
            {/* <Stick topOffset={100}> */}
              <TrendingSideBar/>
              <div
                dangerouslySetInnerHTML={{
                  __html: `<div class="fb-page" data-href="https://www.facebook.com/${config.FACEBOOK}/" data-height="400" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/${config.FACEBOOK}/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/${config.FACEBOOK}/">${config.NAME}</a></blockquote></div>`,
                }}
              />
            {/* </Stick> */}
            {/* <StaffPickSideBar></StaffPickSideBar>
						<TopNewsHome/> */}
          </Aside>
        </Content>

        <BackToTop scrollStepInPx="800" delayInMs="16.66" showOnTop="1800" />
        <Footer />
      </Wrapper>
    );
  }
}

export default HomePage;
