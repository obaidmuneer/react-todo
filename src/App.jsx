import { useState, useEffect } from "react";
import './App.css';
import List from "./components/list";

function App() {
  const [todos, setTodos] = useState([])
  const [item, setItems] = useState('')
  const [course, setCourse] = useState('')
  const [btnText, setBtnText] = useState('Add')
  const [id, setId] = useState(-1)

  useEffect(() => {
    if (localStorage.getItem('course')) {
      setCourse(localStorage.getItem('course'))
    }
    return
  }, [])

  let addCourse = (e) => {
    e.preventDefault()
    if (!course) {
      return
    }
    // console.log(course);
    localStorage.setItem('course', course)
  }

  let add = (e) => {
    e.preventDefault()
    if (!item) {
      return
    }
    setTodos([...todos, { course, text: item }])
    console.log(todos);
    setItems('')
  }
  let edit = (i) => {
    console.log(todos);
    console.log(i);
    // setItems(todos[i].text)
    // setBtnText('Update')
    // setId(i)
  }
  let update = (e) => {
    e.preventDefault()
    let editedItem = [...todos]
    // console.log(editedItem[id].text);
    editedItem[id].text = item
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
      <div className="header">
        <h2>Sysborg Clone</h2>
      </div>
      <div className="body">
        <form onSubmit={addCourse}>
          <input className="item" onChange={(e) => setCourse(e.target.value)} value={course} type="text" />
          <button className="btn add itemButton" type="submit">Add Course</button>
        </form><br />
        <form onSubmit={(id > -1) ? update : add}>
          <input className="item" onChange={(e) => setItems(e.target.value)} value={item} type="text" />
          <button className="btn add itemButton">{btnText}</button>
        </form>
        <ul>
          {
            todos.filter((item, index) => {
              return item.course === course
            }).map((item, index) => {
              return <List
                key={index}
                id={index}
                text={item.text}
                onEdit={edit}
                onDel={del}
              />
            })
            // selectedCourse.map((item, index) => {
            //   return <List
            //     key={index}
            //     id={index}
            //     text={item.text}
            //     onEdit={edit}
            //     onDel={del}
            //   />
            // })
          }
        </ul>
      </div>
    </div >
  );
}

export default App;
