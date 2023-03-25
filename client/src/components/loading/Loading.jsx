import PropagateLoader  from "react-spinners/PropagateLoader";


const Loading = ({size,color}) => {
  return (
    <div className="loading">
        <PropagateLoader  color={color} loading="true" size={size} speedMultiplier="1" />
    </div>
  )
}

export default Loading