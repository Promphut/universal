/* eslint-disable */
var http = require('http');
const express = require('express')
const app = express()
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

const ip = process.env.IP || '0.0.0.0'
const port = process.env.PORT || 3000

const React = require('react')
const Helmet = require('react-helmet')
const render =  require('react-dom/server').renderToString
const Request = require('superagent')
const configFile = require('./config')
const path = require("path")
// import { renderToString } from 'react-dom/server'

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  host: ip,
  stats: false,
  historyApiFallback: true,
  contentBase: 'public'
}).listen(port, ip, (err) => {
  if (err) {
    return //console.log(err)
  }

  //console.log(`Listening at http://${ip}:${port}`)
})
app.engine('html',require('ejs').renderFile)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS') 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/',test)

app.listen(port, function() {
  //console.log('Production Express server running at localhost:' + port)
})



function test(req,res){
  if(req.headers['user-agent'] === 'facebookexternalhit/1.1'){
      Request
        .get(configFile.BACKURL+'/publishers/'+configFile.PID)
        .end(function(er,resp){
          if(er) throw er
          else{
            console.log(resp.body.publisher)
            res.render('index.html',{data:resp.body.publisher})
          }
        })
  } 

  // match the routes to the url
  // match({routes: routes, location: req.url }, (err, redirect, props) => {
  //   //reactCookie.plugToRequest(req, res)
  //   //console.log('headers', req.cookies, res.cookies)
   
  //   if(err) serveErr(500, err, req, res)
  //   else if(redirect) res.redirect(redirect.pathname + redirect.search)
  //   else if(props) {
  //     // `RouterContext` is the what `Router` renders. `Router` keeps these
  //     // `props` in its state as it listens to `browserHistory`. But on the
  //     // server our app is stateless, so we need to use `match` to
  //     // get these props before rendering.
  //     const appHtml = renderToString(<RouterContext {...props}/>)
  //     //global.navigator = { userAgent: req.headers['user-agent'] }
  //     let head = Helmet.rewind();

  //     res.render('layout.ejs', { reactOutput: appHtml, head:head });
  //   } else {
  //     serveErr(404, new Error('Not Found'), req, res)
  //   }
  // })
  // //res.sendFile(path.resolve(path.join(__dirname, 'public', 'index.html')))

}
