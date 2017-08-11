/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/html-has-lang */

import React from 'react';
import PropTypes from 'prop-types';
import config from '../../config';

const ggTag = {
  headScript: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${config.ANALYTIC.TAGMGRID}');`,
  iframe: `<iframe src="https://www.googletagmanager.com/ns.html?id=${config.ANALYTIC.TAGMGRID}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
};

const quantcast = {
  headScript: `var _qevents = _qevents || [];
    (function() {
      var elem = document.createElement('script');
      elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
      elem.async = true;
      elem.type = "text/javascript";
      var scpt = document.getElementsByTagName('script')[0];
      scpt.parentNode.insertBefore(elem, scpt);
    })();`,
  bodyScript: `_qevents.push( { qacct: '${config.ANALYTIC.QUANTCASTACC}'} );`,
  noscript: `<div style="display: none;">
      <img src="//pixel.quantserve.com/pixel/${config.ANALYTIC.QUANTCASTACC}.gif" height="1" width="1" alt="Quantcast"/>
    </div>`,
};

const chartbeat = {
  bodyScript: `var _sf_async_config = _sf_async_config || {};
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
    })();`,
};

const twitterIntent = `var tweetStory = new CustomEvent("tweetStory");

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
  });`;

const facebookSdk = `window.fbAsyncInit = function() {
    FB.init({
      appId      : '${config.ANALYTIC.FBAPPID}',
      autoLogAppEvents : true,
      status           : true,
      cookie		 : true,
      xfbml      : true,
      version    : 'v2.9'
    });
    FB.AppEvents.logPageView();
  };
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));`;

const ggWebfont = `WebFontConfig = {
    google: { families: [ 'Mitr|Nunito|PT+Sans|PT+Serif:400,700,700i|Roboto|Roboto+Slab' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();`;

  var Froala = `
  try{(function (k){localStorage.FEK=k;t=document.getElementById('fr-fek');t.parentNode.removeChild(t);})('SG-7vlaszhphI-7A5B-21q==')}catch(e){}
  `
/**
 * The is the HTML shell for our React Application.
 */
function HTML(props) {
  const { htmlAttributes, headerElements, bodyElements, appBodyString, styleTags, meta } = props;
  const { name, keywords, desc, cover, analytic, url } = meta
  return (
    <html {...htmlAttributes}>
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
        <meta name="twitter:card" content="summary" />
        {/* <meta name="twitter:site" content={name} /> */}
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={cover} />
        <meta name="twitter:image:alt" content={name} />
        <meta property="fb:app_id" content={analytic} />
        <meta property="og:image:width" content='1200' />
        <meta property="og:image:height" content='628' />

        <script dangerouslySetInnerHTML={{ __html: ggTag.headScript }} />
        <script dangerouslySetInnerHTML={{ __html: quantcast.headScript }} />

        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.min.css" /> 
        {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Mitr|Nunito|PT+Sans|PT+Serif:400,700,700i|Roboto|Roboto+Slab"/> */}
        {/* <link rel="stylesheet" href="/css/main.css" />    */}
        {headerElements}
        {styleTags}
      </head>
      <body>
        <noscript dangerouslySetInnerHTML={{ __html: ggTag.iframe }} />
        <div id="fb-root" />
        <script dangerouslySetInnerHTML={{ __html: facebookSdk }} />

        <div id="app" dangerouslySetInnerHTML={{ __html: appBodyString }} />
        {bodyElements}

        <script
          dangerouslySetInnerHTML={{
            __html: twitterIntent + chartbeat.bodyScript + quantcast.bodyScript + ggWebfont,
          }}
        />
        <noscript dangerouslySetInnerHTML={{ __html: quantcast.noscript }} />
        <script src="https://use.fontawesome.com/3df470c471.js" />
        <script id="fr-fek"  dangerouslySetInnerHTML={{ __html:Froala}}></script>
      </body>
    </html>
  );
}

HTML.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  htmlAttributes: PropTypes.object,
  headerElements: PropTypes.node,
  bodyElements: PropTypes.node,
  appBodyString: PropTypes.string,
};

HTML.defaultProps = {
  htmlAttributes: null,
  headerElements: null,
  bodyElements: null,
  appBodyString: '',
};

// EXPORT

export default HTML;
