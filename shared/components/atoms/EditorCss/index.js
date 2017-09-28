import React from 'react'
import styled from 'styled-components'

const EditorCss = styled.div`

 .medium-insert-images, .mediumInsert {
  text-align: center; }
  .medium-insert-images figure, .mediumInsert figure {
    margin: 24px 0 24px 0;
    display: block; }
    .medium-insert-images figure img, .mediumInsert figure img {
      max-width: 100%;
      margin-top: 1em;
      vertical-align: top; }
    .medium-insert-images figure:first-child img, .mediumInsert figure:first-child img {
      margin-top: 0; }
  .medium-insert-images.medium-insert-images-left, .medium-insert-images-left.mediumInsert, .mediumInsert.small {
    max-width: 50%;
    float: left;
    margin: 0 30px 20px 0; }
  .medium-insert-images.medium-insert-images-right, .medium-insert-images-right.mediumInsert {
    max-width: 50%;
    float: right;
    margin: 0 0 20px 30px; }
  .medium-insert-images.medium-insert-images-full, .medium-insert-images-full.mediumInsert {
    position:absolute;
    width: 100%;
    height: auto;
    left:0px;
    margin: 0 0 20px 0; }
  .medium-insert-images.medium-insert-images-grid, .medium-insert-images-grid.mediumInsert {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
            flex-wrap: wrap;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
        -ms-flex-align: start;
            align-items: flex-start;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin: 0.5em -0.5em; }
    .medium-insert-images.medium-insert-images-grid figure, .medium-insert-images-grid.mediumInsert figure {
      width: 33.33%;
      display: inline-block; }
      .medium-insert-images.medium-insert-images-grid figure img, .medium-insert-images-grid.mediumInsert figure img {
        max-width: calc(100% - 1em);
        margin: 0.5em; }

.medium-insert-embeds, .mediumInsert-embeds {
  text-align: center;
  position: relative; }
  .medium-insert-embeds iframe, .mediumInsert-embeds iframe {
    margin: 0 auto !important; }
  .medium-insert-embeds div, .mediumInsert-embeds div {
    margin: 0 auto !important; }
  .medium-insert-embeds.medium-insert-embeds-left, .medium-insert-embeds-left.mediumInsert-embeds {
    width:100%;
    margin: 0 auto !important; }
  .medium-insert-embeds.medium-insert-embeds-left iframe, .medium-insert-embeds-left.mediumInsert-embeds iframe{
    width:100%;
    min-height:365px;
    margin: 0 auto !important; }
  .medium-insert-embeds.medium-insert-embeds-right, .medium-insert-embeds-right.mediumInsert-embeds {
    width: 33.33%;
    float: right;
    margin: 0 0 20px 30px; }

.medium-insert-images figure, .mediumInsert figure, .medium-insert-embeds figure, .mediumInsert-embeds figure {

  position: relative; }
  .medium-insert-images figure figcaption, .mediumInsert figure figcaption, .medium-insert-embeds figure figcaption, .mediumInsert-embeds figure figcaption {
    position: relative;
    z-index: 1;
    display: block;
    text-align: center;
    margin: 10px 0;
    color: #ccc;
    font-size: 0.8em;
    font-style: italic;
    outline: 0 solid transparent; }
    .medium-insert-images figure figcaption:focus, .mediumInsert figure figcaption:focus, .medium-insert-embeds figure figcaption:focus, .mediumInsert-embeds figure figcaption:focus {
      outline: 0 solid transparent; }

.medium-editor-insert-plugin {
  outline: 0 solid transparent; }
  .medium-editor-insert-plugin:focus {
    outline: 0 solid transparent; }
  .medium-editor-insert-plugin .clearfix:before, .medium-editor-insert-plugin:before, .medium-editor-insert-plugin .clearfix:after, .medium-editor-insert-plugin:after {
    content: " ";
    display: table;
    clear: both; }
  .medium-editor-insert-plugin p {
    margin: 1em 0; }
  .medium-editor-insert-plugin progress {
    display: block;
    margin: 1em auto; }
  .medium-editor-insert-plugin .hide {
    display: none; }
  .medium-editor-insert-plugin.medium-editor-placeholder:after {
    padding: 1em 0; }
  .medium-editor-insert-plugin .medium-insert-buttons {
    position: absolute;
    color: ${props => props.theme.accentColor};
    font-size: 0.9em;
    left:-50px;}
    .medium-editor-insert-plugin .medium-insert-buttons button {
      position: relative;
      display: block;
      cursor: pointer;
      color: ${props => props.theme.accentColor};
      background: #fff;
      width: 45px;
      height: 45px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 2px solid ${props => props.theme.accentColor};
      /*line-height: 30px;*/
      left:-58px;
      top:-18px;
      text-align: center;
      }
    .medium-editor-insert-plugin .medium-insert-buttons .medium-insert-buttons-show {
      font-size: 20px;
      -webkit-transform: rotate(0);
          -ms-transform: rotate(0);
              transform: rotate(0);
      -webkit-transition: -webkit-transform 100ms;
              transition: transform 100ms; }
      .medium-editor-insert-plugin .medium-insert-buttons .medium-insert-buttons-show span {
        display: block;
        width: 30px;
        height: 30px;
        font-size: 40px;
        margin-top: -13px; }
      .medium-editor-insert-plugin .medium-insert-buttons .medium-insert-buttons-show.medium-insert-buttons-rotate {
        -webkit-transition: -webkit-transform 250ms;
                transition: transform 250ms;
        -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
                transform: rotate(45deg); }
    .medium-editor-insert-plugin .medium-insert-buttons .medium-insert-buttons-addons {
      margin: 0;
      padding: 0;
      list-style: none;
      display: none;
      position: relative;
      z-index: 2;
      left: 70px;
      top: -54px; }
      .medium-editor-insert-plugin .medium-insert-buttons .medium-insert-buttons-addons li {
        display: inline-block;
        margin: 0; }
        .medium-editor-insert-plugin .medium-insert-buttons .medium-insert-buttons-addons li .fa {
          font-size: 22px; }

.medium-insert-caption-placeholder {
  position: relative; }
  .medium-insert-caption-placeholder:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    content: attr(data-placeholder); }

.dragging {
  cursor: move; }

.medium-insert-image-active {
  outline: 2px solid ${props => props.theme.accentColor}; }

.medium-insert-images-toolbar {
  display: none; }

.medium-insert-images, .mediumInsert {
  margin: 1em 0; }
  .medium-insert-images .dragged, .mediumInsert .dragged {
    position: absolute;
    top: 0;
    opacity: .5;
    z-index: 2000; }
  .medium-insert-images .placeholder, .mediumInsert .placeholder {
    position: relative;
    margin: 0;
    padding: 0;
    border: none; }
  .medium-insert-images .medium-insert-images-progress, .mediumInsert .medium-insert-images-progress {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.4); }

.medium-insert-embeds-input {
  position: relative;
  color: ${props => props.theme.accentColor};
  z-index: 1;
  text-align: left; }

.medium-insert-embeds-placeholder {
  position: relative; }
  .medium-insert-embeds-placeholder:after {
    position: abso lute;
    top: 0;
    left: 0;
    content: attr(data-placeholder);
    color: #ccc; }

.medium-insert-embeds-selected .medium-insert-embed {
  outline: 2px solid ${props => props.theme.accentColor}; }

.medium-insert-embeds-toolbar {
  display: none; }
  .medium-insert-embeds .medium-insert-embeds-overlay, .mediumInsert-embeds .medium-insert-embeds-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0; }
  
  #highlight ul > li {
    font-family: 'cs_prajad','PT Sans', sans-serif;
    font-size: 18px;
    margin:10px 0 10px 0;
  }
  #highlight ol > li {
    font-family: 'cs_prajad','PT Sans', sans-serif;
    font-size: 18px;
    margin:10px 0 10px 0;
  }
  #highlight p {
    font-family: 'cs_prajad','PT Sans', sans-serif;
    font-size: 18px;
  }
  #paper p {
		font-family: 'cs_prajad','PT Sans', sans-serif;
		font-size: 18px;
		color: #222;
  }
  #paper p > img,
  #paper p > a > img {
    display: block;
    margin: auto;
  }

  #paper img {
    max-width: 100%;
  }

  #paper h2 {
    font-family: 'PT Serif', 'Mitr';
    font-size: 28px;
    font-weight:bold;
    color:#222;
  }
  #paper h3 {
    font-family: 'PT Serif', 'Mitr';
    font-size: 20px;
    font-weight: normal;
    color #222;
  }
  #paper a,
  #paper p > a {
    color: ${props => props.theme.accentColor};
    &:hover {
      cursor: pointer;
    }
  }
  #paper ul > li {
    font-family: 'cs_prajad','PT Sans', sans-serif;
    font-size: 18px;
    margin: 10px 0 10px 0;
  }
  #paper > hr {
		width: 100px;
		margin: 50px auto;
		border-top: 3px solid ${props => props.theme.accentColor};
  }
  #paper blockquote {
		border-left: 3px solid ${props => props.theme.accentColor};
		padding-left: 20px;
    margin: 40px 0px;
    margin-left: 32px;
    line-height: 40px;
    
		font-family: 'PT Serif','Mitr';
		font-size: 20px;
		color: #222;
  }

	#paper blockquote > * {
		font-family: 'PT Serif','Mitr';
		font-size: 20px;
		color: #222;
  }

  #paper table {
    border-collapse: collapse;
    word-wrap: break-word;
    table-layout: fixed;
  }

  #paper table td,
  #paper table th {
		font-family: 'cs_prajad','PT Sans', sans-serif;
    border: 1px solid ${props => props.theme.primaryColor};
    padding: 8px;
  }

  #paper table th {
    background:  ${props => props.theme.primaryColor};
    color: #FFF;
    padding: 10px auto;
  }

  #paper table tr:nth-child(even) {
    background: #FAFAFA;
  }
  
  h1 {
		font-size: 42px;
		color: ${props => props.theme.primaryColor};
	}
	
	.fr-element h2 {
		font-family: 'PT Serif','Mitr';
		font-size: 28px;
    font-weight: bold;
		color: #222;
	}
	
	.fr-element h3 {
		font-family: 'PT Serif','Mitr';
		font-size: 20px;
    font-weight: normal;
		color: #222;
	}

	.fr-element p {
		font-family: 'cs_prajad','PT Sans', sans-serif;
		font-size: 18px;
		color: #222;
	}
	
	.fr-element ol > li,
	.fr-element ul > li {
    	font-family: 'cs_prajad','PT Sans', sans-serif;
    	font-size: 18px;
    	margin: 10px 0 10px 0;
	}

	.fr-element a ,
	.fr-element p > a {
		color: ${props => props.theme.accentColor};
		
		&:hover {
			cursor: pointer;
		}
	}

	.fr-element hr {
		width: 100px;
		margin: 50px auto;
		border-top: 3px solid ${props => props.theme.accentColor};
	}

	.fr-view blockquote {
		border-left: 3px solid ${props => props.theme.accentColor};
		padding-left: 20px;
		margin: 40px 0px;
    margin-left: 32px;
    line-height: 40px;
    
		font-family: 'PT Serif','Mitr';
		font-size: 20px;
		color: #222;
	}

	.fr-view blockquote > * {
		font-family: 'PT Serif','Mitr';
		font-size: 20px;
		color: #222;
  }

  .fr-image-left {
    float: left !important;
    width: 60% !important;
    margin-right: 20px !important;
  }
  
  .fr-image-center {
    margin: auto !important;
    max-width: 100%!important;
    text-align: center !important;
  }
  
  .fr-image-center-medium {
    margin: auto !important;
    width: 75% !important;
    text-align: center !important;
  }
  
  .fr-image-right {
    float: right !important;
    width: 60% !important;
    margin-left: 20px !important;
  }

  .fr-image-full {
    margin: auto !important;
    width: 100% !important;
  }
  
  .fr-view table {
    border-collapse: collapse;
    word-wrap: break-word;
    table-layout: fixed;
  }

  .fr-view table td,
  .fr-view table th {
		font-family: 'cs_prajad','PT Sans', sans-serif;
    border: 1px solid ${props => props.theme.primaryColor};
    padding: 8px;
  }

  .fr-view table th {
    background:  ${props => props.theme.primaryColor};
    color: #FFF;
    padding: 10px auto;
  }

  .fr-view table tr:nth-child(even) {
    background: #FAFAFA;
  }
  
  .fr-selected-cell {
    border: 1px solid ${props => props.theme.primaryColor} !important;
    background: #FFFFFF;
    filter: invert(15%) !important;
  }
  
  .fr-text-caption {
    font-family: 'PT Sans', 'cs_prajad' !important;
    font-size: 16px !important;
    color: #8e8e8e !important;
    font-weight: normal;
  }
  
  .fr-text-source,
  .fr-text-source > a {
    font-family:'PT Sans', 'cs_prajad' !important;
    font-size: 16px !important;
    color: #8e8e8e !important;
    font-weight: normal;
  }
  .fr-video{
    width:100% !important;
    position:relative;
    margin:auto !important;
    display:block;
    top:0;
    left:0;
  }
  .fr-video iframe{
    display:block;
    margin:auto !important;
    text-align: center !important;
  }
  .fr-sticky-on{
    padding-top:60px;
  }
  @media (max-width: 480px) {
    #paper h2 {
      font-size: 24px;
    }
    .medium-insert-embeds figure{
      margin:0 !important;
    }
    .medium-insert-embeds iframe, .mediumInsert-embeds iframe {
      width:100% !important;
      height:auto !important;
      margin: 0 !important; 
    }
    .fr-image-center {
      margin: auto !important;
      width:100%;
      text-align: center !important;
    }
    
    .fr-image-center-medium {
      margin: auto !important;
      width: 100%;
      text-align: center !important;
    }
  
    .fr-video iframe{
      width:100% !important;
      text-align: center !important;
    }
  }
`
export default EditorCss
