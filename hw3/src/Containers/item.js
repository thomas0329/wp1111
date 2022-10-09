import { Component } from "react";
import App from "./App";

//bad idea
var ID = 1;

class Todo_app__item extends Component{

    constructor(props){
        super(props);
        this.state = {
            on: true
        }
        this.id = ID++;
    }
    button_clicked = () =>{
        var detail = document.getElementById(this.id).parentNode.parentNode.lastChild;
 
        if (this.state.on == true){
            detail.style.textDecoration = 'line-through';
            detail.style.opacity = '0.5';
            this.state.on = false;
            this.props.one_less_undone();
        }
        else{
            detail.style.textDecoration = '';
            detail.style.opacity = '1';
            this.state.on = true;
            this.props.one_more_undone();
        }
        console.log(this.props.undone);
    }
    render(){
        // console.log(typeof(this.props.todo_id));
        // console.log(id);
        return(
            <li className='todo-app__item'>
                <div className="todo-app__checkbox">
                    <input type='checkbox' id={this.id}></input>
                    <label htmlFor={this.id} onClick={this.button_clicked}></label>
                </div>
                <h1 className="todo-app__item-detail">{this.props.detail}</h1>
            </li>
        )
    }
}
export default Todo_app__item;
