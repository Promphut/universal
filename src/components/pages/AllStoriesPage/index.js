import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import { Tabs, Tab } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import {Footer, TopBarWithNavigation, SearchResultBox, Pagination, ArticleBox, EmptyStory, BackToTop} from 'components'
import api from '../../../services/api'
import toUpper from 'lodash/toUpper'
import CircularProgress from 'material-ui/CircularProgress'
import utils from '../../../services/utils'
import config from '../../../config'

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
    flex-flow: row wrap;
    justify-content: center;
    padding: 116px 0 0 0;
    min-height: calc(100vh - ${props => (props.isMobile ? '261px' : '261px')});

    @media (max-width:480px) {
        padding: 0;
  	}
`

const Main = styled.div`
    ${'' /* flex: 3 825px; */}
    ${'' /* max-width: 825px; */}
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

const FilterContainer = styled.ul `
    list-style-type: none;
    margin-top: 40px;
    margin-bottom: 32px;
    padding-left: 0px;
`

const FilterItem = styled.li `
    display: inline;
	cursor: pointer;
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

const Onload = styled.div`
    width:100%;
    height:70px;
    margin:50px 0 50px 0;
`

const TextLine = styled.div`
    color:${props => props.theme.primaryColor};
    font-size:28px;
    font-weight:bold;
`

const Dash = styled.div`
    margin:5px 0 0 0;
    width:30px;
    height:4px;
    background-color:${props => props.theme.accentColor};
`

const Page = styled.div`
    display: flex;
        flex-flow: row wrap;
        justify-content: center;
    padding:20px 0 20px 0;
`

export default class AllStoriesPage extends React.Component {

  constructor(props) {
    super(props)

		this.state = {
			type: utils.querystring('type',this.props.location) ? utils.querystring('type',this.props.location) : 'article',
			sort: utils.querystring('sort',this.props.location) ? utils.querystring('sort',this.props.location) : 'latest',

			currentPage: utils.querystring('page',this.props.location) ? utils.querystring('page',this.props.location) - 1 : 0,
			feedCount: 1,
			feed: [],
			totalPages: 0,

			loading: false
		}

  	}

  	static contextTypes = {
		setting: PropTypes.object
	}

  	FEED_LIMIT = config.FEED_LIMIT

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
    )

	reloadFeed = () => {
		this.setState(
			{
				currentPage: utils.querystring('page',this.props.location) ? utils.querystring('page',this.props.location) - 1 : 0,
				feedCount: 1,
				feed: [],
				totalPages: 0,
			},
			() => {
				this.getAllFeed()
			}
		)
	}

	getAllFeed = () => {

		if (this.state.loading === true) return
			this.state.loading = true

		api.getFeed(this.state.type,{status : 1},this.state.sort,null,this.state.currentPage,this.FEED_LIMIT)
			.then(result => {
				this.setState(
					{
						feed: result.feed,
						feedCount: result.count['1'] ? result.count['1'] : 0,
						totalPages: utils.getTotalPages(this.FEED_LIMIT, result.count['total']),
					},
					() => {
						this.setState({loading:false})
					}
				)

			})
	}

    changePage = e => {
        this.props.history.push({ search: "?type=" + this.state.type  + "&sort="+ this.state.sort + "&page=" + e})
        this.setState({ currentPage: e - 1}, () => {
            this.getAllFeed()
        })
    }

    changeSort = sort => {
		if(sort != this.state.sort){
			this.props.history.push({ search: "?type=" + this.state.type  + "&sort="+ sort + "&page=" + 1})
			this.setState({ currentPage: 0, sort: sort}, () => {
				this.getAllFeed()
			})
		}
    }

    componentWillMount(){
        this.reloadFeed()
    }

    componentDidMount() {
        this.setState({
            isMobile: utils.isMobile(),
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.location.search != this.props.location.search){
            document.body.scrollTop = document.documentElement.scrollTop = 0
            this.setState({currentPage : utils.querystring('page',nextProps.location)-1}
                ,()=>{this.reloadFeed()
            })
        }
    }

    render() {
		let { theme } = this.context.setting.publisher
        let { isMobile, completed, totalPages, currentPage, loading, feed, feedCount} = this.state
        return (
        <Wrapper>
            <TopBarWithNavigation/>

            <Content isMobile={isMobile}>

                <Main>
                    <TextLine className="sans-font hidden-mob">{toUpper((this.state.type=='article') ? 'STORIES' : this.state.type)}</TextLine>
                    <Dash className="hidden-mob" style={{ margin: '5px 0 10px 0' }} />

                    <FilterContainer>
                        <FilterItem onClick={(e) => this.changeSort('latest')} select={this.state.sort === 'latest'}>LATEST</FilterItem>
                        <FilterItem onClick={(e) => this.changeSort('trending')} select={this.state.sort === 'trending'}>TRENDING</FilterItem>
                    </FilterContainer>

					{feedCount <= 0 ?
						<EmptyStory
							title="No Story, yet"
							description={
								<div>
									There are no stories in this publisher right now. Wanna back to
									<Link
										to="/"
										style={{
											color: theme.accentColor,
											padding: '0 0.5em 0 0.5em'
										}}>
										home
									</Link>
									?
								</div>
							}
						/>
						:
						<div>

							{loading ?  this.onload() :
								<div>
									{feed && currentPage >= 0 &&
										feed.map((item, index) => (
											<ArticleBox final={index == feed.length -1 ? true:false} detail={item} key={index} />
										))}
								</div>
							}

							<Page>
								{totalPages > 0 && ((totalPages > currentPage && currentPage >= 0) ?
									<Pagination
										currentPage={currentPage + 1}
										totalPages={totalPages}
										onChange={this.changePage}/>
									:
									<EmptyStory
										title="No More Story"
										description={
											<div>
												There are no more stories in this page. Go back to
												<Link
													to={"/stories/all?type=" + this.state.type  + "&sort="+ this.state.sort + "&page=1"}
													style={{
														color: theme.accentColor,
														padding: '0 0.5em 0 0.5em'
													}}>
													first page
												</Link>
												?
											</div>
										}
										hideButton={true}
									/>)
								}
							</Page>
						</div>}

                </Main>

            </Content>

			<BackToTop scrollStepInPx="200" delayInMs="16.66" showOnTop="600" />
            <Footer />
        </Wrapper>
        )
    }
}
