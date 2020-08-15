import React from "react";
import { useState, } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Login(props) {
    const history = useHistory();
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });

    const loginFn = async (event) => {
        event.preventDefault();
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginForm)
        };
        let response = await fetch(
            "/login",
            options
        );
        let results = await response.json();
        if (response.ok) {
            props.setLogged(true);
            history.push("/PanelUser");
        } else {
            props.setLogged(false);
        }
    };


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
                    <form onInput={(event) =>
                        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
                    }
                        onSubmit={loginFn}>
                        <h1>Inicio de secion</h1>
                        <div className="row">
                            <input
                                type="email"
                                name="email"
                                placeholder="mail de registro"
                                value={loginForm.email}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="contraseña"
                                value={loginForm.password}
                            />
                            <br></br>
                            <button type="submit"> Entrar </button>
                        </div>
                    </form>

                    <p>aun no tienes cuenta?... <Link className="Link" to="/Register">registrate</Link></p>
                </div>
            </div>
        </div>
    );
}

// class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             login: {
//                 email: "",
//                 password: "",
//             }
//         };
//     }

//     // componentDidMount() {}

//     loginUser = event => {
//         event.preventDefault();
//         fetch("/login", {
//             method: "POST",
//             headers: { "content-type": "application/json; charset=UTF-8" },
//             body: JSON.stringify(this.state.login)
//         })
//             .then(response => {
//                 console.log(response)
//                 return response.json();
//             },
//                 this.clearLogin())
//             .then(myJson => {

//             })
//             .catch(error => console.log(error));
//     };

//     clearLogin = () => {
//         this.setState({
//             login: {
//                 email: "",
//                 password: "",
//             }
//         })
//     };

//     saveLogin = event => {
//         this.setState({
//             login: {
//                 ...this.state.login,
//                 [event.target.name]: event.target.value
//             }
//         });
//     };


//     render() {
//         return (
//             <div>
//                 <div className="container-form">
//                     <div className="imggradient" >
//                         <div className="text">
//                             la magia de ser quien eres.
//                             descubre nuevas formas de mejorar tu vida sin olvidarse de nada
//                                 </div>
//                     </div>
//                     <div className="row">
//                         <form onSubmit={this.loginUser}>
//                             <h1>Inicio de secion</h1>
//                             <div className="row">
//                                 <input
//                                     onChange={this.saveLogin}
//                                     type="email"
//                                     name="email"
//                                     placeholder="mail de registro"
//                                 />
//                                 <input
//                                     onChange={this.saveLogin}
//                                     type="password"
//                                     name="password"
//                                     placeholder="contraseña"
//                                 />
//                                 <br></br>
//                                 <button type="submit"> Entrar </button>
//                             </div>
//                         </form>

//                         <p>aun no tienes cuenta?... <Link className="Link" to="/Register">registrate</Link></p>
//                     </div>
//                 </div>
//             </div>
//         );
//     };
// }

// export default Login;
