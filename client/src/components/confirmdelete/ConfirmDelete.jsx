import "./confirmdelete.css"

const ConfirmDelete = ({message,handleDelete,cancelDel}) => {
  return (
    <div className="confirmDel">
    <div className="delModal">
            <span className="confirmText">{message}</span>
        <div className="delBtns">
            <button className="deletelBtn" onClick={handleDelete}>DELETE</button>
            <button className="cancelBtn" onClick={()=>cancelDel(false)}>CANCEL</button>
        </div>
    </div>
</div>
  )
}

export default ConfirmDelete