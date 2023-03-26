import React, { Component } from "react";

import axios from "axios";

class TaskList extends Component {
  state = {
    task: "",
  };

  onSubmitClic = () => {
    // calling of endpoint
    axios.post("http://localhost:4000/addTask", {
      task: this.state.task,
    });
  };

  onDeleteClic = () => {
    console.log("inside Delete");
  };

  render() {
    return (
      <div>
        <h3>TaskList</h3>
        <div className="ui input">
          <input
            value={this.state.task}
            onChange={(e) =>
              this.setState({
                task: e.target.value,
              })
            }
            placeholder="your task..."
          />
        </div>
        <button
          className="ui primary button basic"
          onClick={() => this.onSubmitClic()}
        >
          Submit
        </button>
        <hr />
        <div className="ui cards">
          <div className="card">
            <div className="content">
              <div className="meta">Friends of Veronica</div>
              <div className="extra content">
                <div className="ui two buttons">
                  <div className="ui basic green button">Done</div>
                  <div
                    className="ui basic red button"
                    onClick={() => this.onDeleteClic()}
                  >
                    Delete
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskList;
