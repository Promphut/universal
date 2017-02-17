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
const CirButton = styled.div`
  width:61px;
  height:61px;
  border-radius:50%;
  background-color:#3A579A;
  padding:16px 0 0 20px;
  margin:15px auto 15px auto;
`

//if height less than 900px remove last item

const ShareSideBar = React.createClass({
  getInitialState(){
    return{
      stopPos:''
    }
  },
  componentDidMount(){
		var self = this
    var startPos = dom(self.refs.contain).getBoundingClientRect().top
    var height = dom(self.refs.contain).scrollHeight;
    //console.log(startPos)
		window.addEventListener("scroll", function(event) {
			var top = this.scrollY
			if(top>startPos+height&&top<self.state.stopPos){
				dom(self.refs.contain).style.top = top-height+'px';
			}
      // else if(top==0){
			// 	dom(self.refs.contain).style.top = startPos+'px';
      //   //console.log(startPos+'px')
			// }
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
          <CirButton><i className="fa fa-facebook fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>
          <CirButton style={{backgroundColor:'#60AADE',paddingLeft:'18px'}}><i className="fa  fa-twitter fa-2x" aria-hidden="true" style={{color:'white'}}></i></CirButton>
        </Div>
      </Container>
  )
  },
}) 



export default ShareSideBar