import React from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formUser: {
                name: "",
                lastname: "",
                email: "",
                password: ""
            }
        };
    }
    registerUser = event => {
        event.preventDefault();
        fetch("/register", {
            method: "POST",
            headers: { "content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(this.state.formUser)
        })
            .then(response => {
                console.log(response)
                if (response.status === 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Ya existe un usuario con este correo"
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Registro Exitoso",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

                return response.json();
            })
            .then(myJson => {
                this.clear();

            })
            .catch(error => console.log(error));
    };

    //saveUser almacena los datos en un estado para despues ser enviado al servidor y se agreguen los usuarios nuevos
    saveUser = event => {
        this.setState({
            formUser: {
                ...this.state.formUser,
                [event.target.name]: event.target.value
            }
        });
    };

    clear = () => {
        this.setState({
            formUser: {
                name: "",
                lastname: "",
                email: "",
                password: ""
            }
        });
    };

    render() {
        return (
            <div>
                <div className="container-form">
                    <div className="imggradient" >
                        <div className="text">
                            la magia de ser quien eres.
                            descubre nuevas formas de mejorar tu vida sin olvidarse de nada
                                </div>
                    </div>

                    <div className="row">
                        <form onSubmit={this.registerUser}>
                            <h1>Registro de Usuario</h1>
                            <div className="row">
                                <input
                                    onChange={this.saveUser}
                                    type="text"
                                    name="name"
                                    placeholder="Nombre"
                                    value={this.state.formUser.name}
                                />
                                <input
                                    onChange={this.saveUser}
                                    type="text"
                                    name="lastname"
                                    placeholder="Apellidos"
                                    value={this.state.formUser.lastname}
                                />
                                <input
                                    onChange={this.saveUser}
                                    type="email"
                                    name="email"
                                    placeholder="tu mejor e-mail"
                                    value={this.state.formUser.email}
                                />
                                <input
                                    onChange={this.saveUser}
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={this.state.formUser.password}
                                />
                            </div>
                            <br></br>
                            <button type="submit"> Enviar </button>
                        </form>
                        <p>Ya tienes una cuenta <Link className="Link" to="/Login">Inicia Sesion</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;
