import React, { PropTypes } from 'react'
import { injectGlobal } from 'styled-components'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

injectGlobal`
  body {
    margin: 0;
  }
`

const App = ({ children }) => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        {children}
      </div>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default App
