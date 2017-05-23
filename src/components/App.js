import React from 'react'
import PropTypes, {instanceOf} from 'prop-types'
import { injectGlobal, ThemeProvider } from 'styled-components'
import Helmet from 'react-helmet'
import api from 'components/api'
import differenceWith from 'lodash/differenceWith'
import isEqual from 'lodash/isEqual'
import { withRouter } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import LinearProgress from 'material-ui/LinearProgress';
import { withCookies, Cookies } from 'react-cookie';
import config from '../config'
import utils from '../services/utils'
//import theme from './themes/default'

injectGlobal`
  /* FOR DESKTOP AND TABLET
  @media (min-width:481px) {
    @import url('https://fonts.googleapis.com/css?family=Mitr|Nunito|PT+Sans|PT+Serif&subset=thai');
  }

  /* FOR MOBILE
  @media (max-width: 480px) {
    @import url('https://fonts.googleapis.com/css?family=Mitr|Nunito|Roboto|Roboto+Slab');
  }*/

  body {
    color:#222;
  }
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
  }

  h3{
    font-size:19px;
    font-weight:bold;
    color:#222;
  }

  a {
    color: #8f8f8f;
    text-decoration: none;
  }
  a:hover{
    color: #222;
    text-decoration: none;
  }


  @font-face {
    font-family: 'cs_prajad';
    src: local('CS PraJad'),
          url('/fonts/csprajad-bolditalic-webfont.woff2') format('woff2'),
         url('/fonts/csprajad-bolditalic-webfont.woff') format('woff');
    font-weight: bold;
    font-style: italic;
  }
  @font-face {
    font-family: 'cs_prajad';
    src: local('CS PraJad'),
        url('/fonts/csprajad-bold-webfont.woff2') format('woff2'),
         url('/fonts/csprajad-bold-webfont.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'cs_prajad';
    src: local('CS PraJad'),
        url('/fonts/csprajad-italic-webfont.woff2') format('woff2'),
         url('/fonts/csprajad-italic-webonft.woff') format('woff');
    font-weight: normal;
    font-style: italic;
  }
  @font-face {
    font-family: 'cs_prajad';
    src: local('CS PraJad'),
        url('/fonts/csprajad-webfont.woff2') format('woff2'),
         url('/fonts/csprajad-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  /* FOR DESKTOP AND TABLET */
  @media (min-width:481px) {
    .menu-font {
      font-family: 'Nunito', 'Mitr';
      font-size: 16px;
      font-weight: bold;
    }
    .title-font {
      font-family: 'PT Serif', 'Mitr';
      font-size: 36px;
    }
    .content-font {
      font-family: 'PT Sans', 'cs_prajad', sans-serif;
      font-size: 20px;
    }
    .sans-font{
      font-family: 'PT Sans', 'cs_prajad', sans-serif;
    }
    .serif-font{
       font-family: 'PT Serif', 'Mitr';
    }
    .nunito-font{
      font-family: 'Nunito', 'Mitr';
    }
    .hidden-des{
      display: none !important;
    }
  }

  /* FOR MOBILE */
  @media (max-width:480px) {
    .menu-font {
      font-family: 'Nunito', 'Mitr';
      font-size: 16px;
      font-weight: bold;
    }
    .title-font {
      font-family: 'Roboto Slab', 'Mitr';
      font-size: 36px;
    }
    .content-font {
      font-family: 'Roboto', 'cs_prajad', sans-serif;
      font-size: 20px;
    }
    .sans-font{
      font-family: 'Roboto', 'cs_prajad', sans-serif;
    }
    .serif-font{
       font-family: 'Roboto Slab', 'Mitr';
    }
    .hidden-mob{
      display:none !important;
    }
    .hidden-des{
      display:block !important;
    }
    .nunito-font{
      font-family: 'Nunito', 'Mitr';
    }
  }


  .container {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 576px) {
    .container {
      width: 540px;
      max-width: 100%;
    }
  }

  @media (min-width: 768px) {
    .container {
      width: 720px;
      max-width: 100%;
    }
  }

  @media (min-width: 992px) {
    .container {
      width: 960px;
      max-width: 100%;
    }
  }

  @media (min-width: 1200px) {
    .container {
      width: 1140px;
      max-width: 100%;
    }
  }
  .row {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    overflow:hidden;
    -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
            flex-wrap: wrap;
  }
  .col {
    -webkit-flex-basis: 0;
        -ms-flex-preferred-size: 0;
            flex-basis: 0;
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
    max-width: 100%;
  }

  .col-auto {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
        -ms-flex: 0 0 auto;
            flex: 0 0 auto;
    width: auto;
  }

  .col-1 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 8.333333%;
        -ms-flex: 0 0 8.333333%;
            flex: 0 0 8.333333%;
    max-width: 8.333333%;
  }

  .col-2 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 16.666667%;
        -ms-flex: 0 0 16.666667%;
            flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }

  .col-3 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 25%;
        -ms-flex: 0 0 25%;
            flex: 0 0 25%;
    max-width: 25%;
  }

  .col-4 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 33.333333%;
        -ms-flex: 0 0 33.333333%;
            flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }

  .col-5 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 41.666667%;
        -ms-flex: 0 0 41.666667%;
            flex: 0 0 41.666667%;
    max-width: 41.666667%;
  }

  .col-6 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 50%;
        -ms-flex: 0 0 50%;
            flex: 0 0 50%;
    max-width: 50%;
  }

  .col-7 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 58.333333%;
        -ms-flex: 0 0 58.333333%;
            flex: 0 0 58.333333%;
    max-width: 58.333333%;
  }

  .col-8 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 66.666667%;
        -ms-flex: 0 0 66.666667%;
            flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }

  .col-9 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 75%;
        -ms-flex: 0 0 75%;
            flex: 0 0 75%;
    max-width: 75%;
  }

  .col-10 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 83.333333%;
        -ms-flex: 0 0 83.333333%;
            flex: 0 0 83.333333%;
    max-width: 83.333333%;
  }

  .col-11 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 91.666667%;
        -ms-flex: 0 0 91.666667%;
            flex: 0 0 91.666667%;
    max-width: 91.666667%;
  }

  .col-12 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 100%;
        -ms-flex: 0 0 100%;
            flex: 0 0 100%;
    max-width: 100%;
  }
  @media (min-width: 576px) {
  .col-sm {
    -webkit-flex-basis: 0;
        -ms-flex-preferred-size: 0;
            flex-basis: 0;
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
    max-width: 100%;
  }
  .col-sm-auto {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
        -ms-flex: 0 0 auto;
            flex: 0 0 auto;
    width: auto;
  }
  .col-sm-1 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 8.333333%;
        -ms-flex: 0 0 8.333333%;
            flex: 0 0 8.333333%;
    max-width: 8.333333%;
  }
  .col-sm-2 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 16.666667%;
        -ms-flex: 0 0 16.666667%;
            flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }
  .col-sm-3 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 25%;
        -ms-flex: 0 0 25%;
            flex: 0 0 25%;
    max-width: 25%;
  }
  .col-sm-4 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 33.333333%;
        -ms-flex: 0 0 33.333333%;
            flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
  .col-sm-5 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 41.666667%;
        -ms-flex: 0 0 41.666667%;
            flex: 0 0 41.666667%;
    max-width: 41.666667%;
  }
  .col-sm-6 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 50%;
        -ms-flex: 0 0 50%;
            flex: 0 0 50%;
    max-width: 50%;
  }
  .col-sm-7 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 58.333333%;
        -ms-flex: 0 0 58.333333%;
            flex: 0 0 58.333333%;
    max-width: 58.333333%;
  }
  .col-sm-8 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 66.666667%;
        -ms-flex: 0 0 66.666667%;
            flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
  .col-sm-9 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 75%;
        -ms-flex: 0 0 75%;
            flex: 0 0 75%;
    max-width: 75%;
  }
  .col-sm-10 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 83.333333%;
        -ms-flex: 0 0 83.333333%;
            flex: 0 0 83.333333%;
    max-width: 83.333333%;
  }
  .col-sm-11 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 91.666667%;
        -ms-flex: 0 0 91.666667%;
            flex: 0 0 91.666667%;
    max-width: 91.666667%;
  }
  .col-sm-12 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 100%;
        -ms-flex: 0 0 100%;
            flex: 0 0 100%;
    max-width: 100%;
  }
  @media (min-width: 768px) {
  .col-md {
    -webkit-flex-basis: 0;
        -ms-flex-preferred-size: 0;
            flex-basis: 0;
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
    max-width: 100%;
  }
  .col-md-auto {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
        -ms-flex: 0 0 auto;
            flex: 0 0 auto;
    width: auto;
  }
  .col-md-1 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 8.333333%;
        -ms-flex: 0 0 8.333333%;
            flex: 0 0 8.333333%;
    max-width: 8.333333%;
  }
  .col-md-2 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 16.666667%;
        -ms-flex: 0 0 16.666667%;
            flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }
  .col-md-3 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 25%;
        -ms-flex: 0 0 25%;
            flex: 0 0 25%;
    max-width: 25%;
  }
  .col-md-4 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 33.333333%;
        -ms-flex: 0 0 33.333333%;
            flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
  .col-md-5 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 41.666667%;
        -ms-flex: 0 0 41.666667%;
            flex: 0 0 41.666667%;
    max-width: 41.666667%;
  }
  .col-md-6 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 50%;
        -ms-flex: 0 0 50%;
            flex: 0 0 50%;
    max-width: 50%;
  }
  .col-md-7 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 58.333333%;
        -ms-flex: 0 0 58.333333%;
            flex: 0 0 58.333333%;
    max-width: 58.333333%;
  }
  .col-md-8 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 66.666667%;
        -ms-flex: 0 0 66.666667%;
            flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
  .col-md-9 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 75%;
        -ms-flex: 0 0 75%;
            flex: 0 0 75%;
    max-width: 75%;
  }
  .col-md-10 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 83.333333%;
        -ms-flex: 0 0 83.333333%;
            flex: 0 0 83.333333%;
    max-width: 83.333333%;
  }
  .col-md-11 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 91.666667%;
        -ms-flex: 0 0 91.666667%;
            flex: 0 0 91.666667%;
    max-width: 91.666667%;
  }
  .col-md-12 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 100%;
        -ms-flex: 0 0 100%;
            flex: 0 0 100%;
    max-width: 100%;
  }
  @media (min-width: 992px) {
  .col-lg {
    -webkit-flex-basis: 0;
        -ms-flex-preferred-size: 0;
            flex-basis: 0;
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
    max-width: 100%;
  }
  .col-lg-auto {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
        -ms-flex: 0 0 auto;
            flex: 0 0 auto;
    width: auto;
  }
  .col-lg-1 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 8.333333%;
        -ms-flex: 0 0 8.333333%;
            flex: 0 0 8.333333%;
    max-width: 8.333333%;
  }
  .col-lg-2 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 16.666667%;
        -ms-flex: 0 0 16.666667%;
            flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }
  .col-lg-3 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 25%;
        -ms-flex: 0 0 25%;
            flex: 0 0 25%;
    max-width: 25%;
  }
  .col-lg-4 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 33.333333%;
        -ms-flex: 0 0 33.333333%;
            flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
  .col-lg-5 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 41.666667%;
        -ms-flex: 0 0 41.666667%;
            flex: 0 0 41.666667%;
    max-width: 41.666667%;
  }
  .col-lg-6 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 50%;
        -ms-flex: 0 0 50%;
            flex: 0 0 50%;
    max-width: 50%;
  }
  .col-lg-7 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 58.333333%;
        -ms-flex: 0 0 58.333333%;
            flex: 0 0 58.333333%;
    max-width: 58.333333%;
  }
  .col-lg-8 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 66.666667%;
        -ms-flex: 0 0 66.666667%;
            flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
  .col-lg-9 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 75%;
        -ms-flex: 0 0 75%;
            flex: 0 0 75%;
    max-width: 75%;
  }
  .col-lg-10 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 83.333333%;
        -ms-flex: 0 0 83.333333%;
            flex: 0 0 83.333333%;
    max-width: 83.333333%;
  }
  .col-lg-11 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 91.666667%;
        -ms-flex: 0 0 91.666667%;
            flex: 0 0 91.666667%;
    max-width: 91.666667%;
  }
  .col-lg-12 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 100%;
        -ms-flex: 0 0 100%;
            flex: 0 0 100%;
    max-width: 100%;
  }
  @media (min-width: 1200px) {
  .col-xl {
    -webkit-flex-basis: 0;
        -ms-flex-preferred-size: 0;
            flex-basis: 0;
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
    max-width: 100%;
  }
  .col-xl-auto {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
        -ms-flex: 0 0 auto;
            flex: 0 0 auto;
    width: auto;
  }
  .col-xl-1 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 8.333333%;
        -ms-flex: 0 0 8.333333%;
            flex: 0 0 8.333333%;
    max-width: 8.333333%;
  }
  .col-xl-2 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 16.666667%;
        -ms-flex: 0 0 16.666667%;
            flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }
  .col-xl-3 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 25%;
        -ms-flex: 0 0 25%;
            flex: 0 0 25%;
    max-width: 25%;
  }
  .col-xl-4 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 33.333333%;
        -ms-flex: 0 0 33.333333%;
            flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
  .col-xl-5 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 41.666667%;
        -ms-flex: 0 0 41.666667%;
            flex: 0 0 41.666667%;
    max-width: 41.666667%;
  }
  .col-xl-6 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 50%;
        -ms-flex: 0 0 50%;
            flex: 0 0 50%;
    max-width: 50%;
  }
  .col-xl-7 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 58.333333%;
        -ms-flex: 0 0 58.333333%;
            flex: 0 0 58.333333%;
    max-width: 58.333333%;
  }
  .col-xl-8 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 66.666667%;
        -ms-flex: 0 0 66.666667%;
            flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
  .col-xl-9 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 75%;
        -ms-flex: 0 0 75%;
            flex: 0 0 75%;
    max-width: 75%;
  }
  .col-xl-10 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 83.333333%;
        -ms-flex: 0 0 83.333333%;
            flex: 0 0 83.333333%;
    max-width: 83.333333%;
  }
  .col-xl-11 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 91.666667%;
        -ms-flex: 0 0 91.666667%;
            flex: 0 0 91.666667%;
    max-width: 91.666667%;
  }
  .col-xl-12 {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 100%;
        -ms-flex: 0 0 100%;
            flex: 0 0 100%;
    max-width: 100%;
  }
`

