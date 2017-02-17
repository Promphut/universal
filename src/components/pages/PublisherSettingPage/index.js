import React from 'react'
import { TopBarWithNavigation, OverlayImg, PublisherProfileSetting } from 'components'

import styled from 'styled-components'


const Wrapper = styled.div`
  width:100%;
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
  width:100%;
  padding-top:10%;
`
const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
`
const Main = styled.div`
	background: white;
	flex: 3 855px;
	max-width: 855px;
`
const Aside = styled.div`
	background: rgba(255,255,255,0.5);
	flex: 1 255px;
	max-width: 255px;
`

const PublisherSettingPage = React.createClass({
	getInitialState(){
		return {}
	},

  render(){
		return (
		    <Wrapper>
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} loggedIn={false} />
          <Container>
            <Content>
              <Aside>

              </Aside>
              <Main>
                <PublisherProfileSetting/>
              </Main>
            </Content>
          </Container>
		   </Wrapper>
		  )
	}
});

export default PublisherSettingPage;