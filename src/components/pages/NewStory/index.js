import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture,DropdownWithIcon,Alert,MenuList} from 'components'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Request from 'superagent'
import auth from 'components/auth'
import Snackbar from 'material-ui/Snackbar';
import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton'

import $ from 'jquery';

import "blueimp-file-upload/js/vendor/jquery.ui.widget.js";
import "blueimp-file-upload/js/jquery.iframe-transport.js";
import "blueimp-file-upload/js/jquery.fileupload.js";
import "blueimp-file-upload/js/jquery.fileupload-image.js";

import MediumEditor from 'medium-editor'
require('medium-editor-insert-plugin')($);

const Container = styled.form`
  width:100%;
  padding:60px;
  border-bottom:1px solid #E2E2E2;

  .medium-editor-insert-plugin p {
    font-family: 'PT Sans', 'cs_prajad', sans-serif;
    font-size: 18px;
  }
  .medium-editor-insert-plugin h2 {
    font-size: 28px;
    font-weight:bold;
    color:#222;
  }
  .medium-editor-insert-plugin h3 {
    font-size: 20px;
    font-weight:normal;
    color:#bfbfbf;
  }
  .medium-editor-insert-plugin blockquote {
    font-size: 20px;
    font-family: 'PT Serif', 'Mitr';
    font-weight:normal;
    color:#222;
    border-left: 1px solid #E2E2E2;
    padding-left:20px;
    display:inline-block;
  }          
`
const Paper = styled.div`
  position:relative;
  width:100%;
  min-height:500px;
  &:focus{
    outline: none;
  }
`
const Title = styled.textarea`
  margin:15px 0 0 0;
  font-size:36px;
  font-weight:bold;
  overflowY:hidden;
  color:#222;
  width:100%;
  outline: none;
  border:none;
  resize: none;
  &:focus{
    outline: none;
  }
`

const PublisherContact = React.createClass({
  getInitialState(){
  
    return{
      story:'Write a story ...'
    }
  },

  componentDidMount(){
    this.editor = new MediumEditor('#paper',{
      toolbar: {
        buttons: [
            {
                name: 'bold',
                contentDefault: '<span class="fa fa-bold" ></span>',
            },
            {
                name: 'italic',
                contentDefault: '<span class="fa fa-italic" ></span>',
            },
            {
                name: 'underline',
                contentDefault: '<span class="fa fa-underline" ></span>',
            },
            {
                name: 'h1',
                action: 'append-h2',
                aria: 'Header',
                tagNames: ['h2'],
                style:
                  { prop: 'font-size', value: '28px' }
                ,
                contentDefault: '<span class="fa fa-header" style="font-size:24px"><span>',
                classList: ['custom-class-h1'],
                attrs: {
                    'data-custom-attr': 'attr-value-h1'
                }
            },
            {
                name: 'h2',
                action: 'append-h3',
                aria: 'Subheader',
                tagNames: ['h3'],
                // style:[
                //   { prop: 'font-size', value: '20px' },
                //   { prop: 'color', value: '#bfbfbf' }
                // ],
                contentDefault: '<span class="fa fa-header" style="font-size:14px"><span>',
                classList: ['custom-class-h2'],
                attrs: {
                    'data-custom-attr': 'attr-value-h2'
                }
            },
            {
                name: 'quote',
                contentDefault: '<span class="fa fa-quote-left" ></span>',
            },   
            {
                name: 'anchor',
                contentDefault: '<span class="fa fa-link" ></span>',
            },   
            {
                name: 'justifyLeft',
                contentDefault: '<span class="fa fa-align-left" ></span>',
            },
                        {
                name: 'justifyCenter',
                contentDefault: '<span class="fa fa-align-center" ></span>',
            },
            {
                name: 'justifyRight',
                contentDefault: '<span class="fa fa-align-right" ></span>',
            }
        ]
    },
    targetBlank: true,
    placeholder: {
        text: 'Write a story ...'
    }
    });
    $('#paper').mediumInsert({
        editor: this.editor,
        addons: {
            images: {
                // autoGrid:2,
                // deleteScript: '/image/files/', // (string) A relative path to a delete script
                // deleteMethod: 'DELETE',
                // preview: true, // (boolean) Show an image before it is uploaded (only in browsers that support this feature)
                // captions: true, // (boolean) Enable captions
                // captionPlaceholder: 'upload image', // (string) Caption placeholder
                // fileUploadOptions: { // (object) File upload configuration. See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
                //     url: '/image', // (string) A relative path to an upload script
                //     acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i // (regexp) Regexp of accepted file types
                // }
            }
        }
    });
    //this.editor.setContent(this.state.story)
  },

 
  render(){
    var {error,textStatus,value,alert,alertConfirm,alertWhere,alertChild,alertDesc,snackbar,snackbarMS,cate} = this.state
    return(
      <Container onSubmit={this.updateData}>
        <div className='row'>
          <RaisedButton
            label="save"
            labelStyle={{fontWeight:'bold', fontSize:15, top:-2, fontFamily:"'Nunito', 'Mitr'"}}
            labelColor='#00B2B4'
            labelPosition="before"
            overlayStyle={{borderRadius: '20px'}}
			      rippleStyle={{borderRadius: '20px'}}
            style={{borderRadius:'20px', height:'40px', lineHeight:'40px', background:'none', boxShadow:'none'}}
	          buttonStyle={{borderRadius: '20px', background: 'none', border:'2px solid #00B2B4', padding:'0 2px'}}
            icon={<FontIcon className='material-icons'>keyboard_arrow_down</FontIcon>}
          />
        </div>

        <Title placeholder='Title' className='serif-font'></Title>

        <Paper id='paper'>

        </Paper>
        
      </Container>
    )
  },
})



export default PublisherContact