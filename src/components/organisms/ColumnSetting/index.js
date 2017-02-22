import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';

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
const Desc = styled.div`
  color:#C2C2C2;
  font-size:14px;
  font-style:italic;
` 
const TextStatus = styled.div`
  color:#00B2B4;
  font-size:15px;
  font-style:italic;
  float:left;
  margin:10px 0 0 15px;
` 
const Admin = styled.div`
  color:#8F8F8F;
  font-size:18px;
  display:inline;
  height:25px;
  margin:8px 0 0 10px;
  border-bottom:1px solid #8F8F8F;
  &:hover{
    cursor:pointer;
    text-decoration:underline;
    text-shadow: 0 0 1px #C2C2C2;
  }
`

const ColumnSetting = React.createClass({
  getInitialState(){
    return{
      textStatus:'Unsave',
      chipData: [
        {key: 0, label: 'TAXBUGNOMS'},
        {key: 1, label: 'DR.NUT FUNDCLINIC'},
        {key: 2, label: 'MR.AOMMONEY'},
        {key: 3, label: 'INSURANGER'},
      ],
    }
  },
  render(){
    return(
      <div>
        <Container>
          <div  className="head sans-font">PROFILE</div>
          <Flex>
            <Title>
              <div className="sans-font">Name</div>
            </Title>
            <Edit>
              <TextField defaultValue="Money Ideas" />
            </Edit>
          </Flex>
          <Flex>
            <Title>
              <div className="sans-font">URL</div>
            </Title>
            <Edit>
              <Social className="sans-font"> 
                <div style={{float:'left',margin:'15px 20px 0 0'}}>/money-ideas</div>
                <TextField style={{float:'left',margin:'5px 0 0 0'}} defaultValue="money-ideas" />
              </Social>
              <Desc className='sans-font'>Note that changing slug will affect the whole URL structure of this publisher, meaning that previously used URLs won't be able to be accessed anymore. Are you sure to edit?</Desc>
            </Edit>
          </Flex>
          <Flex>
            <Title>
              <div className="sans-font">Description</div>
            </Title>
            <Edit>
              <TextField
                defaultValue="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown"
                multiLine={true}
                fullWidth={true}
                floatingLabelText="140 characters"
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
        <Container>
          <div  className="head sans-font">TEAM</div>
          <Flex>
            <Title>
              <div className="sans-font">Writers</div>
            </Title>
            <Edit>
              <div className='row' style={{marginTop:'15px'}}>
                {this.state.chipData.map((data,index)=>(
                  <Chip
                    key={data.key}
                    onRequestDelete={() => this.handleRequestDelete(data.key)}
                    style={{margin:'4px'}}
                  >
                    {data.label}
                  </Chip>
                ), this)}
                <Admin className="sans-font">Add an admin...</Admin>
              </div>
            </Edit>
          </Flex>
          <Flex>
            <Title>
              <div className="sans-font">Editors</div>
            </Title>
            <Edit>
              <div className='row' style={{marginTop:'15px'}}>
                {this.state.chipData.map((data,index)=>(
                  <Chip
                    key={data.key}
                    onRequestDelete={() => this.handleRequestDelete(data.key)}
                    style={{margin:'4px'}}
                  >
                    {data.label}
                  </Chip>
                ), this)}
                <Admin className="sans-font">Add an admin...</Admin>
              </div>
            </Edit>
          </Flex>
          <div className='sans-font' style={{margin:'80px',overflow:'hidden'}}><PrimaryButton label='Save' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus>{this.state.textStatus}</TextStatus></div>
        </Container>
      </div>
    )
  },
})



export default ColumnSetting