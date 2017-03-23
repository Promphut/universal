import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router'
import {BGImg, TopBarWithNavigation, TrendingSideBar, RecommendArticle, Navbar} from 'components'

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding: 50px 0 50px 0;
`

const Main = styled.div`
	margin-top: 50px;
	flex: 8 730px;
	max-width: 730px;
	@media (max-width: 480px) {
		flex: 0 100%;
		max-width: 100%;
		padding: 0 15px 0 15px;
	}
`

const Aside = styled.div`
	flex: 3 325px;
	position:relative;
	max-width: 325px;
	margin-left:60px;
	@media (max-width: 1160px) {
		display:none;
	}
`

const RecommendContainer = styled.div`
	flex:12 1160px;
	max-width:1160px;
	margin-top:60px;
	@media (max-width: 480px) {
		flex:0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
	}
`

const rec = {
	name:'Donald Trump’s First, Alarming Week',
	column:'Money Ideas',
	writer:'RYAN LIZZA',
	vote:'18',
	comment:'3'
}

const ContactAndAboutContainer = React.createClass({
  render(){
    return (
      <div>
				<BGImg src="/tmp/a-story/pic-min.jpg" style={{width:'100%',height:'510px'}} />
      	<TopBarWithNavigation title={'Title of AomMoney goes here..'} />
        <Content>
          <Main>
            {this.props.children}
          </Main>
          <Aside>
            <TrendingSideBar/>
          </Aside>
        </Content>
        <Content>
          <RecommendContainer ref='recommend'>
            <div className='recommends sans-font'>Recommends</div>
            <div className='row center'>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <Link to='#'><RecommendArticle detail={rec}/></Link>
                <Link to='#'><RecommendArticle detail={rec}/></Link>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12'>
                <Link to='#'><RecommendArticle detail={rec}/></Link>
                <Link to='#'><RecommendArticle detail={rec}/></Link>
              </div>
            </div>
          </RecommendContainer>
        </Content>
     </div>
    )
  }
})

export default ContactAndAboutContainer;
