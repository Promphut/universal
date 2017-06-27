import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import utils from '../../../services/utils'
import api from 'components/api'

const NextStoryContainer = styled.div `
  opacity: ${props => (props.scrollOpacity ? '1' : '0')};
  position: fixed;
  bottom: 0px;
  right: 0px;
  z-index: 1;
  border-color: #c6c6c6;
  border-width: 1px 1px 1px 1px;
  border-style: solid;
  background: url(${props=>props.imgSrc}) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height:auto;
  max-width: 240px;
`

const ImgOverlay = styled.div `
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
`

const NextStoryHeaderWarpper = styled.div `
    padding: 20px 15px 15px 20px;
    margin-top:-10px;
`

const NextStoryName = styled.p `
  color: white;
  text-align: center;
`

const NextStoryArrow = styled.span `
  margin-top: 5px;
  margin-right:5px;
  float: right;
  font-size: 24px;
  color:white;
  margin-bottom: 0px;
`

export default class NextStory extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      nextStory: {},
			scrollOpacity: false
    }
  }

  getNextStory = () => {
    api.getFeed(this.props.format, { status: 1, column: this.props.cid }, 'popular', null, null, 1,{'omit' : [this.props.currentID]})
    .then(result => {
      //console.log(result)
      this.setState({nextStory: result.feed[0]})
    })
  }

  handleScroll = e => {
    if (!utils.isMobile()) {
      const scrollToTop = e.srcElement.body.scrollTop >
        200
        ? true
        : false
      const scrollOpacity = e.srcElement.body.scrollTop > 200
        ? true
        : false

      this.setState({
        scrollOpacity
      })
    }
  }

  componentWillMount() {
    this.getNextStory()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    let {ptitle, cover, url} = this.state.nextStory
    return (
      <Link to = {url || "/"}>
        <NextStoryContainer scrollOpacity = {this.state.scrollOpacity} imgSrc = {cover && cover.medium}>
          <ImgOverlay></ImgOverlay>
          <NextStoryArrow><i className="material-icons">arrow_forward</i></NextStoryArrow>
          <NextStoryHeaderWarpper>
            <NextStoryName>{ptitle && ptitle}</NextStoryName>
          </NextStoryHeaderWarpper>
        </NextStoryContainer>
      </Link>
    )
  }
}
