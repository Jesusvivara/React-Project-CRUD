import React from "react";
import { Route, Redirect } from "react-router-dom"
import Tasks from "./Tasks"

export default function PanelUser(props) {

    return (
        <Route {...props}>
            {props.isLogged ? (
                <Tasks />
            ) : (
                    <Redirect to="/login" />
                )}
        </Route>

    )
}