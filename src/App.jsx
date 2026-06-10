import { useState, useEffect } from 'react'
import './App.css' // <-- Подключаем наш CSS файл

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('pixel-tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    localStorage.setItem('pixel-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const startEdit = (task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const saveEdit = (id) => {
    if (editText.trim() !== '') {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, text: editText } : task
      ))
    }
    setEditingId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const font = "'Fira Code', monospace"

  return (
    // Добавили className="app-container"
    <div className="app-container" style={{ 
      fontFamily: font,
      backgroundColor: '#0d1117',
      color: '#00ff41',
      textShadow: '0 0 5px rgba(0, 255, 65, 0.3)'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        fontFamily: font, 
        margin: '0 0 30px 0',
        fontSize: '28px',
        color: '#00ff41'
      }}>
        &gt; Task Manager_
      </h1>
      
      <img 
        src="/pixel.jpg" 
        alt="Моя кошка Пиксель" 
        style={{ 
          width: '100%', 
          borderRadius: '15px',
          marginBottom: '30px',
          border: '2px solid #00ff41',
          boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
        }} 
      />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Введите задачу..."
          style={{
            flex: 1,
            padding: '12px',
            fontSize: '16px',
            fontFamily: font,
            backgroundColor: '#161b22',
            color: '#00ff41',
            border: '2px solid #00ff41',
            borderRadius: '8px',
            outline: 'none'
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontFamily: font,
            backgroundColor: '#00ff41',
            color: '#0d1117',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          [Добавить]
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 20px',
              fontSize: '14px',
              fontFamily: font,
              backgroundColor: filter === f ? '#00ff41' : '#161b22',
              color: filter === f ? '#0d1117' : '#00ff41',
              border: '2px solid #00ff41',
              borderRadius: '20px',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontWeight: filter === f ? 'bold' : 'normal'
            }}
          >
            {f === 'all' ? 'Все' : f === 'active' ? 'Активные' : 'Выполненные'}
          </button>
        ))}
      </div>

      <div>
        {filteredTasks.map(task => (
          // Добавили className="task-item"
          <div key={task.id} className="task-item">
            {editingId === task.id ? (
              <div style={{ display: 'flex', gap: '10px', flex: 1, width: '100%' }}>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && saveEdit(task.id)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    fontSize: '16px',
                    fontFamily: font,
                    backgroundColor: '#0d1117',
                    color: '#00ff41',
                    border: '2px solid #00ff41',
                    borderRadius: '6px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => saveEdit(task.id)}
                  style={{
                    padding: '8px 16px',
                    fontFamily: font,
                    backgroundColor: '#00ff41',
                    color: '#0d1117',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  [OK]
                </button>
                <button
                  onClick={cancelEdit}
                  style={{
                    padding: '8px 16px',
                    fontFamily: font,
                    backgroundColor: '#30363d',
                    color: '#00ff41',
                    border: '1px solid #00ff41',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  [Отмена]
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  style={{ 
                    width: '20px', 
                    height: '20px', 
                    cursor: 'pointer',
                    accentColor: '#00ff41'
                  }}
                />
                <span style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#8b949e' : '#00ff41',
                  fontFamily: font
                }}>
                  {task.text}
                </span>
              </div>
            )}

            {/* Добавили className="task-actions" */}
            {editingId !== task.id && (
              <div className="task-actions">
                <button
                  onClick={() => startEdit(task)}
                  style={{
                    padding: '8px 16px',
                    fontFamily: font,
                    backgroundColor: '#161b22',
                    color: '#ffa657',
                    border: '1px solid #ffa657',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  [Edit]
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    padding: '8px 16px',
                    fontFamily: font,
                    backgroundColor: '#161b22',
                    color: '#ff7b72',
                    border: '1px solid #ff7b72',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  [Del]
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <p style={{ 
          textAlign: 'center', 
          color: '#8b949e', 
          marginTop: '30px', 
          fontFamily: font 
        }}>
          {filter === 'all' ? 'Нет задач. Добавь первую!' : 
           filter === 'active' ? 'Нет активных задач' : 
           'Нет выполненных задач'}
        </p>
      )}

      <p style={{ 
        textAlign: 'center', 
        color: '#8b949e', 
        marginTop: '30px', 
        fontFamily: font,
        fontSize: '14px'
      }}>
        // Created by Anna & Pixel the cat 🐱
      </p>
    </div>
  )
}

export default App