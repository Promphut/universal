/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import asyncBootstrapper from 'react-async-bootstrapper';
import { AsyncComponentProvider } from 'react-async-component';

import { basename } from '../shared/config.js';
import { CookiesProvider } from 'react-cookie';

// import './polyfills';

import ReactHotLoader from './components/ReactHotLoader';

import App from '../shared/components/App';
import api from '../shared/services/api';

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
const supportsHistory = 'pushState' in window.history;

// Get any rehydrateState for the async components.
// eslint-disable-next-line no-underscore-dangle
const asyncComponentsRehydrateState = window.__ASYNC_COMPONENTS_REHYDRATE_STATE__;

/**
 * Renders the given React Application component.
 */
function renderApp(TheApp) {
  // Firstly, define our full application component, wrapping the given
  // component app with a browser based version of react router.
  const app = (setting,story) => (
    <ReactHotLoader>
      <CookiesProvider>
        <AsyncComponentProvider rehydrateState={asyncComponentsRehydrateState}>
          <BrowserRouter forceRefresh={!supportsHistory}>
            <TheApp setting={setting} story={story}/>
          </BrowserRouter>
        </AsyncComponentProvider>
      </CookiesProvider>
    </ReactHotLoader>
  );

  // We use the react-async-component in order to support code splitting of
  // our bundle output. It's important to use this helper.
  // @see https://github.com/ctrlplusb/react-async-component
  asyncBootstrapper(app).then(() => {
    api.getPublisherSetting().then((setting) => {
      // console.log(window.location)
      let path = window.location.pathname.split('/')
      if (path[1] === 'stories' && !(path[2].startsWith('all')||path[2].startsWith('columns'))) {
          if(path.length>4 && path[4]) {
            let sid = path[4]
            return api.getStoryFromSid(sid)
            .then(res => {
              render(app(setting,res.story), container);
            })
          }else{
            render(app(setting,null), container);
          }
      }else{
        render(app(setting,null), container);
      }
    });
  });
}

// Execute the first render of our app.
renderApp(App);

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');

// The following is needed so that we can support hot reloading our application.
if (process.env.BUILD_FLAG_IS_DEV === 'true' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept('../shared/components/App', () => {
    renderApp(require('../shared/components/App').default);
  });
}
