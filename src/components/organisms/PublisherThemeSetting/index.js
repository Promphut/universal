import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture,Logo} from 'components'
import TextField from 'material-ui/TextField';
import { ChromePicker } from 'react-color';
import {findDOMNode as dom} from 'react-dom'
import Menu from 'material-ui/Menu'
import Popover from 'material-ui/Popover';
import Request from 'superagent'
import auth from 'components/auth'
import RaisedButton from 'material-ui/RaisedButton'

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
  .backgroundClip{
    background-clip:text;
    text-fill-color: transparent;
    -Webkit-background-clip:text;
    -Webkit-text-fill-color: transparent;
  }
  .bg1{
    background-color:#00B2B4;
  }
  .bg2{
    background-color:#4FC2C3;
  }
  .bg3{
    background-color:#85CDCE;
  }
  .bg4{
    background-color:#9BD0D0;
  }
  .bg5{
    background-color:#BAE7E9;
  }
  .bg6{
    background-color:#DAF8F9;
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
const ShadeColor = styled.div`
  height:44px;
  width:100%;
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
      }
    }

    var shade = []
    for(var i=1;i<7;i++){
      shade.push(
        <ShadeColor className={'bg'+i}></ShadeColor>     
      )
    }

    return(
      <Container onSubmit={this.updateData}>
        <div  className="head sans-font">Theme</div>
        <Flex>
          <Title>
            <div className="sans-font">Favicon</div>
          </Title>
          <Edit>
            <UploadPicture src={uploadLogo} path={'/publishers/'+config.PID+'/cover'} type='cover' width={'60px'} height={'60px'} labelStyle={{top:'10px'}}/>
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Small Logo (.svg)</div>
          </Title>
          <Edit>
            <UploadPicture src={uploadSLogo} path={'/publishers/'+config.PID+'/slogo'} type='slogo' width={'60px'} height={'60px'} labelStyle={{top:'10px'}}/>
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Large Logo (.svg)</div>
          </Title>
          <Edit>
            <UploadPicture src={uploadLogo} path={'/publishers/'+config.PID+'/logo'} type='logo' width={'200px'} height={'70px'} labelStyle={{top:'25px'}}/>
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

                   <RaisedButton
                      label="button"
                      labelStyle={{fontWeight:'bold', fontSize:15, top:-2, fontFamily:"'Nunito', 'Mitr'"}}
                      labelColor='#fff'
                      overlayStyle={{borderRadius: '20px'}}
                      rippleStyle={{borderRadius: '20px'}}
                      style={{borderRadius:'20px', height:'40px', lineHeight:'40px', background:primaryColor, boxShadow:'none',marginTop:'15px'}}
                      buttonStyle={{borderRadius: '20px', background: primaryColor, border:'2px solid #fff', padding:'0 2px'}}
                    />
                </Example>
                <Example style={{...styles.example2}}>
                  <strong className="serif-font" style={{fontSize:'17px'}}>Preview of the major color selection</strong><br/><br/>
                  Content should look like this, isn't it pretty on this background color?

                    <RaisedButton
                      label="button"
                      labelStyle={{fontWeight:'bold', fontSize:15, top:-2, fontFamily:"'Nunito', 'Mitr'"}}
                      labelColor={primaryColor}
                      overlayStyle={{borderRadius: '20px'}}
                      rippleStyle={{borderRadius: '20px'}}
                      style={{borderRadius:'20px', height:'40px', lineHeight:'40px', background:'white', boxShadow:'none',marginTop:'15px'}}
                      buttonStyle={{borderRadius: '20px', background:'white', border:('2px solid '+primaryColor), padding:'0 2px'}}
                    />
                </Example>
                <Example style={{...styles.example3}}>
                  <strong className="serif-font" style={{fontSize:'17px'}}>Preview of the major color selection</strong><br/><br/>
                  Content should look like this, isn't it pretty on this background color?
                    <RaisedButton
                      label="button"
                      labelStyle={{fontWeight:'bold', fontSize:15, top:-2, fontFamily:"'Nunito', 'Mitr'"}}
                      labelColor='#fff'
                      overlayStyle={{borderRadius: '20px'}}
                      rippleStyle={{borderRadius: '20px'}}
                      style={{borderRadius:'20px', height:'40px', lineHeight:'40px', background:primaryColor, boxShadow:'none',marginTop:'15px'}}
                      buttonStyle={{borderRadius: '20px', background: primaryColor, border:'2px solid #fff', padding:'0 2px'}}
                    />
                </Example>
              </div>
              <div className='col-6' style={{padding:'0 5px 0 5px'}}>
                {shade}
                <div style={{...styles.example4,textAlign:'center',height:'82px',padding:'18px 0 0 0',marginTop:'20px'}}>
                  <strong className="serif-font" style={{fontSize:'17px',color:'white'}}>White Color</strong><br/>
                  <strong className="serif-font" style={{fontSize:'17px',color:'#222'}}>Black Color</strong>
                </div>
                {primaryColor && secondaryColor && <div className='backgroundClip' style={{...styles.example5,textAlign:'center',height:'82px',padding:'18px 0 0 0',backgroundClip:"text",textFillColor: "transparent",WebkitBackgroundClip:"text",WebkitTextFillColor: "transparent"}}>
                  <strong className="serif-font" style={{fontSize:'24px'}}>
                    Primary and <br/>Secondary Header</strong>
                </div>}
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