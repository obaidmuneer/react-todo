import { useState } from "react";
import './App.css';

function App() {

  const [todos, setTodos] = useState([])
  const [item, setItems] = useState('')
  const [btnText, setBtnText] = useState('Add')
  const [id, setId] = useState('')

  let itemValue = (value) => {
    setItems(value)
  }
  let add = (e) => {
    e.preventDefault()
    setTodos([...todos, item])
    setItems('')
  }
  let edit = (i) => {
    setItems(todos[i])
    setBtnText('Update')
    setId(i)
  }
  let update = (e) => {
    e.preventDefault()
    let editedItem = [...todos]
    editedItem[id] = item 
    setTodos(editedItem)
    setBtnText('Add')
    setItems('')
  }
  let del = (i) => {
    let updatedTodos = todos.filter((item, index) => {
      return index !== i
    })
    setTodos(updatedTodos)
  }

  return (
    <div className="App">
      <form onSubmit={(id > -1) ? update : add} >
        <span>Todo : </span><input onChange={(e) => itemValue(e.target.value)} value={item} type="text" />
        <button type="submit">{btnText}</button>
      </form>
      <ul>
        {
          todos.map((item, index) => {
            return <li key={index}>
              <span>{item}</span>
              <button onClick={() => edit(index)}>Edit</button>
              <button onClick={() => del(index)} >Delete</button>
            </li>
          })
        }
      </ul>
    </div>
  );
}

export default App;
