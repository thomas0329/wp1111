import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	h1{
		margin: 0;
		margin-right: 20px;
		font-size: 3em;
	}
`

const Description = () => {
	return (
		<Wrapper>
			<h4>Click anywhere to continue</h4>
		</Wrapper>
	);
};

export default Description;