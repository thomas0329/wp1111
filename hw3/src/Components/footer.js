
export default (props) =>{
    if(props.on == false)
        return;
    else{
        return(
            <footer id='todo-footer' className='todo-app__footer'>
                <div className='todo-app__total'>{props.undone} left</div>
            </footer>
        );
    }   
    
    
}
