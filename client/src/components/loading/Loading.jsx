import PropagateLoader  from "react-spinners/PropagateLoader";



const Loading = ({size}) => {
  return (
    <div className="loading">
        <PropagateLoader  color="#ffff" loading="true" size={size} speedMultiplier="1" />
    </div>
  )
}

export default Loading