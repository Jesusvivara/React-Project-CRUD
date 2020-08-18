import React from "react";
import Swal from "sweetalert2";
import moment from "moment";

export default class tasks extends React.Component {
<<<<<<< HEAD
  constructor() {
    super();
    this.state = {
      tasks: [],
      formTareas: {},
      newTask: {}
=======
    constructor() {
        super();
        this.state = {
            tasks: [],
            formTareas:{},
            newTask:{},
            filter:""
        };
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks = () => {
        const url = "/tasks?limit=20";
        fetch(url)
            .then(response => response.json())
            .then(myJson => {
                this.setState({ tasks: myJson.results });
                console.log(myJson);
            })
            .catch(error => console.log(error));
>>>>>>> a5a093053f1dc6074875600f7ffd0e0c3d5cbc90
    };
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    const url = "/tasks?limit=20";
    fetch(url)
      .then(response => response.json())
      .then(myJson => {
        this.setState({ tasks: myJson.results });
        console.log(myJson);
      })
      .catch(error => console.log(error));
  };

  deleteTarea = (_id) => {
    let url = "https://academlo-todolist.herokuapp.com/tasks/" + _id;
    fetch(url, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.ok === false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrio un error al borrar tu tarea"
          });
        } else {
          Swal.fire("Tarea eliminada");
        }
        return response.json;
      })
      .then((myjson) => this.getTasks())
      .catch((error) => console.log(error));
  };

  addEditTask = event => {
    event.preventDefault();
    let url = "https://academlo-todolist.herokuapp.com/tasks/" + this.state.formTareas._id;
    let options = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(this.state.formTareas)
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok === false) {
          Swal.fire({
            icon: "error",
            title: "selecciona la tarea a editar",
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "Se modifico la tarea",
            showConfirmButton: false,
            timer: 1500
          });
        }
        return response.json();
      })
      .then(myJson => {
        this.getTasks();
        this.clearEdit();
      })
      .catch(error => {
        console.log(error);
      });
  };


  addTask = event => {
    event.preventDefault();
    let url = "https://academlo-todolist.herokuapp.com/tasks/";
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(this.state.newTask)
    };

    fetch(url, options)
      .then(response => {
        if (response.ok === false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salio mal"
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Tarea agregada",
            showConfirmButton: false,
            timer: 1500
          });
        }
        return response.json();
      })
      .then(myJson => {
        this.getTasks();
        this.clearForm();
      })
      .catch(error => {
        console.log(error);
      });
  };


  setFormTarea = (task) => {
    this.setState({ formTareas: task });
  };


  handleInputEdit = event => {
    this.setState({
      formTareas: {
        ...this.state.formTareas,
        [event.target.name]: event.target.value
      }
    });
  };

  handleInputAdd = event => {
    this.setState({
      newTask: {
        ...this.state.newTask,
        [event.target.name]: event.target.value
      }
    });
  };


  clearEdit = () => {
    this.setState({
      formTareas: {
        content: "",
        date: ""
      }
    });
  };

  clearForm = () => {
    this.setState({
      newTask: {
        content: "",
        date: ""
      }
    });
  };

  formatDate = (date) => {
    let newDate = new Date(date).toLocaleDateString();
    let dateArray = newDate.split("/");
    let day =
      Number(dateArray[0]) < 10 ? "0" + dateArray[0] : dateArray[0].toString();
    let month =
      Number(dateArray[1]) < 10 ? "0" + dateArray[1] : dateArray[1].toString();
    let year = dateArray[2];
    newDate = `${year}-${month}-${day}`;
    return newDate;
  };

  myEditForm() {
    return (
      <div>
        <h1>Editar tarea</h1>
        <div>
          <form onInput={this.handleInputEdit} onSubmit={this.addEditTask}>
            <div>
              <input
                name="content"
                type="text"
                value={this.state.formTareas.content}
                required
              />
              <input
                name="date"
                type="date"
                value={this.state.formTareas.date}
                required
              />
            </div>
            <div>
              <input type="submit" value="Editar Tarea" />
            </div>
          </form>
        </div>
      </div>
    );
  }

  myAddTask() {
    return (
      <div>
        <h1>Añadir Tareas Nuevas</h1>
        <div>
          <form onSubmit={this.addTask} onInput={this.handleInputAdd} >
            <div>
              <input
                name="content"
                type="text"
                placeholder="No debo olvidarme de..."
                value={this.state.newTask.content}
                required
              />
            </div>
            <div>
              <input
                name="date"
                type="date"
                placeholder="Fecha"
                value={this.state.newTask.date}
                required
              />
            </div>
            <div>
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }

<<<<<<< HEAD
  onChangeSelect = (task) => {
    let today = moment(); //Fecha de hoy usando moment
    let startOfWeek = moment().startOf("week");
    let endOfWeek = moment().endOf("week");
    let startOfNextWeek = moment(endOfWeek).add(1, "seconds");
    let endOfNextWeek = moment(endOfWeek).add(7, "days");
    switch (this.state.tasks) {
      case "today":
        if (moment(task.date).isSame(today, "day")) {
          return true;
=======
      onChangeSelect = (task) => {
        let today = moment(); //Fecha de hoy usando moment
        let startOfWeek = moment().startOf("week");
        let endOfWeek = moment().endOf("week");
        let startOfNextWeek = moment(endOfWeek).add(1, "seconds");
        let endOfNextWeek = moment(endOfWeek).add(7, "days");
        switch (this.state.filter) {
          case "today":
            if (moment(task.date).isSame(today, "day")) {
              return true;
            }
            return false;
          case "week":
            if (moment(task.date).isBetween(startOfWeek, endOfWeek)) {
              return true;
            }
            return false;
          case "nextWeek":
            if (moment(task.date).isBetween(startOfNextWeek, endOfNextWeek)) {
              return true;
            }
            return false;
          case "complete":
            if (task.is_completed) {
              return true;
            }
            return false;
          case "noComplete":
            if (!task.is_completed) {
              return true;
            }
            return false;
          default:
            return true;
>>>>>>> a5a093053f1dc6074875600f7ffd0e0c3d5cbc90
        }
        return false;
      case "week":
        if (moment(task.date).isBetween(startOfWeek, endOfWeek)) {
          return true;
        }
        return false;
      case "nextWeek":
        if (moment(task.date).isBetween(startOfNextWeek, endOfNextWeek)) {
          return true;
        }
        return false;
      case "complete":
        if (task.is_completed) {
          return true;
        }
        return false;
      case "noComplete":
        if (!task.is_completed) {
          return true;
        }
        return false;
      default:
        return true;
    }
  };


  render() {
    return (
      <div>
        <div>
          <div>
            {this.myAddTask()}
          </div>
          <div>
            {this.myEditForm()}
            <div>
              <select onChange={(event) => this.onChangeSelect(event.target.value)}>
                <option value="all">Todas</option>
                <option value="today">Hoy</option>
                <option value="week">En la semana</option>
                <option value="nextWeek">Proxima semana</option>
              </select>
            </div>
          </div>
        </div>
        <h2>Hola estas son tus tareas pendientes</h2>
        <div>
          {this.state.tasks.map((task, index) => {
            return (
              <div key={index}>
                <div>
<<<<<<< HEAD
                  {task.content}
                  <br />
                  <input
                    type="date"
                    value={this.formatDate(task.date)}
                    disabled="true"
                  />
                  <div>
                    <button onClick={() => this.setFormTarea(task)}>Editar</button>
                    <button onClick={() => this.deleteTarea(task._id)}>Eliminar</button>
                  </div>
=======
                    <div>
                        {this.myAddTask()}
                    </div>
                    <div>
                        {this.myEditForm()}
                        <div>
                          <select onChange={(event) => this.setState({...this.state,filter:event.target.value})}>
                            <option value="all">Todas</option>
                            <option value="today">Hoy</option>
                            <option value="week">En la semana</option>
                            <option value="nextWeek">Proxima semana</option>
                          </select>
                        </div>
                    </div>
                </div>
                <h2>Hola estas son tus tareas pendientes</h2>
                <div>
                    {this.state.tasks.filter((task) => this.onChangeSelect(task)).map((task, index) => {
                        return (
                            <div key={index}>
                                <div>
                                    {task.content}
                                    <br/>
                                    <input 
                                    type="date"
                                    value={this.formatDate(task.date)}
                                    disabled="true"
                                    />
                                    <div>
                                        <button onClick={()=>this.setFormTarea(task)}>Editar</button>
                                        <button onClick={()=>this.deleteTarea(task._id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
>>>>>>> a5a093053f1dc6074875600f7ffd0e0c3d5cbc90
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}
