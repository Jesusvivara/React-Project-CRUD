import React from "react";

class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formTask: {}
        };
    }

    addTask = event => {
        event.preventDefault();
        let url = "/tasks";
        let options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(this.state.formTask)
        };

        fetch(url, options)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.props.getTasks();
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleInput = event => {
        this.setState({
            formTask: {
                ...this.state.formTask,
                [event.target.name]: event.target.value
            }
        });
    };

    render() {
        return (
            <div>
                <h1>Añadir Tareas Nuevas</h1>
                <form onSubmit={this.addTask} >
                    <input onChange={this.handleInput} name="content" type="text" placeholder="No debo olvidarme de..." required />
                    <input onChange={this.handleInput} name="date" type="date" placeholder="Fecha" required />
                    <button type="submit" >Agregar tarea</button>
                </form>
            </div>
        );
    }
}
export default EditTask;