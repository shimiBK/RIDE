import PropagateLoader  from "react-spinners/PropagateLoader";





const Loading = () => {
  return (
    <div className="loading">
        <PropagateLoader  color="#ffff" loading="true" size="30" speedMultiplier="1" />
    </div>
  )
}

export default Loading