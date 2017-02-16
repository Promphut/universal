import React from 'react'
import styled from 'styled-components'
import {PrimaryButton, SecondaryButton} from 'components'

const Wrapper = styled.div`
	padding:30px;

	& section {
		padding: 15px;
	}
`

const MoodboardPage = React.createClass({
	getInitialState(){
		return {}
	},

	render(){
		return (
			<Wrapper>
				<h1>Medium Buttons</h1>
				<section>
					Primary : <PrimaryButton label="Remove Story" iconName="grade"/>&nbsp;&nbsp;
					<PrimaryButton label="Remove Story" iconName="search"/>&nbsp;&nbsp;
					<PrimaryButton label="Remove Story" iconName="add"/>&nbsp;&nbsp;
					<PrimaryButton label="Remove Story" icon={<i className="fa fa-facebook" aria-hidden="true"></i>}/>&nbsp;&nbsp;
					<PrimaryButton label="Remove Story" icon={<i className="fa fa-bullseye" aria-hidden="true"></i>}/>
					<br/><br/>

					Primary without icon: <PrimaryButton label="Remove Story"/>
				</section>
				<section>
					Secondary : <SecondaryButton label="Remove Story" iconName="grade"/>&nbsp;&nbsp;
					<SecondaryButton label="Remove Story" iconName="search"/>&nbsp;&nbsp;
					<SecondaryButton label="Remove Story" iconName="add"/>&nbsp;&nbsp;
					<SecondaryButton label="Remove Story" icon={<i className="fa fa-facebook" aria-hidden="true"></i>}/>&nbsp;&nbsp;
					<SecondaryButton label="Remove Story" icon={<i className="fa fa-bullseye" aria-hidden="true"></i>}/>
					<br/><br/>

					Secondary without icon: <SecondaryButton label="Remove Story"/>
				</section>


				<h1>Large Buttons</h1>
				<section>
					Primary : <PrimaryButton size="large" label="Remove Story" iconName="grade"/>&nbsp;&nbsp;
					<PrimaryButton size="large" label="Remove Story" iconName="search"/>&nbsp;&nbsp;
					<PrimaryButton size="large" label="Remove Story" iconName="add"/>&nbsp;&nbsp;
					<PrimaryButton size="large" label="Remove Story" icon={<i className="fa fa-facebook" aria-hidden="true"></i>}/>&nbsp;&nbsp;
					<PrimaryButton size="large" label="Remove Story" icon={<i className="fa fa-bullseye" aria-hidden="true"></i>}/>
					<br/><br/>

					Primary without icon: <PrimaryButton size="large" label="Remove Story"/>
				</section>
				<section>
					Secondary : <SecondaryButton size="large" label="Remove Story" iconName="grade"/>&nbsp;&nbsp;
					<SecondaryButton size="large" label="Remove Story" iconName="search"/>&nbsp;&nbsp;
					<SecondaryButton size="large" label="Remove Story" iconName="add"/>&nbsp;&nbsp;
					<SecondaryButton size="large" label="Remove Story" icon={<i className="fa fa-facebook" aria-hidden="true"></i>}/>&nbsp;&nbsp;
					<SecondaryButton size="large" label="Remove Story" icon={<i className="fa fa-bullseye" aria-hidden="true"></i>}/>
					<br/><br/>

					Secondary without icon: <SecondaryButton size="large" label="Remove Story"/>
				</section>

				<h1>Small Buttons</h1>
				<section>
					Primary : <PrimaryButton size="small" label="Remove Story" iconName="grade"/>&nbsp;&nbsp;
					<PrimaryButton size="small" label="Remove Story" iconName="search"/>&nbsp;&nbsp;
					<PrimaryButton size="small" label="Remove Story" iconName="add"/>&nbsp;&nbsp;
					<PrimaryButton size="small" label="Remove Story" icon={<i className="fa fa-facebook" aria-hidden="true"></i>}/>&nbsp;&nbsp;
					<PrimaryButton size="small" label="Remove Story" icon={<i className="fa fa-bullseye" aria-hidden="true"></i>}/>
					<br/><br/>

					Primary without icon: <PrimaryButton size="small" label="Remove Story"/>
				</section>
				<section>
					Secondary : <SecondaryButton size="small" label="Remove Story" iconName="grade"/>&nbsp;&nbsp;
					<SecondaryButton size="small" label="Remove Story" iconName="search"/>&nbsp;&nbsp;
					<SecondaryButton size="small" label="Remove Story" iconName="add"/>&nbsp;&nbsp;
					<SecondaryButton size="small" label="Remove Story" icon={<i className="fa fa-facebook" aria-hidden="true"></i>}/>&nbsp;&nbsp;
					<SecondaryButton size="small" label="Remove Story" icon={<i className="fa fa-bullseye" aria-hidden="true"></i>}/>
					<br/><br/>

					Secondary without icon: <SecondaryButton size="small" label="Remove Story"/>
				</section>

			</Wrapper>
		)
	}
});

export default MoodboardPage;