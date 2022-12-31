import Title from "../components/Title";
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Edit = () => {
  return (
    <Wrapper>
      <Title />
      <h1>Edit</h1>
    </Wrapper>
  )
}

export default Edit;