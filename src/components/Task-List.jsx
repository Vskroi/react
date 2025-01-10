const TaskList = (props) => {
    const {text, className, style} = props;
    return (
   
        <p className={className} style={style} >{text}</p>
        )
}
export default TaskList