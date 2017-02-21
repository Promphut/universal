import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton,UploadPicture} from 'components'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
    text-transform:uppercase;
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

const TextStatus = styled.div`
  color:#00B2B4;
  font-size:15px;
  font-style:italic;
  float:left;
  margin:10px 0 0 15px;
` 
const AddTag = styled.div`
  color:#8F8F8F;
  font-size:16px;
  overflow:hidden;
  margin-top:20px;
  display:inline;
`

const SendBox = styled.div`
  width:480px;
  background-color:#F4F4F4;
  margin:20px 0 0 0;
  padding:15px;
`
const PublisherContact = React.createClass({
  getInitialState(){
    return{
      textStatus:'Unsave',
      value:1
    }
  },

  handleChange(event, index, value){
    this.setState({value})
  },

  render(){
    return(
      <Container>
        <div  className="head sans-font">Contact</div>
        <Flex>
          <Title>
            <div className="sans-font">Categories</div>
          </Title>
          <Edit>
            <div style={{overflowY:'hidden'}}>
              <SelectField
                value={this.state.value}
                onChange={this.handleChange}
                style={{width:'200px',float:'left',marginRight:'15px'}}
              >
                <MenuItem value={1} primaryText="Never" />
                <MenuItem value={2} primaryText="Every Night" />
                <MenuItem value={3} primaryText="Weeknights" />
                <MenuItem value={4} primaryText="Weekends" />
                <MenuItem value={5} primaryText="Weekly" />
              </SelectField>
              <AddTag>
                <i className="fa fa-plus" style={{float:'left',margin:'20px 10px 0 0'}} aria-hidden="true"></i> 
                <div style={{float:'left',margin:'20px 20px 0 0'}}>New</div>
              </AddTag>
              <AddTag>
                <i className="fa fa-trash" style={{float:'left',margin:'20px 10px 0 0'}} aria-hidden="true"></i> 
                <div style={{float:'left',margin:'20px 20px 0 0'}}>Delete Selected</div>
              </AddTag>
            </div>
            <SendBox>
              <TextField
                defaultValue="unknow@mail.com"
                floatingLabelText="Sent to email"
                floatingLabelFixed={true}
              /><br/><br/>
              <TextField
                defaultValue="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown "
                multiLine={true}
                fullWidth={true}
                floatingLabelText="Description"
                floatingLabelFixed={true}
                rows={2}
                rowsMax={10}
              />
            </SendBox>
          </Edit>
        </Flex>
        <div className='sans-font' style={{marginTop:'30px'}}><PrimaryButton label='Save' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus>{this.state.textStatus}</TextStatus></div>
      </Container>
    )
  },
})



export default PublisherContact