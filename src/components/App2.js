import React, { PropTypes } from 'react'
import { injectGlobal } from 'styled-components'

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
      font-weight: 400;
    }
    .title-font {
      font-family: 'PT Serif', 'Mitr';
      font-size: 36px;
    }
    .content-font {
      font-family: 'PT Sans', 'cs_prajad', sans-serif;
      font-size: 20px;
    }
  }

  /* FOR MOBILE */
  @media (max-width:480px) {
    .menu-font {
      font-family: 'Nunito', 'Mitr';
      font-size: 16px;
      font-weight: 400;
    }
    .title-font {
      font-family: 'Roboto Slab', 'Mitr';
      font-size: 36px;
    }
    .content-font {
      font-family: 'Roboto', 'cs_prajad', sans-serif;
      font-size: 20px;
    }
  }
`

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  appBar: {
    height: 60,
  },
});

const App2 = ({ children }) => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      {children}
    </MuiThemeProvider>
  )
}

App2.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default App2
