/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const Html = ({ styles, assets, content }) => {
  const helmet = Helmet.rewind()
  const htmlAttrs = helmet.htmlAttributes.toComponent()
  const bodyAttrs = helmet.bodyAttributes.toComponent()

  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {assets.css.map(path => <link rel="stylesheet" type="text/css" key={path} href={path} />)}
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </head>
      <body {...bodyAttrs}>
        <main id="app" dangerouslySetInnerHTML={{ __html: content }} />
        
        {assets.js.map(path => <script key={path} src={path} />)}
      </body>
    </html>
  )
}

Html.propTypes = {
  styles: PropTypes.string.isRequired,
  assets: PropTypes.shape({
    css: PropTypes.array.isRequired,
    js: PropTypes.array.isRequired,
  }).isRequired,
  content: PropTypes.string.isRequired,
}
export default Html
