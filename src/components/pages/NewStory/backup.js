import React, { Component }  from "react";
import {Link} from 'react-router'
// import ImgUpload from './Image-Upload';
// import Tags from './articleTag'; 
import auth from './auth';
import Request from 'superagent';
// import ValidateBox from './ValidationTextbox';
// import MediumEditor from 'medium-editor'
// require('medium-editor-insert-plugin')($);

const NewStory = React.createClass({
  getInitialState() {
    //console.log('publisher', this.props.params.publisher)
    this.publisher = this.props.params.publisher
    //this.article = this.props.params.article || {}
    return {
        text: '<p>เขียนบทความ...</p>' ,
        saveStatus :'Unsave',
        title:'ชื่อบทความของคุณ',
        coverPictureDesktop:"",
        aid:null,
        article:{},
        column:[],
        columnSelect:'',
        slug:'',
        validateStatus:'',
        validateText:''
      };
  },

  componentWillMount() {
    
  },

  getColumnFromPid(){
    var url = config.BACKURL + '/publishers/'+this.publisher.id+'/columns?editor=1&token='+auth.getToken()
    Request
      .get(url)
      .set('Accept','application/json')
      .end((err,res)=>{
        this.setState({column:res.body})
      })
  },

  componentDidMount(){
    var  MediumEditor = require('medium-editor')
    require('medium-editor-insert-plugin')($);
    this.editor = new MediumEditor('.editable');
    $('.editable').mediumInsert({
        editor: this.editor,
        // addons: {
        //     images: {
        //         deleteScript: '/image/files/', // (string) A relative path to a delete script
        //         deleteMethod: 'DELETE',
        //         preview: true, // (boolean) Show an image before it is uploaded (only in browsers that support this feature)
        //         captions: true, // (boolean) Enable captions
        //         captionPlaceholder: 'upload image', // (string) Caption placeholder
        //         fileUploadOptions: { // (object) File upload configuration. See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
        //             url: '/image', // (string) A relative path to an upload script
        //             acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i // (regexp) Regexp of accepted file types
        //         }
        //     }
        // }
    });
    this.editor.setContent(this.state.text)
    // this.getColumnFromPid()
    // this.autoSave()
  },


  submit(){
    var allContents = this.editor.serialize(),
        el = allContents["element-0"].value;
    this.setState({text:el})
    //console.log(this.state.text)
    var errorText = ''
    if($('#select-column').val()==''){
      errorText=" Please select column. "
    }
    if(typeof this.uploadedCoverDes==='undefined'){
      errorText+=" Please upload cover photo for desktop. "
    }
    if(typeof this.uploadedCoverMob==='undefined'){
      errorText+=" Please upload cover photo for mobile. "
    }
    if($('#select-column').val()==''||typeof this.uploadedCoverDes==='undefined'||typeof this.uploadedCoverMob==='undefined'){
      this.setState({validateText:errorText,validateStatus:'error'})
    }else{
      var dataS = {
      article:{
        title: this.state.title,
        html: el,
        status: 1,
        slug:this.slugify($('#slug').val()) ,
        column:$('#select-column').val()
      },
      token:auth.getToken()
      }
      //console.log(dataS)
    Request
      .patch(config.BACKURL + "/publishers/"+this.publisher.id+'/articles/'+this.state.aid)
      .set('Accept','application/json')
      .send(dataS)
      .end((err,res)=>{
        if(!err){
          this.setState({saveStatus:'Saved'})
          location.pathname = this.publisher.url
          //console.log(res.body)
        }else{
          this.setState({saveStatus:'Unsave'})
        }
      })
    }
  },

  autoSave(){
    if(this.state.aid==null){
      Request
        .post(config.BACKURL + "/publishers/"+this.publisher.id+'/articles')
        .send({token:auth.getToken()})
        .set('Accept','application/json')
        .end((err,res)=>{
          if(!err){
            //console.log(res.body)
            this.setState({aid:res.body.id,article:res.body})
          }else{
            //console.log(err)
          }
        })
    }
    var self = this
    var older = ''
    this.autoSaveInterval = setInterval(function(){
      var allContents = self.editor.serialize(), 
      el = allContents["element-0"].value;
      self.setState({text:el})
      if(older!=el){
        //console.log(self.state.text)
        older = el;
        var dataS = {
          article:{
          title:self.state.title,
          html:older,
          status: 0,
          slug:self.slugify($('#slug').val()),
          column:$('#select-column').val()
        },
          token:auth.getToken()
        }
        Request
          .patch(config.BACKURL + "/publishers/"+self.publisher.id+'/articles/'+self.state.aid)
          .set('Accept','application/json')
          .send(dataS)
          .end((err,res)=>{
            if(!err){
              self.setState({saveStatus:'Saved',article:res.body})
              //this.html = res.body
              //console.log(res.body)
            }else{
              self.setState({saveStatus:'Unsave'})
            }
          })
      }   
    },10000)
  },

  componentWillUnmount(){
    clearInterval(this.autoSaveInterval);
  },

  showPopUpPub(e){
    //e.preventDefault()
    $("#publish-modal").css('display','Block')
    //return false;
  },

  onChange(text) {
    this.setState({text:text,saveStatus:"Unsave"})
  },
  showText(){
    //console.log(this.state.text)

  },
  changeHead(h){
    this.setState({title:h.target.value})
  },

  loadFile(event){
    var self = this
    var reader = new FileReader();
    reader.onload = function(){
      if(self.state.srcImg=="desktop"){
        self.setState({coverPictureDesktop:reader.result})
      }
      var output = document.getElementById(self.state.srcImg);
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  },

  toggleDesktop(){
    $('#uploadCoverModal').modal('hide')
  },

  toggleMobile(){
    $('#uploadCoverModal').modal('hide')
  },

  cancelUpload(){
    $("#btn-upload-desktop").css("display","block")
    $(".editor__template--modal-upload-cover-preview-desktop").css("display","none")
    $("#btn-upload-mobile").css("display","block")
    $(".editor__template--modal-upload-cover-preview-mobile").css("display","none")
  },

  previewCover(){
    var self = this
    $('#uploadCoverModal').modal('hide')
    $("#uploadCoverPhoto").hide()
    $("#coverPhoto").show(function(){
      var src = "url("+ self.state.coverPictureDesktop+ ")"
      $(this).css("background-image",src)
    })
  },

  previewCovDes(res,url){
    //console.log(res)
    this.uploadedCoverDes = res
    var output = document.getElementById("desktop");
    output.src = url;
    $(".editor__template--modal-upload-cover-preview-desktop").css("display","block")
    $("#btn-upload-desktop").css("display","none")  
    $('#uploadCoverModal').modal('show')
    this.setState({coverPictureDesktop:url})
  },

  previewCovMol(res,url){
    //console.log(res)
    this.uploadedCoverMob = res
    var output = document.getElementById("mobile");
    output.src = url;
    $(".editor__template--modal-upload-cover-preview-mobile").css("display","block")
    $("#btn-upload-mobile").css("display","none")
    $('#uploadCoverModal').modal('show')
  },

  saveDraft(){
    var allContents = this.editor.serialize(), el = allContents["element-0"].value;
    this.setState({text:el})
    var dataS = {
      article:{
        title:this.state.title,
        html:el,
        status: 0,
        slug:this.slugify($('#slug').val()),
        column:$('#select-column').val()
      },
      token:auth.getToken()
      }
    Request
      .patch(config.BACKURL + "/publishers/"+this.publisher.id+'/articles/'+this.state.aid)
      .set('Accept','application/json')
      .send(dataS)
      .end((err,res)=>{
        if(!err){
          this.setState({saveStatus:'Saved',article:res.body})
          //console.log(res.body)
        }else{
          this.setState({saveStatus:'Unsave'})
        }
      })
  },
  selectedColumn(e){
    //console.log(e.target.id)
    this.setState({columnSelect:e.target.value})
  },

  editSlug(e){
    var article = this.state.article
    article.slug = e.target.value
    this.setState({article:article})
  },

  slugify(text){
		return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^a-zA-Z\u0E01-\u0E39\u0E40-\u0E4D0-9-]+/g, '')       // Remove all non-word (support Thai language)
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
	},

  show(){
    
  },

  // shouldComponentUpdate(nextProps, nextState){
  //   //console.log( nextState.title);
  //   //console.log( this.state.title);

  //   return false;  
    
  // },

  writeArticle(e){
    //this.setState({text:e.target})
    //console.log(e)
  },

  render() {
    //console.log(this.state.article)
    var columnList=[]
    for(let i=0;i<this.state.column.length;i++){
      columnList.push(
        <option key={i} value={this.state.column[i].id} >{this.state.column[i].name}</option>
      )
    }
    return (
      <div className="container-setting" >

        <ImgUpload preview={this.previewCovDes} id="uploadCovDes" ratio={1140/420} url={config.BACKURL + "/publishers/"+this.publisher.id+"/articles/"+this.state.aid+"/cover"}></ImgUpload>
        <ImgUpload preview={this.previewCovMol} id="UploadCovMob" ratio={400/710} url={config.BACKURL + "/publishers/"+this.publisher.id+"/articles/"+this.state.aid+"/covermobile"}></ImgUpload>
        
        <div className="modal" id="uploadCoverModal"> 
         <div className="editor__template--uploadCover" id="">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
          <div className="editor__template--modal-upload-cover">UPLOAD COVER PHOTOS</div>
          <div className="row" >
            <div className="col-md-6">
              <div className="editor__template--modal-upload-cover-subhead">Add Cover Photo<br/> For Desktop</div>
              <div className="editor__template--modal-upload-cover-icon" id="btn-upload-desktop">
              <a href="#" className="editor__template--cover-btn-text center" data-toggle="modal" data-target="#uploadCovDes" onClick={this.toggleDesktop} style={{textAlign:"center",marginTop:"15px",marginRight:"15px"}}>
                <span className="glyphicon glyphicon-camera editColumn--cover-btn-icon" style={{}}></span></a>
                </div>
               <div className="editor__template--modal-upload-cover-preview-desktop displayNone" style={{marginTop:"29px"}}>
                <img id="desktop" src="" style={{width:"116.4px",height:"auto"}}/>
               </div> 
              <div className="editor__template--modal-upload-cover-text" style={{marginTop:"29px"}}>Resolution<br/>1140x420 px</div>
            </div>
            <div className="col-md-6">
              <div className="editor__template--modal-upload-cover-subhead">Add Cover Photo <br/>For Mobile</div>
              <div className="editor__template--modal-upload-cover-icon" id="btn-upload-mobile">
              <a href="#" className="editor__template--cover-btn-text center" data-toggle="modal" data-target="#UploadCovMob" onClick={this.toggleMobile} style={{textAlign:"center",marginTop:"15px",marginRight:"15px"}}> 
                <span className="glyphicon glyphicon-camera editColumn--cover-btn-icon" style={{}}></span></a></div>
              <div className="editor__template--modal-upload-cover-preview-mobile displayNone">
                <img id="mobile" src="" style={{width:"46px",height:"auto"}}/>
               </div> 
              <div className="editor__template--modal-upload-cover-text">Resolution<br/>400x710 px</div>
            </div>
            <div className="col-md-12">
              <button className="btn btn-info center" style={{width:"150px"}} onClick={this.previewCover} type="button">Ok</button>
            </div>
          </div>
         </div>
        </div>

        <div className="editor__template--container">
          <div className="">
            <div className="editor__template--cover " id="uploadCoverPhoto">
                <a href="#" className="editor__template--cover-btn-text center"data-toggle="modal" data-target="#uploadCoverModal" style={{textAlign:"center",paddingTop:"40px"}}>
                <span className="glyphicon glyphicon-camera editColumn--cover-btn-icon" style={{marginLeft:"0px"}}></span><br/><br/>Add cover photos</a>
            </div>
            <div className="article__template-cover-pic displayNone" id="coverPhoto">
              <div><a href="#" className="float-right editColumn--cover-btn" onClick={this.cancelUpload} data-toggle="modal" data-target="#uploadCoverModal" style={{color:"white"}}><span className="glyphicon glyphicon-camera editColumn--cover-btn-icon"></span></a></div>
            </div>
            <input className="form-control" style={{fontSize:"28px",border:"0px",paddingLeft:"60px"}} value={this.state.title} onChange={this.changeHead}/>
          



            <div className="editable editor__template--content" onChange={this.writeArticle}>
              
            </div>



            <div className="row editor__template--select-column">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="control-label" htmlFor="select-column">Select Column</label>
                  <select className="form-control" id="select-column">
                    <option  value=""></option>
                    {columnList}
                  </select>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="control-label" htmlFor="slug">Edit Slug</label>
                  <input type="text" className="form-control" id="slug" value={this.state.article.slug} placeholder="/Your-slug" onChange={this.editSlug}/>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="control-label" htmlFor="save-Status">Status</label>
                  <input type="text" className="form-control" onChange={this.show} value={this.state.saveStatus} id="save-status"/>
                </div>
              </div>
            </div>

            {/*<Tags detail={this.state.article}/>*/}
          </div>
          
        </div>
        <div className="row" style={{marginTop:"20px",marginBottom:"50px"}}>
          <div className="col-md-6">
            {/*<ValidateBox status={this.state.validateStatus} text={this.state.validateText}></ValidateBox>*/}
          </div>
          <div className="col-md-3">
            <button className="btn btn-default btn-lg btn-block" type="button" onClick={this.saveDraft}> SAVE </button>
          </div>
          <div className="col-md-3">
            <button className="btn btn-info btn-lg btn-block" onClick={this.submit}  type="button" > PUBLISH </button>
          </div>
        </div>
 
      </div>
    );
  },

});

export default NewStory;



