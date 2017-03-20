import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'
import Request from 'superagent'
import auth from 'components/auth'

const Container = styled.form`
  width:227px;
`
const Box = styled.div`
  width:100%;
  height:56px;
  padding-top:17px;
  border-radius:10px;
  border:1px dashed #C2C2C2;
  background-color:#F4F4F4;
  text-align:center;
  font-size:14px;
  color:#00B2B4;
  &:hover{
    cursor:pointer;
    text-decoration:underline;
  }
`
const Des = styled.div`
  color:#C2C2C2;
  font-size:14px;
  font-style:italic;
` 

const Preview = styled.div`
  width:100%;
  height:108px;
  font-size:14px;
  background-size:cover;
  background-position:center;
  color:#fff;
  &:hover{
    cursor:pointer;
    text-decoration:underline;
  }
`
const Filter = styled.div`
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.5);
  text-align:center;
  font-size:14px;
  padding-top:48px;
  color:#fff;
  &:hover{
    cursor:pointer;
    text-decoration:underline;
  }
`

const UploadPicture = React.createClass({
  getInitialState(){

    this.maxMB = this.props.maxMB ? parseFloat(this.props.maxMB) : 5
		this.allowTypes = '|jpg|png|jpeg|gif|webp|svg|'
    return{
      statePreview:this.props.src==null?false:true,
      src:this.props.src,
      file: '', 
			msg: '',
      err:false
    }
  },

  componentWillReceiveProps(nextProps){
    this.setState({
      src: nextProps.src
    })
  },

  isFiletypeValid(file){
		let type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
		var fileTypeValid = this.allowTypes.indexOf(type) !== -1
		return fileTypeValid
	},

	isFilesizeValid(file){
		return file.size <= this.maxMB*1000000
	},

  upload(e){
    var reader = new FileReader();
    var file = e.target.files[0]

    // if(!this.isFiletypeValid(file)){
		// 	this.setState({
		// 		msg: 'File type invalid.',
		// 		file: file,
    //     err:true
		// 	})
		// 	return
		// }
		
		if(!this.isFilesizeValid(file)) {
			this.setState({
				msg: 'File size couldn\'t allowed exceed '+this.maxMB+' MB',
				file: file,
        err:true
			})
			return
		}

    reader.onload = (event)=>{
        this.setState({statePreview:true,src:event.target.result})
    }

    reader.onloadend = (event) => {
    	Request.post(config.BACKURL + this.props.path)
	    .set('x-access-token', auth.getToken())
      .attach(this.props.type, file, file.name)
      .end((err, res) => {
    	  let msg = 'Upload complete!'
        var err = false
    	  if(err) {
          msg = 'Upload Error : '+res.body.status
          err = true
        }
    	  this.setState({
    		  file: '',
    		  msg: msg,
          err:err
    	  })
        //console.log(res.body)
	    })
    }      
    reader.readAsDataURL(file);     
  },

  render(){
    var {msg,src,statePreview,err} = this.state
    
    var description = <Des className='sans-font'>{msg}</Des>
    return(
      <Container encType="multipart/form-data">
        {!statePreview?<Box className="menu-font" onClick={()=>(dom(this.refs.imageLoader).click())}>Upload Picture</Box>:''}
        <Preview ref='preview' style={{display:statePreview?'block':'none',backgroundImage:'url('+src+')'}}>
          <Filter onClick={()=>(dom(this.refs.imageLoader).click())}>Change Picture</Filter>
        </Preview>
        {msg!=''?<Des className='sans-font' style={{color:err?'#D8000C':'#00B2B4'}}>{msg}</Des>:''}
        <input type="file" ref="imageLoader" name="imageLoader" onChange={this.upload} style={{visibility:'hidden'}}/>
      </Container>
    )
  }
})
    
export default UploadPicture;