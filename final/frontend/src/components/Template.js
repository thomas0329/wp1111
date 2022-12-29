import Title from './Title';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useComic } from '../containers/hooks/useComic';

const BlockWrapper = styled.div`
	width: 100%;
	height: 100px;
	display: flex;
	justify-content: space-evenly;
`
const BlockPreview = styled.div`
	width: 100px;
	height: 100px;
`
const BlockPreview1 = styled(BlockPreview)`
	background-color: blue;
`
const BlockPreview2 = styled(BlockPreview)`
	// background-color: red;
`
const BlockPreview3 = styled(BlockPreview)`
	// background-color: green;
`

const Template = ({ name }) => {

	const { setCurrentTemplate } = useComic();
	
	const navigate = useNavigate();
	return (
		<>
			<Title />
			<h4>hi, {name}</h4>
			<h1>Choose a template</h1>
			<BlockWrapper>
				<BlockPreview1 
					onClick={() => {
						setCurrentTemplate('four-frame');
						navigate('/block');
					}}
				/>
				<BlockPreview2 />
				<BlockPreview3 />
			</BlockWrapper>
		</>
	);
}

export default Template;