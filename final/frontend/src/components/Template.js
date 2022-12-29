import Title from './Title';

const Template = ({ name }) => {
	return (
		<>
			<Title />
			<h4>hi, {name}</h4>
			<h1>Choose a template</h1>
			<div className='block' id='left'></div>
			<div className='block' id='middle'></div>
			<div className='block' id='right'></div>
		</>
	);
}

export default Template;