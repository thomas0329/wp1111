import styled from 'styled-components';
import Title from './Title';

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

const Block = ({ template }) => {

	
	const workingTemplate = () => {
		switch(template){
			case 'four-frame':
				return (null);
			default: 
				return (null);
		}
	}
	return (
		<>
			<Title />
			<h1>Choose a block</h1>
			{workingTemplate()}
		</>
	);
}

export default Block;