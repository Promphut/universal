import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton} from 'components'
import TextField from 'material-ui/TextField';
import auth from 'components/auth'
import Request from 'superagent'

const Container = styled.form`
  width:100%;
  padding:80px;
  border-bottom:1px solid #E2E2E2;
  .textTitle{
    color:#C2C2C2;
    font-family:'PT Sas';
    font-size:17px;
  }
  .head{
    color:#C2C2C2;
    font-family:'Nunito';
    font-size:18px;
  }
`
const Flex = styled.div`
  display:flex;
  items-align:center;
  flex-flow: row wrap;
  margin:50px 0 0 50px;
`
const Title = styled.div`
  flex:2 150px;
  max-width:150px;
  color:#C2C2C2;
  font-size:17px;
  padding-top:15px;
`
const Edit = styled.div`
  flex:6 450px;
  max-width:450px;
`
const Social = styled.div`
  color:#8F8F8F;
  font-size:19px;
  overflow:hidden;
`
const TextStatus = styled.div`
  color:#00B2B4;
  font-size:15px;
  font-style:italic;
  float:left;
  margin:10px 0 0 15px;
` 
const TextArea = styled.textarea`
  width:480px;
  height:193px;
  border:1px solid #E2E2E2;
  overflowY:auto;
  color:#8F8F8F;
  margin:20px 0 0 0;
`
// var analytic = `<script>
// (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-47600482-1', 'auto');ga('send', 'pageview');`
const PublisherAnalyticSetting = React.createClass({
  getInitialState(){
    return{
      textStatus:'Unsave',
      error:false
    }
  },

  componentDidMount(){
    this.setData()
  },

  setData(){
    var {analytic} = this.props.data.publisher
    document.getElementById('tagManagerId').value = typeof analytic == "undefined" ?'': analytic.tagManagerId
    this.setState({})
  },

  updateData(e){
    e.preventDefault()
    var self = this
    var data = {publisher : {
      analytic:{
        tagManagerId:document.getElementById('tagManagerId').value,
      }
    }}
    Request
      .patch(config.BACKURL+'/publishers/11?token='+auth.getToken())
      .set('x-access-token', auth.getToken())
      .set('Accept','application/json')
      .send(data)
      .end((err,res)=>{
        if(err) self.setState({textStatus:res.body.error.message,error:true})
        else{
          self.setState({textStatus:'Saved successfully',error:false})
        }
      })
  },


  render(){
    var {textStatus,error} =this.state
    return(
      <Container onSubmit={this.updateData} >
        <div  className="head sans-font">ANALYTIC</div>
        <Flex>
          <Title>
            <div className="sans-font">Google Tag<br/> Manager ID</div>
          </Title>
          <Edit>
             <TextField id='tagManagerId' name='tagManagerId' style={{marginTop:'20px'}}/>
          </Edit>
        </Flex>
        <div className='sans-font row' style={{marginTop:'80px'}}><PrimaryButton label='Save' type='submit' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' onClick={this.setData} style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus style={{color:error?'#D8000C':'#00B2B4'}}>{textStatus}</TextStatus></div>
      </Container>
    )
  },
})



export default PublisherAnalyticSetting