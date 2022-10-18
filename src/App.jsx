import { useState } from "react";
import './App.css';
import List from "./components/list";

function App() {
  const [todos, setTodos] = useState([])
  const [item, setItems] = useState('')
  const [course, setCourse] = useState('')
  const [courseId, setCourseId] = useState('')
  const [courseItems, setCourseItems] = useState([])
  const [btnText, setBtnText] = useState('Add')
  const [id, setId] = useState(-1)

  let addCourse = (e) => {
    e.preventDefault()
    if (!course) {
      return
    }
    for (let i = 0; i < todos.length; i++) {
      const element = todos[i];
      if (element.hasOwnProperty(course)) {
        setCourseItems(element[course].item)
        setCourseId(i)
        return
      }
    }
    setTodos([...todos, { [course]: { item: [] } }])
    setCourseItems([])
    // localStorage.setItem('course', course)
  }

  let add = (e) => {
    e.preventDefault()
    if (!item) {
      return
    }
    let data = todos
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.hasOwnProperty(course)) {
        element[course].item.push(item)
        setCourseId(i)
        setCourseItems(element[course].item)
      }
    }
    setTodos(data)
    setItems('')
  }
  let edit = (i) => {
    setItems(todos[courseId][course].item[i])
    setBtnText('Update')
    setId(i)
  }
  let update = (e) => {
    e.preventDefault()
    let editedItem = [...todos]
    editedItem[courseId][course].item[id] = item
    setTodos(editedItem)
    setBtnText('Add')
    setItems('')
    setId(-1)
  }
  let del = (i) => {
    let updatedItem = todos
    let updatedTodos = courseItems.filter((item, index) => {
      return index !== i
    })
    updatedItem[courseId][course].item = updatedTodos
    setCourseItems(updatedTodos)
    setTodos(updatedItem)
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Sysborg Clone</h2>
      </div>
      <div className="body">
        <form onSubmit={addCourse}>
          <input className="item" onChange={(e) => setCourse(e.target.value)} value={course} type="text" autoFocus />
          <button className="btn add itemButton" type="submit">Add Course</button>
        </form><br />
        <form onSubmit={(id > -1) ? update : add}>
          <input className="item" onChange={(e) => setItems(e.target.value)} value={item} type="text" />
          <button className="btn add itemButton">{btnText}</button>
        </form>
        <ul>
          {
            courseItems.map((item, index) => {
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
    </div >
  );
}

export default App;
