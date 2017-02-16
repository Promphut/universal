import React from 'react'
import {SignUp,SignUpFb,Logo,BackButton} from 'components'
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components'
import {Link,browserHistory} from 'react-router'

const Wrapper = styled.div`
	width:100%;
  height:100%;
  position:absolute;
  background: rgba(0,178,180,1);
  background: -moz-linear-gradient(-45deg, rgba(0,178,180,1) 0%, rgba(206,241,183,1) 100%);
  background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(0,178,180,1)), color-stop(100%, rgba(206,241,183,1)));
  background: -webkit-linear-gradient(-45deg, rgba(0,178,180,1) 0%, rgba(206,241,183,1) 100%);
  background: -o-linear-gradient(-45deg, rgba(0,178,180,1) 0%, rgba(206,241,183,1) 100%);
  background: -ms-linear-gradient(-45deg, rgba(0,178,180,1) 0%, rgba(206,241,183,1) 100%);
  background: linear-gradient(135deg, rgba(0,178,180,1) 0%, rgba(206,241,183,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00b2b4', endColorstr='#cef1b7', GradientType=1 );
`

const Container = styled.div`
  margin:7% auto 0 auto;
  width:477px;
`

const SignUpPage = React.createClass({
	getInitialState(){
		return {
      statePage:true
    }
	},

  componentWillReceiveProps(nextProps){

  },

  changeStatePage(e){
    e.preventDefault()
    this.setState({
      statePage:!this.state.statePage
    })
  },

  checkBack(e){
    e.preventDefault()
    if(this.state.statePage){
      //console.log(this.props)
    }
  },

	render(){
		return (
		    <Wrapper>
          
          <Container>
            <div  style={{margin:'0 auto 15px auto',width:'146px'}}><Logo fill='#E2E2E2'/></div>
            <Link to='#' onClick={this.checkBack}><BackButton style={{marginBottom:'10px'}}/></Link>
            {this.state.statePage?<SignUpFb emailSignUp={this.changeStatePage}/>:<SignUp/>}
          </Container>
		   </Wrapper>
		  )
	}
});

export default SignUpPage