import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      title: "",
      description: "",
      tasks: [],
    };

    // associate events to the functions in the class
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addTask(e) {
    // send data to the server
    if (this.state._id) {
      fetch(`/api/task/id/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.json().then((data) => {
          console.log(data);
          M.toast({ html: "Task Update" });
          this.setState({ title: "", description: "", _id: "" });
          this.fetchTask(); // ask for the task in the server when the write of new task was done
        })
      );
    } else {
      fetch("/api/task", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) =>
          res.json().then((data) => {
            console.log(data);
            M.toast({ html: "Task Saved" });
            this.setState({ title: "", description: "", _id: "" });
            this.fetchTask(); // ask for the task in the server when the write of new task was done
          })
        )
        .catch((err) => console.error(err));
    }
    e.preventDefault();
  }

  handleChange(e) {
    const { name, value } = e.target; //obtain form e.target just name and value
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    console.log("Component was mounted");
    this.fetchTask();
  }

  // function to make a query to DataBase
  fetchTask() {
    fetch("/api/task")
      .then((res) =>
        res.json().then((data) => {
          this.setState({ tasks: data });
          console.log(this.state.tasks);
        })
      )
      .catch((err) => console.error(err));
  }

  deleteTask(id) {
    // ask for confirmation
    if (confirm("Are you sure you want to delete the element?")) {
      console.log("deleting: ", id);
      fetch(`/api/task/id/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.json().then((data) => {
          console.log(data);
          M.toast({ html: "Task Deleted" });
          this.fetchTask();
        })
      );
    }
  }

  editTask(id) {
    fetch(`/api/task/id/${id}`)
      .then((res) =>
        res.json().then((data) => {
          console.log(data);
          this.setState({
            _id: data._id,
            title: data.title,
            description: data.description,
          });
        })
      )
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div>
        {/* Navigationn */}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="barnd-logo" href="/">
              MERN Stack
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col 5s">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          type="text"
                          placeholder="Task Title"
                          onChange={this.handleChange}
                          value={this.state.title}
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          name="description"
                          className="materialize-textarea"
                          placeholder="Task Description"
                          onChange={this.handleChange}
                          value={this.state.description}
                        ></textarea>
                      </div>
                    </div>
                    <button className="btn light-blue darken-4" type="submit">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task) => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <button
                            className="btn light-blue darken-4"
                            onClick={() => this.editTask(task._id)}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                          <button
                            className="btn light-blue darken-4"
                            style={{ margin: "4px" }}
                            onClick={() => this.deleteTask(task._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
