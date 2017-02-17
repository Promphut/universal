import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import TextField from 'material-ui/TextField';

const Container = styled.div`
  width:100%;
  padding:80px;
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

const PublisherProfileSetting = React.createClass({
  getInitialState(){
    return{

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

      </Container>
    )
  },
})



export default PublisherProfileSetting