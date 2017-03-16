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

const Container = styled.form`
  width:100%;
  padding:80px;
  border-bottom:1px solid #E2E2E2;
`
const Paper = styled.div`
  position:relative;
  width:100%;

`
const Title = styled.textarea`
  font-size:36px;
  font-weight:bold;
  color:#8f8f8f;
  width:100%;
  
`

const PublisherContact = React.createClass({
  getInitialState(){
  
    return{
      textStatus:'Unsave',
      value:1,
      error:false,
      alert:false,
      snackbar:false,
      snackbarMS:'',
      cate:[
        {value:1,text:'General'}
      ]
    }
  },

  componentDidMount(){

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


        <Paper id='paper'>

        </Paper>
        
      </Container>
    )
  },
})



export default PublisherContact