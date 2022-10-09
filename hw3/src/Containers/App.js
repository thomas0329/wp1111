import '../App.css';
import '../styles.css'
import { Component } from 'react';
import Todo_app__list from './list';
import Header from '../Components/header'
import Todo_app__main from './main';
import Footer from '../Components/footer';

class App extends Component{
  
  constructor(props){
    super(props)
    this.state = {
        todo_items: [],
        inputValue: '',
        undone_count: 0,
        // todo_ids: []
        on: false
    }
  }

  one_less_undone_task = () =>{
    this.setState(state => ({undone_count: state.undone_count - 1}));
  }

  one_more_undone_task = () =>{
    this.setState(state => ({undone_count: state.undone_count + 1}));
  }

  handleKeyDown = event => {
      if (event.key === 'Enter' && this.state.inputValue !== '') {
        let new_item = event.target.value;
        const updated_items = [...this.state.todo_items, new_item];
        // const updated_ids = [...this.state.todo_ids, next_todo_id++];
        this.setState({
            todo_items: updated_items,
            inputValue: '',
            undone_count: this.state.undone_count + 1,
            // todo_ids: updated_ids
        })
        // console.log(this.state.undone_count);
        this.state.on = true;
      }
  }

  handleChange = event => {
      this.setState({
          inputValue: event.target.value,
      })
  }    
  
  render(){
    return (
      <div id='root' className='todo-app__root'>
        <Header></Header>

        <Todo_app__main inputValue={this.state.inputValue} todo_items={this.state.todo_items} todo_ids={this.state.todo_ids}
        handleChange={this.handleChange} handleKeyDown={this.handleKeyDown} one_less_undone={this.one_less_undone_task}
        one_more_undone={this.one_more_undone_task} undone={this.state.undone_count}></Todo_app__main>

        <Footer undone={this.state.undone_count} on={this.state.on}></Footer>
      </div>
    );
  }
  
}

export default App;
