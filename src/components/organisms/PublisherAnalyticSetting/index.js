import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton} from 'components'
import TextField from 'material-ui/TextField';
import auth from 'components/auth'
import api from 'components/api'
import utils from 'components/utils'
//import Request from 'superagent'

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
  color:${props=> props.theme.primaryColor};
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
    return {
      //publisher:{},
      analytic: {
        tagManagerId: '',
        quantcastAcc: '',
        chartbeatUid: ''
      },

      textStatus:'Unsave',
      error:false
    }
  },

  componentWillReceiveProps(nextProps){
    if(nextProps.analytic != this.props.analytic){
      //console.log('componentWillReceiveProps', nextProps.analytic)
      this.analytic = _.cloneDeep(nextProps.analytic) // saved for reset

      this.setState({
        analytic: nextProps.analytic
      })
    }
  },

  analyticChanged(e){
    const name = e.target.name
    let analytic = _.cloneDeep(this.state.analytic)
    //console.log('publisherChanged', analytic, name, e.target.value)
    utils.set(analytic, name, e.target.value)
    this.setState({
      analytic: analytic
    })
  },

  updateAnalytic(e){
    if(e) e.preventDefault()

    api.updatePublisher({analytic: this.state.analytic})
    .then(pub => {
      this.analytic = pub.analytic
      //console.log('updateAnalytic', this.analytic)

      this.setState({
        textStatus:'Saved successfully',
        error:false
      })
    })
    .catch(err => {
      this.setState({
        textStatus:res.body.error.message,
        error:true
      })
    })
  },

  resetDate(e){
    if(e) e.preventDefault()

    this.setState({
      analytic: this.analytic
    })
  },

  //componentDidMount(){
     //this.getPublisherId()
  //},

  // getPublisherId(){
  //   var self = this
  //   var user = auth.getUser()
  //   Request
  //     .get(config.BACKURL+'/publishers/'+config.PID)
  //     .set('Accept','application/json')
  //     .end((err,res)=>{
  //       if(err) throw err 
  //       else{
  //         self.setState({publisher:res.body.publisher})
  //         self.setData()
  //       }
  //     })
  // },

  // setData(){
  //   var {analytic} = this.state.publisher
  //   document.getElementById('tagManagerId').value = !analytic?'': analytic.tagManagerId
  //   this.setState({})
  // },

  // updateData(e){
  //   e.preventDefault()
  //   var self = this
  //   var data = {publisher : {
  //     analytic:{
  //       tagManagerId:document.getElementById('tagManagerId').value,
  //     }
  //   }}
  //   Request
  //     .patch(config.BACKURL+'/publishers/'+config.PID+'?token='+auth.getToken())
  //     .set('x-access-token', auth.getToken())
  //     .set('Accept','application/json')
  //     .send(data)
  //     .end((err,res)=>{
  //       if(err) self.setState({textStatus:res.body.error.message,error:true})
  //       else{
  //         self.setState({textStatus:'Saved successfully',error:false})
  //       }
  //     })
  // },


  render(){
    let {textStatus, error, analytic} = this.state
    var {theme} = this.context.setting.publisher

    return(
      <Container onSubmit={this.updateAnalytic} >
        <div  className="head sans-font">ANALYTIC</div>
        <Flex>
          <Title>
            <div className="sans-font">Google Tag<br/> Manager ID</div>
          </Title>
          <Edit>
             <TextField name='tagManagerId' onChange={this.analyticChanged} value={analytic&&analytic.tagManagerId}/>
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Quantcast <br/>Account ID</div>
          </Title>
          <Edit>
             <TextField name='quantcastAcc' onChange={this.analyticChanged} value={analytic&&analytic.quantcastAcc}/>
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Chartbeat UID</div>
          </Title>
          <Edit>
             <TextField name='chartbeatUid' onChange={this.analyticChanged} value={analytic&&analytic.chartbeatUid}/>
          </Edit>
        </Flex>
        <div className='sans-font row' style={{marginTop:'80px'}}>
          <PrimaryButton label='Save' type='submit' style={{float:'left',margin:'0 20px 0 0'}}/>
          <SecondaryButton label='Reset' onClick={this.resetDate} style={{float:'left',margin:'0 20px 0 0'}}/>
          <TextStatus style={{color:error?'#D8000C':theme.accentColor}}>{textStatus}</TextStatus></div>
      </Container>
    )
  },
})

PublisherAnalyticSetting.contextTypes = {
	setting: React.PropTypes.object
};


export default PublisherAnalyticSetting