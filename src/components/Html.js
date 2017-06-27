/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import config from '../config'

const ggTag = {
  headScript:
    `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${config.ANALYTIC.TAGMGRID}');`,
  iframe:
    `<iframe src="https://www.googletagmanager.com/ns.html?id=${config.ANALYTIC.TAGMGRID}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>`
}

const quantcast = {
  headScript:
    `var _qevents = _qevents || [];
    (function() {
      var elem = document.createElement('script');
      elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
      elem.async = true;
      elem.type = "text/javascript";
      var scpt = document.getElementsByTagName('script')[0];
      scpt.parentNode.insertBefore(elem, scpt);
    })();`,
  bodyScript:
    `_qevents.push( { qacct: '${config.ANALYTIC.QUANTCASTACC}'} );`,
  noscript:
    `<div style="display: none;">
      <img src="//pixel.quantserve.com/pixel/${config.ANALYTIC.QUANTCASTACC}.gif" height="1" width="1" alt="Quantcast"/>
    </div>`
}

const chartbeat = {
  bodyScript:
    `var _sf_async_config = _sf_async_config || {};
    _sf_async_config.uid = '${config.ANALYTIC.CHARTBEATUID}';
    _sf_async_config.domain = '${config.DOMAIN}'; //CHANGE THIS
    _sf_async_config.useCanonical = true;
    //_sf_async_config.sections = 'Change this to your Section name'; //CHANGE THIS
    //_sf_async_config.authors = 'Change this to your Author name'; //CHANGE THIS
    (function() {
        function loadChartbeat() {
            var e = document.createElement('script');
            e.setAttribute('language', 'javascript');
            e.setAttribute('type', 'text/javascript');
            e.setAttribute('src', '//static.chartbeat.com/js/chartbeat.js');
            document.body.appendChild(e);
        }
        var oldonload = window.onload;
        window.onload = (typeof window.onload != 'function') ?
            loadChartbeat : function() {
                oldonload();
                loadChartbeat();
            };
    })();`
}

const twitterIntent =
  `var tweetStory = new CustomEvent("tweetStory");

  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };

    return t;
  }(document, "script", "twitter-wjs"))

  twttr.ready(function (twttr) {
    //console.log(twttr.events)
    twttr.events.bind('tweet', function(event) {
      // dispatch DOM element event that added in TwtShareButton
      event.target.dispatchEvent(tweetStory);
    });
  });`

const facebookSdk =
  `window.fbAsyncInit = function() {
    FB.init({
      appId      : '${config.ANALYTIC.FBAPPID}',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   
   `


const Html = ({ styles, assets, content, meta }) => {
  const helmet = Helmet.rewind()
  const htmlAttrs = helmet.htmlAttributes.toComponent()
  const bodyAttrs = helmet.bodyAttributes.toComponent()
  var {name, keywords, desc, cover, analytic, url} = meta
  //console.log('meta',meta)
  return (
    <html {...htmlAttrs}>
      <head>
        <title>{name}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="manifest.json" />
        <meta name="title" content={name} />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={desc} />
        <meta property="og:site_name" content={config.FRONTURL} />
        <meta property="og:title" content={name} />
        <meta property="og:url" content={config.FRONTURL+url} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={cover}/>
        <meta property="og:keywords" content={keywords} />
        <meta property="og:description" content={desc} />
        <meta property="twitter:card" content={cover} />
        <meta property="twitter:image:alt" content={name} />
        <meta property="fb:app_id" content={analytic} />
        <meta property="og:image:width" content='1200' />
        <meta property="og:image:height" content='600' />

        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}

        <script dangerouslySetInnerHTML={{ __html: ggTag.headScript }} />

        {assets.css.map(path => <link rel="stylesheet" type="text/css" key={path} href={path} />)}
        {styles}
        {/*<style dangerouslySetInnerHTML={{ __html: styles }} />*/}

        <script dangerouslySetInnerHTML={{ __html: quantcast.headScript }} />
      </head>
      <body {...bodyAttrs}>
        <noscript dangerouslySetInnerHTML={{ __html: ggTag.iframe }}></noscript>
        <div id="fb-root"></div>
        <script dangerouslySetInnerHTML={{ __html: facebookSdk }} />


        <main id="app" dangerouslySetInnerHTML={{ __html: content }} />

        {assets.js.map(path => <script key={path} src={path} />)}

        <script dangerouslySetInnerHTML={{ __html: twitterIntent + chartbeat.bodyScript + quantcast.bodyScript }} />
        <noscript dangerouslySetInnerHTML={{ __html: quantcast.noscript }} />
      </body>
    </html>
  )
}

Html.propTypes = {
  styles: PropTypes.node.isRequired, //PropTypes.string.isRequired,
  assets: PropTypes.shape({
    css: PropTypes.array.isRequired,
    js: PropTypes.array.isRequired,
  }).isRequired,
  content: PropTypes.string.isRequired,
}
export default Html
