import React from "react";
import AddTask from "./AddTask"

export default class tasks extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
        };
        console.log(this.state.tasks)
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks = () => {
        const url = "/tasks?limit=100";
        fetch(url)
            .then(response => response.json())
            .then(myJson => {
                this.setState({ tasks: myJson.results });
                console.log(myJson);
            })
            .catch(error => console.log(error));
    };

    render() {
        return (
            <div>
                <AddTask />
                <h2>Hola estas son tus tareas pendientes</h2>
                <div>
                    {this.state.tasks.map((task, index) => {
                        return (
                            <div key={index}>
                                <div >
                                    <span>{task.content}</span>
                                    <span >{task.date}</span>
                                    <div>
                                        <button>Editar</button>
                                        <button>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}
