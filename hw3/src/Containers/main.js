// no use

import { Component, useCallback } from "react";
import Todo_app__list from './list'

class Todo_app__main extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <section className='todo-app__main'>
                <input value={this.props.inputValue} onKeyDown={this.props.handleKeyDown} onChange={this.props.handleChange}
                className='todo-app__input' placeholder='What needs to be done?'/>
                <Todo_app__list handleChange={this.props.handleChange} handleKeyDown={this.props.handleKeyDown}
                todo_items={this.props.todo_items} id="todo-list" todo_ids={this.props.todo_ids} 
                one_less_undone={this.props.one_less_undone} one_more_undone={this.props.one_more_undone} undone={this.props.undone}></Todo_app__list>
            </section>
        );
    }
}
export default Todo_app__main;
