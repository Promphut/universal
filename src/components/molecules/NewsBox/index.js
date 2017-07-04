import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import {BGImg, ShareDropdown} from 'components'
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import moment from 'moment'
import truncate from 'lodash/truncate'
import utils from '../../../services/utils'

const Container = styled.div`
  width:100%;
  z-index:1;
  display:flex;
  overflow:hidden;
  @media (max-width:480px) {
    display:block;
    width:100%;
    padding:10px 0 10px 0;
    margin-left:auto;
    margin-right:auto;
  }
`

const Div = styled.div`
  color:#8F8F8F;
  font-size:13px;
  @media (max-width:480px) {
    font-size:12px;
  }
`

const NameLink = styled(Link)`
  display: block;
  color:#222;
  font-weight:bold;
  font-size:18px;
  transition: .1s;
  white-space: pre-wrap;      /* Webkit */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap;     /* Opera <7 */
  white-space: -o-pre-wrap;   /* Opera 7 */
  word-wrap: break-word;      /* IE */
  @media (max-width:480px) {
    font-size:15px;
  }
  &:hover{
    color:${props=>props.theme.accentColor};
  }
`

const BoxText = styled.div`
  flex:0 700px;
  padding-left:38px;
  border-bottom:1px solid ##C4C4C4;
  @media (max-width:480px) {
    float:none;
    width:100%;
    padding-left:0px;
    margin-top:10px;
  }
`

const Desc = styled.div`
  color:#8E8E8E;
  font-size:14px;

  margin:10px 0 10px 0;
`

const Time = styled.div`
  flex:0 50px;
  color:#8F8F8F;
  font-size:12px;
  width:50px;
  text-align:center;
  @media (max-width:480px) {
    text-align:left;
    margin-bottom:10px;
    width:50%;
  }
`

const VerticalTimeline = styled.div`
  width:10px;
  height:200px;
  margin:0 10px 0 10px;
  border-radius:2em;
  background-color:#F4F4F4;
  position:relative;
  z-index:-5;
`

const Doughnut = styled.div`
  margin:0 10px 0 10px;
  border: 3px solid ${props=>props.theme.accentColor};
  border-radius: 50%;
  height:10px;
  width:10px;
`

const Box = styled.div`
  flex:0 90%;
  display:flex;
  border-bottom: ${props => props.hr ? '' : '1px solid #c4c4c4'} ;
  padding-top:30px;
  @media (max-width:480px) {
    padding-top:0px;
    display:block;
    width:100%;
    padding-bottom:10px;
  }
`

const WriterLink = styled(Link)`
  transition: .1s;
`
const BG = styled(BGImg)`
  width:300px;
  height:157px;
  flex:0 300px;
  @media (max-width:480px) {
    width:100%;
    height:${props => props.height}px;
    padding-bottom:10px;
  }
`

const NewsBox = ({detail, style, timeline, final}) => {

    let {ptitle,cover,writer,column,votes,comments,updated,url,readTime,contentShort,published} = detail
    //console.log(detail)
    return (
      <Container style={{...style}}>
        <Time className='hidden-mob' style={{display:timeline?'block':'none'}}>{utils.dateFormat(published)}</Time>
        <div className='hidden-mob' style={{flex:0,marginRight:'10px',visibility:timeline?'show':'hidden'}}>
          <Doughnut/>
          <VerticalTimeline/>
        </div>
        <Box hr={final}>
          <ShareDropdown buttonSize={24} url={url} className='hidden-des'/>
          <Time className='hidden-des' style={{display:timeline?'block':'none'}}>{utils.dateFormat(published)}</Time>
          <BG height={(screen.width - 32) / 1.91} url={url} src={cover.small || cover.medium} alt={ptitle || ''} />
          <BoxText>
            <ShareDropdown buttonSize={24} url={url} className='hidden-mob'/>
            <NameLink to={url} className='nunito-font' >{truncate(ptitle, {
                'length': 70,
                'separator': ''
              })}</NameLink>
            <Desc className='nunito-font'>{truncate(contentShort, {
                'length': 200,
                'separator': ''
              })}</Desc>
            <Desc className='nunito-font'>by <strong><WriterLink to={writer&&writer.url}>{writer&&writer.display}</WriterLink></strong></Desc>
          </BoxText>
        </Box>
      </Container>
    )
}

export default NewsBox;
