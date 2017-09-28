import React from 'react';
import Helmet from 'react-helmet';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AsyncComponentProvider, createAsyncContext } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import { CookiesProvider } from 'react-cookie';

import config from '../../../config';

import ServerHTML from './ServerHTML';
import App from '../../../shared/components/App';
import ExtractMeta from './ExtractMetaData'

import { ServerStyleSheet } from 'styled-components';

import api from '../../../shared/services/api';
/**
 * React application middleware, supports server side rendering.
 */
export default function reactApplicationMiddleware(request, response, next) {
  global.window = global.window || {};
  global.navigator = global.navigator || {};
  global.navigator.userAgent = request.headers['user-agent'] || 'all';
  const sheet = new ServerStyleSheet();
  const cookies = request.universalCookies;
  // Ensure a nonce has been provided to us.
  // See the server/middleware/security.js for more info.
  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }
  const nonce = response.locals.nonce;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (config('disableSSR')) {
    if (process.env.BUILD_FLAG_IS_DEV === 'true') {
      // eslint-disable-next-line no-console
      console.log('==> Handling react route without SSR');
    }
    // SSR is disabled so we will return an "empty" html page and
    // rely on the client to initialize and render the react application.
    const html = renderToStaticMarkup(<ServerHTML nonce={nonce} />);
    response.status(200).send(`<!DOCTYPE html>${html}`);
    return;
  }

  // Create a context for our AsyncComponentProvider.
  const asyncComponentsContext = createAsyncContext();

  // Create a context for <StaticRouter>, which will allow us to
  // query for the results of the render.
  const reactRouterContext = {};

  // Declare our React application.
  const app = (setting,story) =>
    // console.log(story)
    sheet.collectStyles(
      <AsyncComponentProvider asyncContext={asyncComponentsContext}>
        <CookiesProvider cookies={cookies}>
          <StaticRouter location={request.url} context={reactRouterContext}>
            <App setting={setting} story={story} />
          </StaticRouter>
        </CookiesProvider>
      </AsyncComponentProvider>
    );

  // Pass our app into the react-async-component helper so that any async
  // components are resolved for the render.
  asyncBootstrapper(app).then(() => {
    api
      .getPublisherSetting()
      .then((setting) => {
        if (!setting || !setting.publisher) return next(new Error('Cannot get publisher setting.'));
      ExtractMeta(setting, request.url)
      .then(meta => {
        if (meta.status == 404){
					return response.redirect('/404')
        }
        // console.log(request.url)
        const appString = renderToString(app(setting,meta.story));
        const styleTags = sheet.getStyleElement();
        // Generate the html response.
        // console.log(appString)
        const html = renderToStaticMarkup(
          <ServerHTML
            meta={meta}
            reactAppString={appString}
            nonce={nonce}
            helmet={Helmet.rewind()}
            asyncComponentsState={asyncComponentsContext.getState()}
            styleTags={styleTags}
          />,
        );

        // Check if the router context contains a redirect, if so we need to set
        // the specific status and redirect header and end the response.
        if (reactRouterContext.url) {
          response.status(302).setHeader('Location', reactRouterContext.url);
          response.end();
          return;
        }

        response
          .status(
            reactRouterContext.missed
              ? // If the renderResult contains a "missed" match then we set a 404 code.
                // Our App component will handle the rendering of an Error404 view.
                404
              : // Otherwise everything is all good and we send a 200 OK status.
                200,
          )
          .send(`<!DOCTYPE html>${html}`);
        }).catch(next)
      }).catch(next);
  });
}
