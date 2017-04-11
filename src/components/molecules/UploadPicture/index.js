import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'
//import Request from 'superagent'
import api from 'components/api'
import auth from 'components/auth'

const Container = styled.form`
  min-width:50px;
  min-height:50px;
`

const Box = styled.div`
  min-width:50px;
  min-height:50px;
  position:relative;
  top:0px;
  left:0px;
  width:${props => props.width}px;
  height:${props => props.height}px;
  border-radius:10px;
  border:1px dashed #C2C2C2;
  background-color:#F4F4F4;
  text-align:center;
  font-size:14px;
  color:${props=> props.theme.accentColor};
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
  position:relative;
  top:0px;
  left:0px;
  width:${props => props.width}px;
  height:${props => props.height}px;
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
  position:relative;
  top:0px;
  left:0px;
  width:${props => props.width}px;
  height:${props => props.height}px;
  background:rgba(0,0,0,0.3);
  text-align:center;
  font-size:14px;
  color:#fff;
  &:hover{
    cursor:pointer;
    text-decoration:underline;
  }
`

const Label = styled.span`
  position:relative;
  font-size:14px;
  color:${props=> props.theme.accentColor};
`

const UploadPicture = React.createClass({
  getDefaultProps() {
      return {
          width: 120,
          height:120,
          size:'120x120',
      };
  },
  getInitialState(){
    this.maxMB = this.props.maxMB ? parseFloat(this.props.maxMB) : 5
		this.allowTypes = this.props.allowTypes || '|jpg|png|jpeg|gif|svg+xml|'
    
    return {
      statePreview:this.props.src==null?false:true,
      preview: null, 
      //file: '', 
			msg: this.props.size,
      err:false
    }
  },

  componentWillReceiveProps(nextProps){
    if(nextProps.src!=this.props.src && nextProps.src!=null){
      this.setState({
        statePreview:true
      })
    }
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

    if(!file) return
    if(!this.isFiletypeValid(file)){
			this.setState({
				msg: 'File type invalid.',
				//file: file,
        err:true
			})
			return
		}
		
		if(!this.isFilesizeValid(file)) {
			this.setState({
				msg: 'File size couldn\'t allowed exceed '+this.maxMB+' MB',
				//file: file,
        err:true
			})
			return
		}

    reader.onload = (event)=>{
        this.setState({
          statePreview:true,
          //src:event.target.result
          preview: event.target.result
        })
    }

    reader.onloadend = (event) => {
      api.uploadFile(file, this.props.type, config.BACKURL + this.props.path)
    	.then(res => {
        this.setState({
          msg: 'Upload Completed!',
          err: false
        })
      })
      .catch(err => {
        this.setState({
          msg: err.message,
          err: true
        })
      })
    }      
    reader.readAsDataURL(file);     
  },

  render(){
    
    var {msg,statePreview,err,preview} = this.state
    var {label,style,type,width,height,labelStyle,src} = this.props
    var {theme} = this.context.setting.publisher
    
    //console.log('src', src)
    //console.log(msg)
    var description = <Des className='sans-font'>{msg}</Des>

    return(
      <Container encType="multipart/form-data" style={{...style,width:width,height:height+20+'px'}}>
        {!statePreview?<Box width={width} height={height} className="menu-font" onClick={()=>(dom(this.refs.imageLoader).click())}><Label style={{...labelStyle}}>{label?label:"Upload Picture"}</Label></Box>:''}
        <Preview width={width} height={height} ref='preview' style={{display:statePreview?'block':'none',backgroundImage:'url('+(preview || src)+')'}}>
          <Filter width={width} height={height} onClick={()=>(dom(this.refs.imageLoader).click())} ><Label style={{...labelStyle,color:'#fff'}}>Edit</Label></Filter>
        </Preview>
        <Des className='sans-font' style={{color:err?'#D8000C':'#c2c2c2'}}>{msg}</Des>
        <input type="file" ref="imageLoader" name="imageLoader" onChange={this.upload} style={{visibility:'hidden'}}/>
      </Container>
    )
  }
})

UploadPicture.propTypes = {
  style: PropTypes.object,
  labelStyle: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  label: PropTypes.string,
  type: PropTypes.string,
  src: PropTypes.string,
  path: PropTypes.string,
  size:PropTypes.string
}
UploadPicture.contextTypes = {
	setting: React.PropTypes.object
};
export default UploadPicture;