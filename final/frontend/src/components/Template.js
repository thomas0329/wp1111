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
	img {
		width: 100%;
		height: 100%;
	}
`

const Template = ({ name }) => {

	const { setCurrentTemplate } = useComic();
	const navigate = useNavigate();

	const handleClick = (event) => {
		setCurrentTemplate(event.currentTarget.id);
		navigate('/block');
	}

	return (
		<>
			<Title />
			<h4>hi, {name}</h4>
			<h1>Choose a template</h1>
			<BlockWrapper>
				<BlockPreview id='four-frame' onClick={handleClick}>
					<img src='img/template1.png' />
				</BlockPreview>
				<BlockPreview id='slanted' onClick={handleClick}>
					<img src='img/template2.png' />
				</BlockPreview>
				<BlockPreview id='three-frame' onClick={handleClick}>
					<img src='img/template3.png' />
				</BlockPreview>
			</BlockWrapper>
		</>
	);
}

export default Template;