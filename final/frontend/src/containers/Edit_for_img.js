import Title from "../components/Title";
import styled from 'styled-components';

const EditBox = styled.div`
  width: 300px;
	height: 300px;
  border: 3px black solid;
`

const Edit = () => {
  const handleClick = () => {
    console.log('test');
  }
  return (
    <>
      <Title />
      <EditBox>

      </EditBox>
      <form method='POST' action='edit' encType="multipart/form-data">
        <input type='file' name='image' />
        <input type='submit' onClick={handleClick}/>
      </form>
    </>
  );
}
export default Edit;