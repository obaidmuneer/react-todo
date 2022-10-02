import './index.css'

let List = (props) => {
    return <>
        <li >
            <div className='list' > {props.text}</div>
            <button className='btn button edit' onClick={() => props.onEdit(props.id)}>Edit</button>
            <button className='btn button delete' onClick={() => props.onDel(props.id)} >Delete</button>
        </li>
    </>
}

export default List;