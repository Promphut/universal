import React from 'react'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {FbIcon} from 'components';
import {findDOMNode as dom} from 'react-dom'
const Container = styled.div`
  width:100%;
  position:relative;
`
const Div = styled.div`
  width:70px;
  margin:10px auto 10px auto
`
const No = styled.div`
  color:#222222;
  font-size:36px;
  text-align:center;

`


const ShareSideBar = React.createClass({
  getInitialState(){
    return{
      stopPos:''
    }
  },
  componentDidMount(){
    var self = this
    var startPos = dom(self.refs.contain).getBoundingClientRect().top
    //console.log(startPos)
		window.addEventListener("scroll", function(event) {
			var top = this.scrollY
			if(top>startPos+200&&top<self.state.stopPos-100){
				dom(self.refs.contain).style.top = top-200+'px';
			}else if(top==0){
				dom(self.refs.contain).style.top = startPos+'px';
        //console.log(startPos+'px')
			}else if(top>self.state.stopPos-100){
				dom(self.refs.contain).style.top = self.state.stopPos-350+'px';
			}
		});
  },

  componentWillReceiveProps(nextProps){
    if(nextProps.stop != this.props.stop){
      this.setState({stopPos:nextProps.stop})
    }
  },

  render(){
    return(
      <Container ref='contain'>
        <Div>
          <No>217</No>
          <div style={{color:'#8F8F8F',fontSize:'16px',fontWeight:'blod',textAlign:'center'}}>shares</div>
          <div style={{margin:'0 auto 0 auto'}}><FbIcon fill='#3A579A'/></div>
        </Div>
      </Container>
  )
  },
}) 



export default ShareSideBar