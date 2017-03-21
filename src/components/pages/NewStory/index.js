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
import Popover from 'material-ui/Popover'
import DropDownMenu from 'material-ui/DropDownMenu';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import moment from 'moment'

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
  h1{
    color:#00b2b4;
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
  color:#00b2b4;
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
    box-shadow: 0 0 10px #00b2b4;
  }
`
const Label = styled.div`
  color:#222;
  font-size:14px;
  display:inline;
  font-weight:bold;
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

const PublisherContact = React.createClass({
  getInitialState(){
  
    return{
      story:'Write a story ...',
      chooseLayout:null,
      layout:'',
      open:false,
      column:'',
      tag:[],
      addTag:[],
      pureTag:[],
      searchText:'',
      columnList:[],
      sid:null,
      saveStatus:'',
      prevState:''
    }
  },

  componentDidMount(){
    //this.editor.setContent(this.state.story)
    this.getTag()
    this.getColumn()
    setInterval(()=>{
      this.autoSave()
    },10000)
  },

  chooseNews(){
    this.setState({layout:'news'})
  },
  chooseArticle(){
    this.setState({layout:'article'})
  },
  selectedLayout(){
    this.setState({chooseLayout:1},()=>{
      this.editor = new MediumEditor('#paper',{
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
            }
        }
    });
    })
  },
  handleRequestClose(){
    this.setState({open:false})
  },

  popoverSave(e){
    this.setState({open:true,anchorEl:e.currentTarget})
  },

  chooseColumn(e,ind,val){
    this.setState({column:val})
  },

  getTag(){
    var self = this
    Request
    .get(config.BACKURL+'/publishers/'+config.PID+'/tags')
    .end((err,res)=>{
      if(err)throw err
      else{
        //console.log(res.body)
        var tag = []
        res.body.tags.map((data,index)=>{
          tag[index] = {text:data.name,value:index,id:data._id}
        })
        self.setState({tag:tag,pureTag:res.body.tags})
      }
      //console.log(res.body)
    })
  },
  getColumn(){
    var self = this
    Request
    .get(config.BACKURL+'/publishers/'+config.PID+'/columns')
    .end((err,res)=>{
      if(err)throw err
      else{
        //console.log(res.body)
        self.setState({columnList:res.body.columns})
      }
      //console.log(res.body)
    })
  },

  selectedTag(sel,index){
    //console.log('data',sel,'index',index)
    var addedTag = this.state.addTag
    var allTag = this.state.pureTag
    addedTag.push(sel)
    var tag = this.state.tag
    var newTag = this.state.tag
    tag.map((data,index)=>{
      if(data.text==sel.text){
        newTag.splice(index,1)
      }
    })
    //tag.splice(sel.valueKey,1)
    //console.log(addedTag)
    this.setState({addTag:addedTag,searchText:'',tag:newTag})
  },

  autoSave(){
    var self = this
    var {prevState} = this.state
    var allContents = this.editor.serialize(), 
      el = allContents["element-0"].value;
    if(this.state.sid){
      Request
        .patch(config.BACKURL+'/stories/'+this.state.sid+'?token='+auth.getToken())
        .send({story:{title:'test',publisher:11}})
        .end((err,res)=>{
          if(err)throw err
          else{
            //console.log(res.body)
            self.setState({
              saveStatus:res.body.updated
            })
          }
        })
    }else{
      if(prevState!=el){
          Request
            .post(config.BACKURL+'/stories?token='+auth.getToken())
            .send({story:{title:'test',publisher:11}})
            .end((err,res)=>{
              if(err)throw err
              else{
                console.log(res.body)
                self.setState({
                  sid:res.body.story._id,
                  saveStatus:res.body.updated
                })
              }
            })
        self.setState({prevState:el})
      }
    }
  },

  removeSelectedTag(data,index){
    var tag = this.state.tag
    tag.push(data)
    var addedTag = this.state.addTag
    addedTag.splice(index,1)
    this.setState({tag,addTag:addedTag})
  },

  handleUpdateInput(searchText){
    this.setState({
      searchText: searchText,
    });
  },

  render(){
    var {chooseLayout,layout,open,anchorEl,column,tag,addTag,searchText,columnList} = this.state
    const dataSourceConfig = {text: 'text',value: 'value',id:'id'};
    //console.log(tag)
    return(

      chooseLayout==null?
      <Container onSubmit={this.updateData}>
        <h1 className='nunito-font'>Choose Layout</h1>
        <div className='row' style={{marginTop:'60px'}}>
          <div className='col-6'>
            <Layout style={{backgroundImage:'url(/pic/news.png)',boxShadow:layout=="news"?'0 0 10px #00B2B4':''}} onClick={this.chooseNews} />
          </div>
          <div className='col-6'>
            <Layout style={{backgroundImage:'url(/pic/article.png)',boxShadow:layout=="article"?'0 0 10px #00B2B4':''}} onClick={this.chooseArticle} />
          </div>
        </div>
        <dvi className='row' style={{display:'block',overflow:'hidden'}}> 
          <RaisedButton
            label="next"
            labelStyle={{fontWeight:'bold', fontSize:15, top:0, fontFamily:"'Nunito', 'Mitr'"}}
            labelColor='#fff'
            onClick={this.selectedLayout}
            labelPosition="before"
            overlayStyle={{borderRadius: '20px'}}
            rippleStyle={{borderRadius: '20px'}}
            style={{borderRadius:'20px', height:'40px', lineHeight:'40px', background:'#00b2b4', boxShadow:'none',float:'right',margin:'50px 0 0 0'}}
            buttonStyle={{borderRadius: '20px', background: '#00b2b4', border:'2px solid #00B2B4', padding:'0 2px'}}
            icon={<FontIcon className='material-icons'>keyboard_arrow_right</FontIcon>}
          />
        </dvi>
        
      </Container>
      :
      layout=='news'?<Container onSubmit={this.updateData}>
           
        <RaisedButton
          onClick={this.popoverSave}
          label="save"
          labelStyle={{fontWeight:'bold', fontSize:15, top:0, fontFamily:"'Nunito', 'Mitr'"}}
          labelColor='#fff'
          labelPosition="before"
          overlayStyle={{borderRadius: '20px'}}
          rippleStyle={{borderRadius: '20px'}}
          style={{borderRadius:'20px', height:'40px', lineHeight:'40px', background:'#00b2b4', boxShadow:'none',float:'right'}}
          buttonStyle={{borderRadius: '20px', background: '#00b2b4', border:'2px solid #00B2B4', padding:'0 2px'}}
          icon={<FontIcon className='material-icons'>keyboard_arrow_down</FontIcon>}
        >
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          style={{border:'3px solid #00b2b4',width:'482px',padding:'30px',marginTop:8,boxShadow:'none',overflow:'hidden'}}
        >
          <div className='row' style={{display:'block',overflow:'hidden'}}>
            <Label className="nunito-font or" style={{float:'left',marginTop:'22px'}}>Column : </Label>
            <DropDownMenu
              value={column}
              onChange={this.chooseColumn}
              autoWidth={false}
              labelStyle={{top:'-11px'}}
              iconStyle={{top:'-8px'}}
              style={{margin:'15px 0 15px 15px',width:'340px',height:'34px',border:'1px solid #e2e2e2',float:'left'}}
              underlineStyle={{display:'none'}}
              menuStyle={{width:'320px'}}
              menuItemStyle={{width:'320px'}}
              selectedMenuItemStyle={{color:'#222',background:'#00b2b4'}}
            >
              {columnList.length!=0?columnList.map((data,index)=>(
                <MenuItem value={data._id} primaryText={data.name} key={index} />
              )):''}            
            </DropDownMenu>
          </div>
          <div className='row' style={{display:'block',overflow:'hidden'}}>
            <Label className="nunito-font" style={{float:'left',marginTop:'22px'}}>Add up to 5 tags : </Label>
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
          </div>
          <Divider/>
          <div>
            <Label className="nunito-font" >Select cover picture : </Label>
            <div className='row' style={{overflow:'hidden',marginTop:'20px'}}>
              <div className='col-4'>
                <UploadPicture path='/stories/:sid/cover' width='96px' height='137px' label='Portrait Cover' type='cover' style={{width:'96px',height:'137px',margin:'0 auto 0 auto'}}/>
              </div>
              <div className='col-1'>
                <div style={{marginTop:'58px'}}>Or</div>
              </div>
              <div className='col-6'>
                <UploadPicture path='/stories/:sid/cover' width='194px' height='137px' label='Portrait Cover' type='cover' style={{width:'194px',height:'137px',margin:'0 auto 0 auto'}}/>
              </div>
            </div>
          </div>
          <div className='row' style={{display:'block',overflow:'hidden',marginTop:'50px'}}>
            <Delete style={{float:'left',margin:'10px'}}>Delete this story</Delete>
            <PrimaryButton label="Publish" style={{float:'right'}}/>
            <SecondaryButton label="Save" style={{float:'right',marginRight:'20px'}}/>
          </div>
        </Popover>
        </RaisedButton>
        <TextStatus className='sans-font'>{"Saved at "+ moment(this.state.saveStatus).calendar()}</TextStatus> 

        <Title placeholder='Title' className='serif-font'></Title>

        <Paper id='paper'>

        </Paper>
        
      </Container>:
      <Container onSubmit={this.updateData}>
           
        <RaisedButton
          onClick={this.popoverSave}
          label="save"
          labelStyle={{fontWeight:'bold', fontSize:15, top:0, fontFamily:"'Nunito', 'Mitr'"}}
          labelColor='#fff'
          labelPosition="before"
          overlayStyle={{borderRadius: '20px'}}
          rippleStyle={{borderRadius: '20px'}}
          style={{borderRadius:'20px', height:'40px', lineHeight:'40px', background:'#00b2b4', boxShadow:'none',float:'right'}}
          buttonStyle={{borderRadius: '20px', background: '#00b2b4', border:'2px solid #00B2B4', padding:'0 2px'}}
          icon={<FontIcon className='material-icons'>keyboard_arrow_down</FontIcon>}
        >
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          style={{border:'3px solid #00b2b4',width:'482px',height:'501px',padding:'20px',marginTop:8,boxShadow:'none'}}
        >
          
        </Popover>
        </RaisedButton>
        <TextStatus className='sans-font'>Saved at 10.30 AM</TextStatus> 

        <Title placeholder='Title' className='serif-font'></Title>

        <Paper id='paper'>

        </Paper>
        
      </Container>
    )
  },
})



export default PublisherContact