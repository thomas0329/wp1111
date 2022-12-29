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

const Block = () => {
	return (
		<>
            <Title />
			<h1>Choose a block</h1>
		</>
	);
}

export default Block;