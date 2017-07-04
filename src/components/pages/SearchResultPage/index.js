import React from 'react';
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import { Tabs, Tab } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import {Footer, TopBarWithNavigation, SearchResultBox} from 'components'
import api from 'components/api'
import utils from '../../../services/utils'
import isEmpty from 'lodash/isEmpty'

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
  margin-left: 0px;
  margin-right: 20px;
  background-color: ${props => props.select == true ? props.theme.primaryColor : 'rgba(0,0,0,0)'};
  border-radius: 100px;
  color: ${props => props.theme.barTone == 'light' || !props.select ? '#000000' : '#FFF'};
  padding-top: 9px;
  padding-bottom: 9px;
  padding-left: 25px;
  padding-right: 25px;
  text-align: center;

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
    color: ${props => props.theme.barTone == 'light' || !props.select ? '#000000' : '#FFF'};
  }
`

export default class SearchResultPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      keyword: '',
      type: '',
      result: null
    }

  }

  fetchResult = (keyword) => {
    api.getStoryFromKeyword(keyword)
    .then(result => {
      console.log(result)
      this.setState({result: result});
    })
  }

  handleKeywordChange = (e) => {
    this.setState({
      keyword: e.target.value,
      result: this.fetchResult(e.target.value),
    })
  }

  componentDidMount() {
    this.setState({
      isMobile: utils.isMobile(),
      completed: 100
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      keyword: nextProps.match.params.keyword,
      result: this.fetchResult(nextProps.match.params.keyword),
      type: nextProps.match.params.type,
    })
  }

  render() {
    let { isMobile, completed } = this.state
    return (
      <Wrapper>
        <TopBarWithNavigation/>
        <Content isMobile={isMobile}>

          <Main>
            <TextField id="search-box" hintText="Search Keyword Here" fullWidth={true} value={this.state.keyword} style={{fontSize:'28px'}} onChange={this.handleKeywordChange}/>
            <FilterContainer>
              <Link to={"/search/stories/" + this.state.keyword}><FilterItem select={this.state.type === 'stories'}>STORIES</FilterItem></Link>
              <Link to={"/search/news/" + this.state.keyword}><FilterItem select={this.state.type === 'news'}>NEWS</FilterItem></Link>
              <Link to={"/search/video/" + this.state.keyword}><FilterItem select={this.state.type === 'video'}>VIDEO</FilterItem></Link>
            </FilterContainer>
            <SearchResultBox type={this.state.type} result={this.state.result}/>
          </Main>

        </Content>

        <Footer />
      </Wrapper>
    )
  }
}
