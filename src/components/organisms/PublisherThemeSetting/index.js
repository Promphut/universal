import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import TextField from 'material-ui/TextField';
import { ChromePicker } from 'react-color';
import {findDOMNode as dom} from 'react-dom'
import Menu from 'material-ui/Menu'
import Popover from 'material-ui/Popover';
import Request from 'superagent'
import auth from 'components/auth'
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
    text-transform: uppercase;
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
  padding-top:15px;
`
const TextStatus = styled.div`
  color:#00B2B4;
  font-size:15px;
  font-style:italic;
  float:left;
  margin:10px 0 0 15px;
` 
const Color = styled.div`
  width:22px;
  height:22px;
  float:left;
`
const BoxColor = styled.div`
  display:inline;
  margin:10px 30px 0 0;
  &:hover{
    cursor:pointer;
  }
`

const Desc = styled.div`
  color:#C2C2C2;
  font-size:14px;
  font-style:italic;
  display:inline;
  margin:8px 0 0 0;
` 
const Example = styled.div`
  width:100%;
  height:175px;
  padding:15px;
  font-size:11px;
  margin-bottom:10px;
`

const PublisherThemeSetting = React.createClass({
  getInitialState(){
    return{
      publisher:{},
      error:false,
      textStatus:'Unsave',
      open1: false,
      open2: false,
      anchorEl1:{},
      anchorEl2:{},
      primaryColor:'',
      secondaryColor:'',
      uploadSLogo:null,
      uploadLogo:null
    }
  },

  handleTouchTap1(event){
    event.preventDefault();
    this.setState({
      open1: true,
      anchorEl1: event.currentTarget,
    });
  },
  handleTouchTap2(event){
    event.preventDefault();
    this.setState({
      open2: true,
      anchorEl2: event.currentTarget,
    });
  },

  handleRequestClose(){
    this.setState({
      open1: false,
      open2: false,
    });
  },

  selectColor1(color){
    this.setState({ primaryColor: color.hex });
  },
  selectColor2(color){
    this.setState({ secondaryColor: color.hex });
  },

  componentDidMount(){
    this.getPublisherId()
  },

  setData(){
    var {theme} = this.state.publisher
    //document.getElementById('analytic').value = typeof analytic == "undefined" ?'': analytic.tagManagerId
    this.setState({
      primaryColor: !theme? '#00B2B4': theme.primaryColor,
      secondaryColor: !theme? '#CEF1B7': theme.secondaryColor
    })
  },

  getPublisherId(){
    var self = this
    var user = auth.getUser()
    Request
      .get(config.BACKURL+'/publishers/'+config.PID)
      .set('Accept','application/json')
      .end((err,res)=>{
        if(err) throw err 
        else{
          self.setState({publisher:res.body.publisher})
          self.setData()
        }
      })
  },

  updateData(e){
    e.preventDefault()
    var self = this
    var data = 
    {
      publisher : {
        theme: {
          primaryColor:this.state.primaryColor,
          secondaryColor:this.state.secondaryColor
        }
    }}
    Request
      .patch(config.BACKURL+'/publishers/'+config.PID+'?token='+auth.getToken())
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
    var {primaryColor,secondaryColor,anchorEl1,anchorEl2,open1,open2,textStatus,uploadSLogo,uploadLogo,error} = this.state
    var styles={
      example1:{
        color:'white',
        backgroundColor:primaryColor
      },
      example2:{
        color:primaryColor,
        backgroundColor:'white',
        border:'1px solid '+primaryColor
      },
      example3:{
        color:'#222',
        backgroundColor:primaryColor
      },
      example4:{
        background:primaryColor,
        background:'linear-gradient(135deg, '+primaryColor+' 0%, '+secondaryColor+' 100%)',
      },
      example5:{
        background:primaryColor,
        background:'linear-gradient(135deg, '+primaryColor+' 0%, '+secondaryColor+' 100%)',
        backgroundClip:"text",
        textFillColor: "transparent",
        WebkitBackgroundClip:"text",
        WebkitTextFillColor: "transparent"
      }
    }
    return(
      <Container onSubmit={this.updateData}>
        <div  className="head sans-font">Theme</div>
        <Flex>
          <Title>
            <div className="sans-font">Favicon</div>
          </Title>
          <Edit>
            <UploadPicture src={uploadLogo} path='/publishers/11/cover' type='cover'/>
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Small Logo(.svg)</div>
          </Title>
          <Edit>
            <UploadPicture src={uploadSLogo} path='/publishers/11/slogo' type='slogo'/>
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Large Logo(.svg)</div>
          </Title>
          <Edit>
            <UploadPicture src={uploadLogo} path='/publishers/11/logo' type='logo'/>
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Primary and Secondary Colors</div>
          </Title>
          <Edit>
            <div className='row'>
              <BoxColor id='color2' onClick={this.handleTouchTap1}>
                <Color style={{backgroundColor:primaryColor}}/>
                <i className="fa fa-angle-down" style={{margin:'4px'}} aria-hidden="true"></i>
                <Popover
                  open={open1}
                  anchorEl={anchorEl1}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.handleRequestClose}
                >
                  <ChromePicker
                    color={ primaryColor }
                    onChangeComplete={ this.selectColor1 }
                  />
                </Popover>
              </BoxColor>
              <BoxColor id='color2' onClick={this.handleTouchTap2}>
                <Color style={{backgroundColor:secondaryColor}}/>
                <i className="fa fa-angle-down" style={{margin:'4px'}} aria-hidden="true"></i>
                <Popover
                  open={open2}
                  anchorEl={anchorEl2}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.handleRequestClose}
                >
                  <ChromePicker
                    color={ secondaryColor }
                    onChangeComplete={ this.selectColor2 }
                  />
                </Popover>
              </BoxColor>
              <Desc className="sans-font">Primary color should be a major color that looks<br/> good on both white and black background</Desc>
            </div>
            <div className='row sans-font' style={{border:'1px solid #e2e2e2',padding:'10px',margin:'20px 0 0 0'}}>
              <div className='col-6 ' style={{padding:'0 5px 0 5px'}}>
                <Example style={{...styles.example1}}>
                  <strong className="serif-font" style={{fontSize:'17px'}}>Preview of the major color selection</strong><br/><br/>
                  Content should look like this, isn't it pretty on this background color?
                </Example>
                <Example style={{...styles.example2}}>
                  <strong className="serif-font" style={{fontSize:'17px'}}>Preview of the major color selection</strong><br/><br/>
                  Content should look like this, isn't it pretty on this background color?
                </Example>
                <Example style={{...styles.example3}}>
                  <strong className="serif-font" style={{fontSize:'17px'}}>Preview of the major color selection</strong><br/><br/>
                  Content should look like this, isn't it pretty on this background color?
                </Example>
              </div>
              <div className='col-6' style={{padding:'0 5px 0 5px'}}>
                <div style={{...styles.example4,textAlign:'center',height:'82px',padding:'18px 0 0 0'}}>
                  <strong className="serif-font" style={{fontSize:'17px',color:'white'}}>White Color</strong><br/>
                  <strong className="serif-font" style={{fontSize:'17px',color:'#222'}}>Black Color</strong>
                </div>
                <div style={{...styles.example5,textAlign:'center',height:'82px',padding:'18px 0 0 0'}}>
                  <strong className="serif-font" style={{fontSize:'24px'}}>
                    Primary and <br/>Secondary Header</strong>
                </div>
              </div>
            </div>
          </Edit>
        </Flex>
        <div className='sans-font' style={{marginTop:'30px'}}><PrimaryButton label='Save' type='submit' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' onClick={this.setData} style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus style={{color:error?'#D8000C':'#00B2B4'}}>{textStatus}</TextStatus></div>
      </Container>
    )
  },
})



export default PublisherThemeSetting