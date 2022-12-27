import Title from './Title';
import Description from './Description';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
	height: 100%;
`

const MainPage = () => {
	// use navigate here
	const navigate = useNavigate();
	return (
		<Wrapper onClick={() => {navigate('/login');}}>
			<Title />
			<Description />
		</Wrapper>
	);
};

export default MainPage;