import React, { useEffect, useState } from "react";

export function ProductComponent() {
  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [
      {
        id: 1,
        title: "Ini adalah judul baru",
        article: "Ini adalah artikel di konten",
        completed: false,
      },
      {
        id: 2,
        title: "Fix the bug at the projects",
        article: "Ini adalah artikel di konten",
        completed: false,
      },
      {
        id: 3,
        title: "Meeting with my team",
        article: "Ini adalah artikel di konten",
        completed: true,
      },
    ];
  });

  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    alert("Berhasil di submit");
    const newTask = {
      id: Date.now(),
      title,
      article,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setArticle("");
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const deleteDataItem = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((data) => setData(data.posts))
      .catch((error) => console.error("Fetching data error", error));
  }, []);

  if (!data.length) {
    return <h4>Loading...</h4>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>My Project</h1>
      <form style={styles.form}>
        <input
          type="text"
          placeholder="Masukan Judul Article"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          style={styles.input}
        />
      </form>
      <hr />
      <form style={styles.form}>
        <input
          type="text"
          placeholder="Masukan konten Article"
          value={article}
          onChange={(event) => setArticle(event.target.value)}
          style={styles.input}
        />
      </form>

      <button onClick={addTask} style={styles.buttonAdd}>
        Add Post
      </button>

      {tasks.map((task) => (
        <div key={task.id} style={styles.task}>
          <h3>{task.title}</h3>
          <button style={styles.buttonDefault}>default</button>
          <p>{task.article}</p>
          <button onClick={() => deleteTask(task.id)} style={styles.buttonDelete}>
            Delete
          </button>
        </div>
      ))}

      {data.map((item, index) => (
        <div key={index} style={styles.task}>
          <h2>{item.title}</h2>
          <h4 style={styles.tags}>-{item.tags}-</h4>
         
          <p>{item.body}</p>
          
          <button onClick={() => deleteDataItem(item.id)} style={styles.buttonDelete}>
            Delete
          </button> <h5>{item.views} penonton</h5>
        </div>
      ))}
    </div>
  );
}

const styles = {
  wrap: {
    padding: '20px',
    maxWidth: '960px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    flexWrap:'wrap',
    display:'flex',
    flexDirection:'row'
  },
  container:{
    padding: '20px',
    maxWidth: '960px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'left',
    color: '#333',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
  },
  buttonAdd: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '20px',
  },
  task: {
    backgroundColor: 'white',
    border: '5px solid #ddd',
    padding: '20px',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  buttonDefault: {
    backgroundColor: '#ccc',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonDelete: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    justifyContent:'center'
  },
  tags: {
    margin: '10px 0',
  },
};
