const Button = (props) => {
    const {text, className, onClick, style} = props;
    return (
   
    <div className={className} style={style} onClick={onClick}>{text}</div>
    )
}
export default Button