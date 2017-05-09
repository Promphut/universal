import React from 'react';
import {Link} from 'react-router-dom';
import styled, {keyframes} from 'styled-components'
import {BGImg, ShareDropdown} from 'components'
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import moment from 'moment'
import truncate from 'lodash/truncate'

const Container = styled.div`
  width:100%;
  z-index:100;
  overflow:hidden;
  .imgWidth{
    width:100%;
    height:422px;
  }
  .des-hidden{
    display:block;
  }
  @media (min-width:481px) {
    .des-hidden{
      display:none;
    }
  }
  @media (max-width:480px) {
    width:100%;
    padding:10px 0 20px 0;
    margin-left:auto;
    margin-right:auto;
    .mob-hidden{
      display:none;
    }
    .imgWidth{
      float:none;
      width:100%;
      height:175px;
    }
  }
`

const NameLink = styled(Link)`
  display: block;
  color:white;
  font-weight:bold;
  font-size:20px;
  height:50px;
  @media (max-width:480px) {
    font-size:15px;
  }
  &:hover{
    color:${props=>props.theme.accentColor}
    cursor:pointer;
  }
`

const BoxText = styled.div`
  width:100%;
  height:80px;
  padding:12px;
  background:rgba(0,0,0,0.7);
  position:absolute;
  bottom:0;

`

class TopNews extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    let {detail,style} = this.props

    return (
      <Container style={{...style}}>
        <BGImg url={detail&&detail.url} src={detail&&detail.cover.medium} className='imgWidth mob-hidden' >
          <BoxText>
            <span>
            {truncate(detail&&detail.ptitle, {
              'length': 133,
              'separator': ''
            })}
            </span>
          </BoxText>
        </BGImg>    
      </Container>
    )
  }
}


export default TopNews;
