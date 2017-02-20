import React from 'react'
import styled from 'styled-components'
import {PrimaryButton,SecondaryButton} from 'components'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
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
  flex:6 480px;
  max-width:480px;
`
const AddTag = styled.div`
  color:#8F8F8F;
  font-size:16px;
  overflow:hidden;
  margin-top:20px;
`
const style = {
  display: 'inline-block',
  margin: '16px 40px 16px 0',
  overflowY:'auto',
  overflowX:'hidden',
  width:'240px',
  height:'233px'
};

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

const dataSource3 = [
  {textKey: 'Some Text', valueKey: 'someFirstValue'},
  {textKey: 'Some Text', valueKey: 'someSecondValue'},
];

const PublisherPublishingSetting = React.createClass({
  getInitialState(){
    return{
      chipData: [
        {key: 0, label: 'TAXBUGNOMS'},
        {key: 1, label: 'DR.NUT FUNDCLINIC'},
        {key: 2, label: 'MR.AOMMONEY'},
        {key: 3, label: 'INSURANGER'},
      ],
      textStatus:'Unsave'
    }
  },
  handleRequestDelete(key){
    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
    this.chipData.splice(chipToDelete, 1);
    this.setState({chipData: this.chipData});
  },
  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={{margin:'4px'}}
      >
        {data.label}
      </Chip>
    );
  },
  render(){
    var menu=[]
    for(let i=0;i<10;i++){
      menu.push(
        <MenuItem key={i} primaryText="Help &amp; feedback" />
      )
    }

    return(
      <Container>
        <div  className="head sans-font">PUBLISHING</div>
        <Flex>
          <Title>
            <div className="sans-font">Allowed Tags</div>
          </Title>
          <Edit>
            <div className='row'>
              <AutoComplete
                hintText="Search Tags ..."
                filter={AutoComplete.noFilter}
                dataSource={dataSource3}
              />
              <i className="fa  fa-search" style={{float:'left',margin:'20px 10px 0 0',color:'#8f8f8f'}} aria-hidden="true"></i>
            </div>
            <div className='row'>
              <Paper style={style} className="col-7">
                <Menu>
                  {menu}
                </Menu>
              </Paper>
              <div className="col-4">
                <AddTag>
                  <i className="fa fa-plus" style={{float:'left',margin:'20px 10px 0 0'}} aria-hidden="true"></i> 
                  <div style={{float:'left',margin:'20px 20px 0 0'}}>New</div>
                </AddTag>
                <AddTag>
                  <i className="fa fa-trash" style={{float:'left',margin:'20px 10px 0 0'}} aria-hidden="true"></i> 
                  <div style={{float:'left',margin:'20px 20px 0 0'}}>Delete Selected</div>
                </AddTag>
              </div>
            </div>
            <Desc className='sans-font'>Used by a writer to tag a story. Adding a relevant tag help discovering your publiser better on search website. </Desc>
          </Edit>
        </Flex>
        <Flex>
          <Title>
            <div className="sans-font">Admins</div>
          </Title>
          <Edit>
            <div className='row' style={{marginTop:'15px'}}>
              {this.state.chipData.map(this.renderChip, this)}
              <Admin className="sans-font">Add an admin...</Admin>
            </div>
          </Edit>
        </Flex>
        <div className='sans-font' style={{marginTop:'30px'}}><PrimaryButton label='Save' style={{float:'left',margin:'0 20px 0 0'}}/><SecondaryButton label='Reset' style={{float:'left',margin:'0 20px 0 0'}}/><TextStatus>{this.state.textStatus}</TextStatus></div>
      </Container>
    )
  },
})



export default PublisherPublishingSetting