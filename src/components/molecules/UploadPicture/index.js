import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'
import Request from 'superagent'
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
  width:${props => props.width};
  height:${props => props.height};
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
  position:relative;
  top:0px;
  left:0px;
  width:${props => props.width};
  height:${props => props.height};
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
  width:${props => props.width};
  height:${props => props.height};
  background:rgba(0,0,0,0.5);
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
  color:#00B2B4;
`

const UploadPicture = React.createClass({
  getInitialState(){

    this.maxMB = this.props.maxMB ? parseFloat(this.props.maxMB) : 5
		this.allowTypes = '|jpg|png|jpeg|gif|webp|svg|'
    return{
      statePreview:this.props.src==null?false:true,
      src:this.props.src,
      preview: null, 
      //file: '', 
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

    if(!file) return
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
    	Request.post(config.BACKURL + this.props.path)
	    .set('x-access-token', auth.getToken())
      .attach(this.props.type, file, file.name)
      .end((err, res) => {

    	  let msg = 'Upload complete!',
            isError = false

    	  if(err) {
          msg = 'Upload Error : '+res.body.status
          isError = true
        }

        //console.log('onloadend', res.body.sizes.medium)

    	  this.setState({
    		  //file: '',
          //src: res.body.sizes && res.body.sizes.medium+'?'+Math.random()*10000,
    		  msg: msg,
          err:isError
    	  })
        //console.log(res.body)
	    })
    }      
    reader.readAsDataURL(file);     
  },

  render(){
    var {msg,src,statePreview,err,preview} = this.state
    var {label,style,type,width,height,labelStyle} = this.props

    //console.log('src', src)
    
    var description = <Des className='sans-font'>{msg}</Des>

    return(
      <Container encType="multipart/form-data" style={{...style,width:width,height:height}}>
        {!statePreview?<Box width={width} height={height} className="menu-font" onClick={()=>(dom(this.refs.imageLoader).click())}><Label style={{...labelStyle}}>{label?label:"Upload Picture"}</Label></Box>:''}
        <Preview width={width} height={height} ref='preview' style={{display:statePreview?'block':'none',backgroundImage:'url('+(preview || src+'?'+Math.random()*10000)+')'}}>
          <Filter width={width} height={height} onClick={()=>(dom(this.refs.imageLoader).click())} ><Label style={{...labelStyle,color:'#fff'}}>Change Picture</Label></Filter>
        </Preview>
        {msg!=''?<Des className='sans-font' style={{color:err?'#D8000C':'#00B2B4'}}>{msg}</Des>:''}
        <input type="file" ref="imageLoader" name="imageLoader" onChange={this.upload} style={{visibility:'hidden'}}/>
      </Container>
    )
  }
})

UploadPicture.propTypes = {
  style: PropTypes.object,
  labelStyle: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  src: PropTypes.string,
  path: PropTypes.string
}
    
export default UploadPicture;