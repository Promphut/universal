import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {OverlayImg} from 'components'

const Container = styled.div`
  width:255px;
  display:inline;
  .imgWidth{
    width:255px;
    height:365px;
  }
  @media (max-width:480px) {
    width:135px;
    .imgWidth{
      width:135px;
      height:193px;
    }
  }
`

const Div = styled.div`
  color:#8F8F8F;
  font-size:14px;
  @media (max-width:480px) {
    font-size:11px;
  }
`

const Column = styled.span`
  font-weight:bold;
`

const NameLink = styled(Link)`
  display: block;
  color:#222;
  font-weight:bold;
  font-size:19px;
  margin:10px 0 0 0;
  @media (max-width:480px) {
    font-size:13px;
  }
`

const Thumpnail = React.createClass({
  getInitialState(){
    return{
      detail:this.props.detail
    }
  },

  componentWillReceiveProps(nextProps){
    if(nextProps.detail!=this.props.detail){
      this.setState({
        detail:nextProps.detail
      })
    }
  },

  render(){
    var {detail,style} = this.props
    var {detail} = this.state
    var {title,updated,coverMobile,url} = detail

    return (
      <Container style={{...style}}>
        <Link to={url}><OverlayImg src={coverMobile.small || coverMobile.medium} className='imgWidth' /></Link>
        <NameLink to={url} className='sans-font'>{title}</NameLink>
        <Div className='sans-font'>5 min read</Div>
      </Container>
    )
  }
})
    


export default Thumpnail;