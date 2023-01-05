import Title from '../components/Title';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useComic } from './hooks/useComic';

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
const ButtonWrapper = styled.div`
	width: 100%
	height: 100px;
	display: flex;
	justify-content: space-evenly;

`

const Template = ({ name }) => {

	const { setCurrentTemplate } = useComic();
	const navigate = useNavigate();

	const handleClick = (event) => {
		setCurrentTemplate(event.currentTarget.id);
		navigate('/block');
	}

	const goCreate = () => {
		navigate('/edit')
	}


	const handleNext = () => {
		navigate('/gallery')
	}
	return (
		<>
			<Title />
			<h4>Hi, {name}</h4>
			<ButtonWrapper>
				<button onClick={goCreate}>Create new</button>
				<button onClick={handleNext}>My Gallery</button>
			</ButtonWrapper>

			{/* <h1>Choose a template</h1>
			<BlockWrapper>
				<BlockPreview id='four-frame' onClick={handleClick}>
					<img src='templates/1.png' />
				</BlockPreview>
				<BlockPreview id='slanted' onClick={handleClick}>
					<img src='templates/2.png' />
				</BlockPreview>
				<BlockPreview id='three-frame' onClick={handleClick}>
					<img src='templates/3.png' />
				</BlockPreview>
			</BlockWrapper> */}
		</>
	);
}

export default Template;