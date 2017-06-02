import React from 'react'
import styled from 'styled-components'

const EditorCss = styled.div`
 
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
    color: ${props=>props.theme.accentColor};
    font-size: 0.9em;
    left:-50px;}
    .medium-editor-insert-plugin .medium-insert-buttons button {
      position: relative;
      display: block;
      cursor: pointer;
      color: ${props=>props.theme.accentColor};
      background: #fff;
      width: 45px;
      height: 45px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 2px solid ${props=>props.theme.accentColor};
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
  outline: 2px solid ${props=>props.theme.accentColor}; }

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
  color: ${props=>props.theme.accentColor};
  z-index: 1;
  text-align: left; }

.medium-insert-embeds-placeholder {
  position: relative; }
  .medium-insert-embeds-placeholder:after {
    position: absolute;
    top: 0;
    left: 0;
    content: attr(data-placeholder);
    color: #ccc; }

.medium-insert-embeds-selected .medium-insert-embed {
  outline: 2px solid ${props=>props.theme.accentColor}; }

.medium-insert-embeds-toolbar {
  display: none; }

.medium-insert-embeds .medium-insert-embeds-overlay, .mediumInsert-embeds .medium-insert-embeds-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0; }

`
export default EditorCss
