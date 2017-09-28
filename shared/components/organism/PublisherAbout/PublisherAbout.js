import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PrimaryButton, SecondaryButton, EditorCss, FroalaEditor } from '../../../components';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import api from '../../../services/api';
import { Helmet } from 'react-helmet';
import {BACKURL } from '../../../config'

const Container = styled(EditorCss)`
  width:100%;
  padding:40px;
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
`;

const Flex = styled.div`
  display:flex;
  items-align:center;
  flex-flow: row wrap;
`;

const Title = styled.div`
  flex:2 150px;
  max-width:150px;
  color:#C2C2C2;
  font-size:17px;
  padding-top:15px;
`;

const Edit = styled.div`
  flex:6 100%;
  max-width:100%;
`;

const TextStatus = styled.div`
  color:${props => props.theme.primaryColor};
  font-size:15px;
  font-style:italic;
  float:left;
  margin:10px 0 0 15px;
`;

const AddTag = styled.div`
  color:#8F8F8F;
  font-size:16px;
  overflow:hidden;
  margin-top:20px;
  display:inline;
`;

const Paper = styled.div`
  position:relative;
  width:100%;
	border:1px solid #e2e2e2;
  min-height:200px;
  &:focus{
    outline: none;
  }
`;

class PublisherAbout extends React.Component {
  SAVE_STATUS = {
    INITIAL: 0,
    DIRTIED: 1,
    UNDIRTIED: 2,
  };
  state = {
    textStatus: '',
    error: false,
    status: this.SAVE_STATUS.INITIAL,
    html: this.props.aboutUs
  };
  static contextTypes = {
    setting: PropTypes.object,
  };
  constructor(props) {
    super(props);

  }

  resetData = () => {
    if (this.props.aboutUs) this.setState({html:this.props.aboutUs})
  };

  updateAboutUs = (e) => {
    if (e) e.preventDefault();
    api
      .updatePublisher({
        aboutUs: this.state.html,
      })
      .then((pub) => {
        this.aboutUs = pub.aboutUs;

        this.setState({
          textStatus: 'Saved successfully',
          error: false,
        });
      })
      .catch((err) => {
        this.setState({
          textStatus: err.message,
          error: true,
        });
      });
  };

  handleModelChangeHtml = html => {
		this.setState({ html,saveStatus: 'Unsave',status: this.SAVE_STATUS.DIRTIED, })
	}

  componentWillReceiveProps(nextProps) {
    // this.editor.setContent(nextProps.aboutUs || '')
    // this.setAboutUs(nextProps.aboutUs || '');
  }

  componentWillUnmount() {

  }

  componentDidMount() {
    
  }

  render() {
    let { error, textStatus, aboutUs, html } = this.state;
    let { theme,id } = this.context.setting.publisher;

    return (
      <Container>
        <div className="head sans-font">About Us</div>
        <br />
        <Flex>
          <Edit>
            <div style={{ margin: '10px 0 20px 40px' }}>
              <FroalaEditor ref="paper" imgURL={`${BACKURL}/publishers/${id}/about/image`} model={html} onModelChange={this.handleModelChangeHtml} />
            </div>
          </Edit>
        </Flex>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          <div className="sans-font" style={{ float: 'right' }}>
            <TextStatus style={{ color: error ? '#D8000C' : theme.accentColor }}>
              {textStatus}
            </TextStatus>
            <SecondaryButton
              label="Reset"
              onClick={this.resetData}
              style={{ float: 'left', margin: '0 0 0 20px' }}
            />
            <PrimaryButton
              label="Save"
              type="button"
              onClick={this.updateAboutUs}
              style={{ float: 'left', margin: '0 0 0 20px' }}
            />
          </div>
        </div>
      </Container>
    );
  }
}

export default PublisherAbout;
