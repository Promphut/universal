import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import utils from '../../services/utils';
import { withRouter } from 'react-router';

import Template from '../Template';

const Container = styled.div`
  width:100%;
  height:500px;
  background:red;
`;

class Test extends React.Component {
  static contextTypes = {
    setting: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Template ChildComponent = {
        <Container className="sans-font">
          <h1>Test</h1>
        </Container>
      }/>
    );
  }
}

export default withRouter(Test);
