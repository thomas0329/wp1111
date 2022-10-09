import { Component } from "react";
import Todo_app__item from './item'

class Todo_app__list extends Component{
    render(){
        return(
            <ul className="todo-app__list">
                {this.props.todo_items.map(e => <Todo_app__item detail={e} handleChange={this.props.handleChange}
                handleKeyDown={this.props.handleKeyDown} todo_id={this.props.todo_ids}
                one_less_undone={this.props.one_less_undone} one_more_undone={this.props.one_more_undone} undone={this.props.undone}></Todo_app__item>)}
            </ul>
        )
    }
}
export default Todo_app__list;