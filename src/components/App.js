import React, { PropTypes } from 'react'
import { injectGlobal } from 'styled-components'
import {Helmet} from "react-helmet";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

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

injectTapEventPlugin();

const tagManager = function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
}

const facebookUI = function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
};

const chartbeat = function() {
  function loadChartbeat() {
    window._sf_endpt = (new Date()).getTime();
    var e = document.createElement('script');
    e.setAttribute('language', 'javascript');
    e.setAttribute('type', 'text/javascript');
    e.setAttribute('src','//static.chartbeat.com/js/chartbeat.js');
    document.body.appendChild(e);
  };
  var oldonload = window.onload;
  window.onload = (typeof window.onload != 'function') ?
    loadChartbeat : function() { oldonload(); loadChartbeat(); };
}

const muiTheme = getMuiTheme({
  appBar: {
    height: 60,
  },
});

const App = React.createClass({
  render(){
    let {name, desc, theme, tagline, keywords, analytic, channels, cover} = this.context.setting.publisher
    if(!analytic) analytic = {}
    console.log('context', this.context.setting, this.props.location)
    let {children} = this.props
    let muiTheme = getMuiTheme({
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
    });

    let quantcastJs = `
      var _qevents = _qevents || [];
      (function() {
        var elem = document.createElement('script');
        elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
        elem.async = true;
        elem.type = "text/javascript";
        var scpt = document.getElementsByTagName('script')[0];
        scpt.parentNode.insertBefore(elem, scpt);
      })();
      _qevents.push({
        qacct:"${config.ANALYTIC.QUANTCASTACC}"
      });
    `

    let title = name + (tagline ? ' | ' + tagline : '')

    var _sf_async_config = { 
      uid: config.ANALYTIC.CHARTBEATUID, 
      domain: config.DOMAIN, 
      useCanonical: true 
    };
    if(window) window._sf_async_config = _sf_async_config

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta name="keywords" content={keywords} />
          <meta name="description" content={desc} />

          <link rel="shortcut icon" type="image/ico" href={config.BACKURL+'/publishers/'+config.PID+'/favicon'} />
          {channels && channels.fb ? <link rel="author" href={getFbUrl(channels.fb)} /> : ''}
          <link rel="canonical" href={config.FRONTURL+this.props.location.pathname} />

          <meta property="og:sitename" content={name} />
          <meta property="og:url" content={config.FRONTURL+this.props.location.pathname} />
          <meta property="og:title" content={title} />
          <meta property="og:type" content="article" />
          {/*<meta property="og:image" content={cover.medium} />*/}
          <meta property="og:keywords" content={keywords} />
          <meta property="og:description" content={desc} />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:image:alt" content={title} />

          {/* TAGMANAGER */}
          <script>{
            tagManager(window,document,'script','dataLayer',config.ANALYTIC.TAGMGRID)
          }</script>
          {/* TAGMANAGER */}

          {/* CHARTBEAT */}
          <script>{
            chartbeat()
          }</script>
          {/* CHARTBEAT */}
        </Helmet>

        {/* TAGMANAGER */}
        <noscript><iframe src={'https://www.googletagmanager.com/ns.html?id='+config.ANALYTIC.TAGMGRID}
        height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe></noscript>
        {/* TAGMANAGER */}

        {/* FB */}
        <div id="fb-root"></div>
        <script>{
          window.fbAsyncInit =   function() {
            FB.init({
              appId      : config.ANALYTIC.FBAPPID,
              xfbml      : true,
              version    : 'v2.8'
            });
            FB.AppEvents.logPageView();
          }
        }</script>
        <script>{
          facebookUI(document, 'script', 'facebook-jssdk')
        }</script>
        {/* FB */}
        
        {/* QUANTCAST */}
        <script dangerouslySetInnerHTML={{__html: quantcastJs}}></script>
        <noscript>
          <div style={{display:'none'}}>
            <img src={'//pixel.quantserve.com/pixel/'+config.ANALYTIC.QUANTCASTACC+'.gif'} border="0" height="1" width="1" alt="Quantcast"/>
          </div>
        </noscript>
        {/* QUANTCAST */}

        <MuiThemeProvider muiTheme={muiTheme}>
          {children}
        </MuiThemeProvider>
      </div>
    )
  }
})

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

App.contextTypes = {
    setting: React.PropTypes.object
};

export default App
