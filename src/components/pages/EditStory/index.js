import React from 'react'
import {Link,browserHistory} from 'react-router'
import styled from 'styled-components'
import {PrimaryButton, SecondaryButton, UploadPicture, DropdownWithIcon,
  Alert, MenuList} from 'components'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Request from 'superagent'
import auth from 'components/auth'
import Snackbar from 'material-ui/Snackbar';
import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import DropDownMenu from 'material-ui/DropDownMenu';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import moment from 'moment'
import CircularProgress from 'material-ui/CircularProgress';
import api from 'components/api'

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
  .medium-editor-insert-plugin ul > li {
    font-family: 'PT Sans', 'cs_prajad', sans-serif;
    font-size: 18px;
    margin:10px 0 10px 0;
  }
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
  h1{
    color:${props=> props.theme.primaryColor};
    font-size:42px;
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
  height:105px;
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

const Divider = styled.div`
  width:100%;
  min-height:1px;
  margin:30px 0 30px 0;
  background-color:#bfbfbf;
`

const TextStatus = styled.div`
  font-size:15px;
  font-style:italic;
  color:${props=> props.theme.accentColor};
  display:inline;
  float:right;
  padding:12px 20px 12px 20px;
`
const Layout = styled.div`
  width:307px;
  height:439px;
  background-position:center;
  background-size:cover;
  margin:0 auto 0 auto;
  &:hover{
    cursor:pointer;
    box-shadow: 0 0 10px ${props=> props.theme.primaryColor};
  }
`
const Label = styled.div`
  color:#222;
  font-size:14px;
  display:inline;
  font-weight:bold;
`
const Label2 = styled.div`
  color:#222;
  font-size:19px;
  margin:20px auto 20px auto;
  font-weight:bold;
  width:50px;
`
const Delete = styled.div`
  color:#bfbfbf;
  font-size:14px;
  text-decoration:underline;
  &:hover{
    cursor:pointer;
    color:#222;
  }
`

const EditStory = React.createClass({
  SAVE_STATUS: {
    'INITIAL': 0,
    'DIRTIED': 1,
    'UNDIRTIED': 2
  },

  getInitialState(){

    return {
      story:{},
      chooseLayout:null,
      layout:'news',
      open:false,
      column:'no',

      tag:[],
      addTag:[],
      pureTag:[],
      searchText:'',

      columnList:[],
      sid:this.props.params.sid,
      saveStatus:null,

      alert:false,

      title:'',

      saveOnload:false,
      publishStatus:'',

      status: this.SAVE_STATUS.INITIAL
    }
  },

  componentDidMount(){
    //this.editor.setContent(this.state.story)
    this.editor = new MediumEditor('#paper', {
      toolbar: {
        buttons: [
            {name: 'bold',contentDefault: '<span class="fa fa-bold" ></span>'},
            {name: 'italic',contentDefault: '<span class="fa fa-italic" ></span>'},
            {name: 'underline',contentDefault: '<span class="fa fa-underline" ></span>',},
            {
                name: 'h1',
                action: 'append-h2',
                aria: 'Header',
                tagNames: ['h2'],
                style:{ prop: 'font-size', value: '28px' },
                contentDefault: '<span class="fa fa-header" style="font-size:24px"><span>',
                classList: ['custom-class-h1'],
                attrs: {'data-custom-attr': 'attr-value-h1'}
            },
            {
                name: 'h2',
                action: 'append-h3',
                aria: 'Subheader',
                tagNames: ['h3'],
                contentDefault: '<span class="fa fa-header" style="font-size:14px"><span>',
                classList: ['custom-class-h2'],
                attrs: {'data-custom-attr': 'attr-value-h2'}
            },
            {name: 'quote',contentDefault: '<span class="fa fa-quote-left" ></span>'},
            {name: 'anchor',contentDefault: '<span class="fa fa-link" ></span>'},
            {name: 'unorderedlist',contentDefault: '<span class="fa fa-list-ul" ></span>'},
            {name: 'justifyLeft',contentDefault: '<span class="fa fa-align-left" ></span>'},
            {name: 'justifyCenter',contentDefault: '<span class="fa fa-align-center" ></span>'},
            {name: 'justifyRight',contentDefault: '<span class="fa fa-align-right" ></span>'}
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
            captionPlaceholder: 'Type caption for image',
            fileUploadOptions: {},
            styles: {
              full: {
                  label: this.state.layout=='article'?'<span class="fa fa-window-maximize"></span>':''
              }
            }
          }
        }
    });

    this.editor.subscribe('editableInput', this.handleEditableInput);

    this.interval = setInterval(this.autoSave, 3000)

    this.getTags()
    this.getColumns()
    this.getStoryDetail()

  },

  componentWillUnmount(){
    clearInterval(this.interval);
  },

  chooseNews(){
    this.setState({layout:'news'})
  },

  chooseArticle(){
    this.setState({layout:'article'})
  },

  selectedLayout(){
    this.setState({chooseLayout:1},()=>{})
  },

  handleEditableInput(e, editable){
    if(this.state.status === this.SAVE_STATUS.INITIAL) 
      this.setState({
        status: this.SAVE_STATUS.UNDIRTIED,
        saveStatus:''
      })
    else 
      this.setState({
        status: this.SAVE_STATUS.DIRTIED,
        saveStatus:'Unsave'
      })
  },

  handleRequestClose(){
    this.setState({open:false})
  },

  popoverSave(e){
    this.setState({
      open:true,
      anchorEl:e.currentTarget
    })
  },

  chooseColumn(e,ind,val){
    this.setState({column:val})
  },

  getStoryDetail(){
    let story = this.props.params.story
    //console.log('getStoryDetail', story)
    if(story){
      this.setState({
        story:story, 
        title:story.title,

        column: story.column ? story.column._id : 'no'
      })
  
      this.editor.setContent(story.html || '')
    }
  },

  getTags(){
    api.getTags()
    .then(tags => {
      let result = []
      tags.map((tag, i) => {
        result[i] = { text:tag.name, value:i, id:tag._id }
      })

      this.setState({
        tag:result,
        pureTag:tags
      })
    })
  },

  getColumns(){
    api.getColumns()
    .then(cols => {
      this.setState({columnList: cols})
    })
  },

  autoSave(){
    let {sid,title,column} = this.state
    let allContents = this.editor.serialize()
    let el =  allContents.paper.value

    if(this.state.status === this.SAVE_STATUS.DIRTIED){
      this.setState({
        saveStatus:'Saving...'
      })

      let s = {
        title:title,
        publisher:parseInt(config.PID),
        html:el
      }
      if(column!='no') s.column = column

      api.updateStory(sid, s)
      .then(story => {
        this.setState({
          status: this.SAVE_STATUS.UNDIRTIED,
          saveStatus:"Saved "+ moment(story.updated).calendar()
        })
      })
    }
  },

  publishStory(){
    let {sid,column,title} = this.state
    let allContents = this.editor.serialize()
    
    let s = {
      title:title,
      publisher:parseInt(config.PID),
      status:1,
      html:allContents.paper.value,
    }
    if(column!='no') s.column = column

    api.updateStory(sid, s)
    .then(story => {
      browserHistory.push(story.url)
    })
    .catch(err => {
      this.setState({
        publishStatus: err.message,
        open:false
      })
    })
  },

  unpublishStory(e){
    api.updateStory(this.state.sid, {status:0})
    .then(story => {
      this.setState({
        sid: story._id,
        saveStatus: "Story has been unpublished.",
        open:false,
        story: {
          status: 0
        }
      })
    })
    .catch(err => {
      this.setState({
        publishStatus: err.message,
        open:false
      })
    })
  },

  deleteStory(){
    api.deleteStory(this.state.sid)
    .then(() => {
      browserHistory.push('/me/stories')
    })
  },

  selectedTag(sel,index){
    var {tag,addTag,pureTag,sid} = this.state
    //console.log(sel)
    Request
    .post(config.BACKURL+'/stories/'+sid+'/tags/'+sel.id+'?token='+auth.getToken())
    .end((err,res)=>{
      if(err)throw err
      else{
        var addedTag = addTag
        var allTag = pureTag
        addedTag.push(sel)
        var Tag = tag
        var newTag = tag
        Tag.map((data,index)=>{
          if(data.text==sel.text){
            newTag.splice(index,1)
          }
        })
        this.setState({
          addTag:addedTag,
          searchText:'',
          tag:newTag
        })
      }
    })
  },

  removeSelectedTag(data,index){
    var {sid,tag,addTag} = this.state
    //console.log(data)
    Request
    .delete(config.BACKURL+'/stories/'+sid+'/tags/'+data.id+'?token='+auth.getToken())
    .end((err,res)=>{
      if(err)throw err
      else{
          var Tag = tag
          Tag.push(data)
          var addedTag = addTag
          addedTag.splice(index,1)
          this.setState({
            tag:Tag,
            addTag:addedTag
          })
      }
    })
  },

  handleUpdateInput(searchText){
    this.setState({
      searchText: searchText,
    });
  },

  alertClose(){
    this.setState({alert:false})
  },

  showAlert(e){
    this.setState({
      alert:true,
      alertWhere:e.currentTarget,
      alertDesc:'Are you sure to delete this story ?',
      alertConfirm:this.deleteStory
    })
  },

  titleChanged(e){
    if(this.state.status===this.SAVE_STATUS.DIRTIED)
      this.setState({
        title:e.target.value,
        saveStatus:'Unsave'
      })
    else
      this.setState({
        title:e.target.value,
        status:this.SAVE_STATUS.DIRTIED,
        saveStatus:'Unsave'
      })
  },

  render(){
    let {chooseLayout,layout,open,anchorEl,column,tag,addTag,searchText,columnList,sid,
          alert,alertWhere,alertConfirm,alertDesc,saveStatus,title,publishStatus,story} = this.state
    const dataSourceConfig = {text: 'text', value: 'value', id:'id'};
    let {theme} = this.context.setting.publisher

    //console.log('COL', column)

    //console.log(tag)
    return (
      <Container onSubmit={this.updateData}>
        <Alert
          open={alert}
          anchorEl={alertWhere}
          onRequestClose={this.alertClose}
          description={alertDesc}
          confirm={alertConfirm}/>
        <RaisedButton
          onClick={this.popoverSave}
          label="Publish"
          labelStyle={{fontWeight:'bold', fontSize:15, top:0, fontFamily:"'Nunito', 'Mitr'"}}
          labelColor='#fff'
          labelPosition="before"
          overlayStyle={{borderRadius: '20px'}}
          rippleStyle={{borderRadius: '20px'}}
          style={{borderRadius:'20px', height:'40px', lineHeight:'40px', background:theme.accentColor, boxShadow:'none',float:'right',visibility:sid!=null?'visible':'hidden'}}
          buttonStyle={{borderRadius: '20px', background: theme.accentColor, border:'2px solid '+theme.accentColor, padding:'0 2px'}}
          icon={<FontIcon className='material-icons'>keyboard_arrow_down</FontIcon>}
        >
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          style={{border:'3px solid '+theme.accentColor,width:'482px',padding:'30px',marginTop:8,boxShadow:'none',overflow:'hidden'}}
        >
          <div className='row' style={{display:'block',overflow:'hidden'}}>
            <Label className="nunito-font or" style={{float:'left',marginTop:'22px'}}>Column : </Label>
            <DropDownMenu
              value={column}
              onChange={this.chooseColumn}
              autoWidth={false}
              labelStyle={{top:'-11px'}}
              iconStyle={{top:'-8px',left:'300px'}}
              style={{margin:'15px 0 15px 15px',width:'340px',height:'34px',border:'1px solid #e2e2e2',float:'left'}}
              underlineStyle={{display:'none'}}
              menuStyle={{width:'320px'}}
              menuItemStyle={{width:'320px'}}
              selectedMenuItemStyle={{color:'#222',background:theme.accentColor}}
            >
              <MenuItem value='no' primaryText='No Column' />
              {columnList.length!=0 && columnList.map((data,index)=>(
                <MenuItem value={data._id} primaryText={data.name} key={index} />
              ))}
            </DropDownMenu>
          </div>
          {/*next interation*/}
          {/*<div className='row' style={{display:'block',overflow:'hidden'}}>
            <Label className="nunito-font" style={{float:'left',marginTop:'26px'}}>Add up to 5 tags : </Label>
            <div className='row' style={{marginTop:'15px'}}>
              {addTag.length!=0?addTag.map((data,index)=>(
                <Chip
                  key={index}
                  onRequestDelete={() => this.removeSelectedTag(data,index)}
                  style={{margin:'4px'}}
                >
                  {data.text}
                </Chip>
              )):''}
              {tag.length!=0?<AutoComplete
                hintText="Add a Tag..."
                dataSource={tag}
                filter={AutoComplete.fuzzyFilter}
                onNewRequest={this.selectedTag}
                onUpdateInput={this.handleUpdateInput}
                openOnFocus={true}
                searchText={searchText}
                dataSourceConfig={dataSourceConfig}
              />:''}
            </div>
          </div>*/}
          <Divider/>
          <div>
            <Label className="nunito-font" >Select cover picture : </Label>
            <div className='row' style={{overflow:'hidden',marginTop:'20px'}}>
              <div className='col-4'>
                <UploadPicture path={'/stories/'+sid+'/covermobile'} src={story.coverMobile} width='96px' height='137px' label='Portrait Cover' type='coverMobile' style={{width:'96px',height:'137px',margin:'0 auto 0 auto'}} labelStyle={{top:'60px'}}/>
              </div>
              <div className='col-1'>
                <div style={{marginTop:'58px'}}>Or</div>
              </div>
              <div className='col-6'>
                <UploadPicture path={'/stories/'+sid+'/cover'} src={story.cover} width='194px' height='137px' label='Landscape Cover' type='cover' style={{width:'194px',height:'137px',margin:'0 auto 0 auto'}} labelStyle={{top:'60px'}}/>
              </div>
            </div>
          </div>
          <div className='row' style={{overflow:'hidden',display:'block'}}>
            <TextStatus className='sans-font' style={{color:'#DC143C',float:'right',marginTop:'30px'}}>{publishStatus}</TextStatus>
          </div>
          <div className='row' style={{display:'block',overflow:'hidden',marginTop:'0px'}}>
            <Delete style={{float:'left',margin:'10px'}} onClick={this.showAlert}>Delete</Delete>
            <PrimaryButton label={story.status===1 ? moment(story.published).format('ddd, [at] h:mm a') : 'Publish'} style={{float:'right'}} onClick={this.publishStory} iconName="done"/>
            {/*<SecondaryButton label="Save" style={{float:'right',marginRight:'20px'}} onClick={this.save}/>*/}
            {story.status===1 && <SecondaryButton label="Unpublish" style={{float:'right',marginRight:'20px'}} onClick={this.unpublishStory}/>}
          </div>
        </Popover>
        </RaisedButton>
        {sid!=null && <TextStatus className='sans-font'>{saveStatus}</TextStatus>}

        <Title placeholder='Title' className='serif-font' value={title} onChange={this.titleChanged}/>

        <Paper id='paper'>

        </Paper>
      </Container>
    )
  }
})

EditStory.contextTypes = {
	setting: React.PropTypes.object
};

export default EditStory
