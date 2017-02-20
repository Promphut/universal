import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import TextField from 'material-ui/TextField';

const Container = styled.div`
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
const PublisherProfileSetting = React.createClass({
  getInitialState(){
    return{
      textStatus:'Unsave'
    }
  },
  render(){
    return(
      <Container>
        <div  className="head sans-font">PROFILE</div>
        <Flex>
          <Title>
            <div className="sans-font">Title</div>
          </Title>
          <Edit>
            <TextField defaultValue="Aommoney" />
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Tagline</div>
          </Title>
          <Edit>
            <TextField
              defaultValue="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown"
              multiLine={true}
              fullWidth={true}
              floatingLabelText="80 characters"
              floatingLabelFixed={true}
              rows={2}
              rowsMax={4}
            />
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Cover picture</div>
          </Title>
          <Edit>
            <UploadPicture/>
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Social Channels</div>
          </Title>
          <Edit>
            <Social className="sans-font">
              <i className="fa fa-facebook" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>facebook.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} defaultValue="Aommoney" />
            </Social>
            <Social className="sans-font">
              <i className="fa fa-twitter" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>twitter.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} defaultValue="Aommoney" />
            </Social>
            <Social className="sans-font">
              <i className="fa fa-instagram" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>instagram.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} defaultValue="Aommoney" />
            </Social>
            <Social className="sans-font">
              <i className="fa fa-youtube-play" style={{float:'left',margin:'20px 20px 0 0'}} aria-hidden="true"></i> 
              <div style={{float:'left',margin:'15px 20px 0 0'}}>youtube.com/</div>
              <TextField style={{float:'left',margin:'5px 0 0 0'}} defaultValue="Aommoney" />
            </Social>
          </Edit>
        </Flex>
        <div className='sans-font' style={{marginTop:'30px'}}><PrimaryButton label='Save' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus>{this.state.textStatus}</TextStatus></div>
      </Container>
    )
  },
})



export default PublisherProfileSetting