injectTapEventPlugin()

// const muiTheme = getMuiTheme({
//   appBar: {
//     height: 60,
//   },
// });

class App extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    children: PropTypes.any,
    cookies: instanceOf(Cookies).isRequired
  }

  static contextTypes = {
    setting: PropTypes.object
  }

  constructor(props, context) {
    super(props)

    this.state = {
      completed:0,
    }
  }

  genHash = (nextProps) => {
    //console.log('HASHED')
    let hash = new Date().valueOf().toString(36)+Math.round(Math.random()*100)
    let {match, location, history} = nextProps
    
    // 1. Create hash
    // 1.1 For story URL 
    // count dark social if story countView is true
    if(match.params.countView) api.createHash(hash, match.params.story._id)
    // 1.2 For non-story URL
    else api.createHash(hash)

    // 2. Append #hash to url
    //history.replace(location.pathname+'#'+hash)
    //console.log(location)
    history.replace({hash:'#'+hash})
    // this.props.router.replace({
    //   ...nextProps.location, 
    //   hash:'#'+hash
    // })
  }

  progress = (completed) => {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = Math.random() * 30;
      this.timer = setTimeout(() => this.progress(completed + diff), 100);
    }
  }

  componentWillMount() {
    //console.log('COOK', this.props.cookies)
    global.cookies = this.props.cookies
  }

  componentDidMount(){
    //this.timer = setTimeout(() => this.progress(10), 100);
    //console.log('MOUNTED', this.props.location)
    // key'll be null if enter for the first time
    // for page refresh or re-enter on url bar, key'll have value
    if(this.props.location.hash && !this.props.location.key){
      // direct enter with hash, mean dark social traffic
      // if have hash, send to dark social service
      //console.log('CASE 1', this.props.location)
      //console.log('nextState', nextState, nextProps)
      api.checkHash(this.props.location.hash.substring(1))
      return this.genHash(this.props)
    } else {
      // first time but no hash presented or have key, gen hash
      //console.log('CASE 2', this.props.location)
      return this.genHash(this.props)
    }
  }

  componentWillReceiveProps(nextProps){
    //console.log("RECEIVE1", /*nextProps.location.pathname, this.props.location.pathname, */nextProps.location.action, nextProps.location.key, this.props.location.key)
    //console.log("RECEIVE2", nextProps.location.hash, nextProps.location.action)
    //console.log('componentWillReceiveProps', nextProps.history, nextProps.location, this.props.location)
    //let isFirstTime = !nextProps.location.key && !this.props.location.key

    if(nextProps.history.action==='PUSH') {
      
      //this.timer = setTimeout(() => this.progress(10), 100); //loading
      // if pushing for the next path, gen hash
      //console.log('CASE 3')
      if(nextProps.location.pathname !== this.props.location.pathname) return this.genHash(nextProps)
      // if reclick the same url
      // if(this.props.location.hash && !nextProps.location.hash) {

      //   nextProps.location.hash = this.props.location.hash
      //   console.log('XXX', this.props.location.hash, 'ZZ', nextProps.location.hash)
      // }
    } 
    // for case POP i.e. reenter url with hash
    //console.log('CASE 4', nextProps.location, this.props.location)
  }

  shouldComponentUpdate(nextProps, nextState){
    if(differenceWith(nextProps.children, this.props.children, isEqual)){
      this.timer = setTimeout(() => this.progress(10), 100);
    } 
    //console.log('UPDATE0', (nextProps.location.action === 'REPLACE' && !!nextProps.location.hash), nextProps.location.hash, this.props.location.hash)

    // If intention is to change hash, no need to update component
    if(nextProps.history.action === 'REPLACE' && nextProps.location.hash!==this.props.location.hash) {
      return false
    }
    //console.log('-- Component Updated --')
    return true
  }

  componentDidUpdate(prevProps, prevState){
    clearTimeout(this.timer);
    //this.setState({completed:120})
    //this.progress(200)
    //console.log(this.timer)
  }

  render(){
    let {name, desc, tagline, keywords, analytic, channels, cover, theme} = this.context.setting.publisher
    //console.log('SETTING', this.context.setting.publisher)
    if(!analytic) analytic = {}
    let coverMedium
    if (cover) coverMedium = cover.medium
    let title = (name || '') + (tagline ? ' | ' + tagline : '')

    let {completed} = this.state
    //let {theme} = this.context.setting.publisher

    //console.log('AGENT', navigator.userAgent)
    let context = {
      appBar: {
        height: 60,
      },
      menuItem: {
        hoverTextColor:'#FFF',
        selectedTextColor: "#FFF",
      },
      textField: {
        floatingLabelColor: theme.accentColor,
        focusColor: theme.accentColor,
      },
      flatButton: {
        // buttonFilterColor: theme.accentColor,
        // primaryTextColor: theme.accentColor,
        // secondaryTextColor: theme.secondaryColor,
      },
      raisedButton: {
        // primaryColor: theme.accentColor,
        // primaryTextColor: theme.accentColor,
        // secondaryColor: theme.secondaryColor,
        // secondaryTextColor: theme.secondaryColor,
      },
      tabs: {
        selectedTextColor: "#FFF"
      }
    }
    if(navigator.userAgent) context.userAgent = navigator.userAgent
    let muiTheme = getMuiTheme(context);

    return (
      <div>
        <Helmet
          title={title}
          meta={[
            { name: 'title', content: title },
            { name: 'keywords', content: keywords },
            { name: 'description', content: desc },

            { property: 'og:site_name', content: name },
            { property: 'og:url', content: config.FRONTURL+this.props.location.pathname },
            { property: 'og:title', content: title },
            { property: 'og:type', content: 'article' },
            { property: 'og:image', content: coverMedium },
            { property: 'og:keywords', content: keywords },
            { property: 'og:description', content: desc },
            { property: 'twitter:card', content: 'summary_large_image' },
            { property: 'twitter:image:alt', content: title },
            { property: 'fb:app_id', content: config.ANALYTIC.FBAPPID },
            // { property: 'og:image:type', content: 'image/png' },
            // { property: 'og:image:width', content: '1200' },
            // { property: 'og:image:height', content: '630' },
          ]}
          link={[
            { rel: 'shortcut icon', type:'image/ico', href: config.BACKURL+'/publishers/'+config.PID+'/favicon' },
            (channels && channels.fb ? { rel: 'author', href: utils.getFbUrl(channels.fb) } : {}),
            { rel: 'canonical', href: config.FRONTURL+this.props.location.pathname },

            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.min.css'},
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Mitr|Nunito|PT+Sans|PT+Serif|Roboto|Roboto+Slab'},
          ]}
          script={[
            { src: 'https://use.fontawesome.com/3df470c471.js' },
          ]}
        />
        <ThemeProvider theme={theme}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <div>
              {completed<100&&<LinearProgress mode="determinate" value={completed} />}
              {React.cloneElement(this.props.children, { onLoading: completed<100?true:false })}
            </div> 
          </MuiThemeProvider>
        </ThemeProvider>
      </div>
    )
  }
}

export default withRouter(withCookies(App))
