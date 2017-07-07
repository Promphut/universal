import React from 'react';
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import { Tabs, Tab } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import {Footer, TopBarWithNavigation, SearchResultBox, Pagination, BackToTop} from 'components'
import api from '../../../services/api'
import utils from '../../../services/utils'
import config from '../../../config'
import isEmpty from 'lodash/isEmpty'
import split from 'lodash/split'

const Wrapper = styled.div`
	@media (max-width:480px) {
		max-width: 100%;
		width:100%;
  }
`

const ContentWrapper = styled.div`
  position: relative;
  top: 116px;
  padding-bottom: 70px;
`

const Content = styled.div`
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
	padding-top: 30px;
	padding-left: 10%;
	padding-right: 10%;
	min-height: calc(100vh - ${props => (props.isMobile ? '261px' : '261px')});

	@media (max-width:480px) {
		padding: 0 0 0 0;
  }

`

const Main = styled.div`
	flex: 3 780px;
	max-width: 780px;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		padding:0 16px 0 16px;
  }

	.hidden-des-flex {
		display: none !important;
		@media (max-width: 480px) {
			display: flex !important;
	  }
	}
`

const Aside = styled.div`
	//max-width: 255px;
	flex: 1 300px;
	max-width: 300px;
	margin-left:60px;
	z-index: 9;
	@media (max-width: 1160px) {
		display:none;
	}
`

const Feed = styled.div`
	flex: 1;
	display:flex;
	margin-top: 70px;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
		margin-top: -160px;
  }
`

const FilterContainer = styled.ul `
  list-style-type: none;
  margin-top: 40px;
  margin-bottom: 32px;
  padding-left: 0px;
`

const FilterItem = styled.li `
  display: inline;
  margin-left: 0px;
  margin-right: 20px;
  background-color: ${props => props.select == true ? props.theme.accentColor : 'rgba(0,0,0,0)'};
  border-radius: 100px;
  color: ${props => props.select ? 'white' : '#222'};
  padding-top: 9px;
  padding-bottom: 9px;
  padding-left: 25px;
  padding-right: 25px;
  text-align: center;

  &:hover {
    background-color: ${props => !props.select && props.theme.secondaryColor};
  }
`

const PaginationContainer = styled.div `
	display: flex;
	justify-content: center;
	margin-top: 20px;
`

export default class SearchResultPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      keyword: utils.querystring('keyword',this.props.location) || '',
      type: this.props.type || '',
			throttle: 200,
      result: null,
			isLoading: true,
			currentPage: utils.querystring('page',this.props.location) ? utils.querystring('page',this.props.location) - 1 : 0,
			totalPages: 0,
    }
  }

	componentWillMount () {
			this.setState({
				keyword: utils.querystring('keyword',this.props.location) ? utils.querystring('keyword',this.props.location) : '',
				type: this.props.match.params.type,
			})
	}

	componentDidMount () {
		this.fetchResult(this.state.keyword, this.state.type)
	}

	componentWillReceiveProps (nextProps) {
		if(nextProps.match.params.type != this.props.match.params.type ){
			this.setState({
				type: nextProps.match.params.type
			},this.fetchResult(this.state.keyword,nextProps.match.params.type))
		}
	}

  fetchResult = (keyword, type) => {
		if(!isEmpty(keyword)){
		  api.getStoryFromKeyword(keyword, type, this.state.currentPage)
		  .then(result => {
		    this.setState({
		      result: result.stories,
					isLoading: false,
					feedCount: result.count['total'] ? result.count['total'] : 0,
					totalPages: utils.getTotalPages(config.FEED_LIMIT, result.count['total']),
		    });
		  })
		}
		else {
			this.setState({
				isLoading: false,
				result: null,
			})
		}
  }

	changePage = (e) => {
			this.props.history.push({search: "?keyword=" + this.state.keyword + "&page=" + e})
			document.body.scrollTop = document.documentElement.scrollTop = 0
			this.setState({ currentPage: e - 1}, () => {
					this.fetchResult(this.state.keyword, this.state.type)
			})
	}

  handleKeywordChange = (e) => {
		this.setState({keyword: e.target.value}, () => {
			if (this._throttleTimeout) clearTimeout(this._throttleTimeout)

			this._throttleTimeout = setTimeout (
				() => this.fetchResult(this.state.keyword, this.state.type), this.props.throttle
			)
		})
  }

  render() {
		let { isMobile, completed, totalPages, currentPage, loading, feedCount, keyword, type, result, isLoading} = this.state
		return (
      <Wrapper>
        <TopBarWithNavigation/>
        <Content>

					<Feed isMobile={utils.isMobile()}><TextField id="search-box" hintText="ค้นหา" autoFocus={true} fullWidth={true} value={keyword} inputStyle={{fontSize:'28px'}} style={{fontFamily: "'Nunito', 'Mitr'"}} onChange={(e)=>this.handleKeywordChange(e)}/></Feed>

					<Main>
            <FilterContainer>
              <Link to={"/search/stories?keyword=" + keyword}><FilterItem select={type === 'stories'}>STORIES</FilterItem></Link>
              <Link to={"/search/news?keyword=" + keyword}><FilterItem select={type === 'news'}>NEWS</FilterItem></Link>
              {/* <Link to={"/search/video/" + this.state.keyword}><FilterItem select={this.state.type === 'video'}>VIDEO</FilterItem></Link> */}
            </FilterContainer>

            <SearchResultBox type={type} result={result} isLoading={isLoading}/>
						{totalPages > 0 && ((totalPages > currentPage && currentPage >= 0) ?

						<PaginationContainer>
							<Pagination
								currentPage={currentPage + 1}
								totalPages={totalPages}
								onChange={this.changePage}
							/>
						</PaginationContainer> :

							<div></div>)}
          </Main>

					{/*<Aside></Aside>*/}

        </Content>

				<BackToTop scrollStepInPx="200" delayInMs="16.66" showOnTop="600" />
        <Footer />
      </Wrapper>
    )
  }
}
