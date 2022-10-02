import { useState } from "react";
import './App.css';
import List from "./components/list";

function App() {
  const [todos, setTodos] = useState([])
  const [item, setItems] = useState('')
  const [btnText, setBtnText] = useState('Add')
  const [id, setId] = useState(-1)

  let add = (e) => {
    e.preventDefault()
   if (!item) {
     return
   }
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
    setId(-1)
  }
  let del = (i) => {
    let updatedTodos = todos.filter((item, index) => {
      return index !== i
    })
    setTodos(updatedTodos)
  }
  return (
    <div className="container">
      <div class="header">
        <h2>Simple Todo App</h2>
      </div>
      <div className="body">
        <form onSubmit={(id > -1) ? update : add} >
          <input className="item" onChange={(e) => setItems(e.target.value)} value={item} type="text" />
          <button className="btn add itemButton" type="submit">{btnText}</button>
        </form>
        <ul>
          {
            todos.map((item, index) => {
              return <List
                key={index}
                id={index}
                text={item}
                onEdit={edit}
                onDel={del}
              />
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
