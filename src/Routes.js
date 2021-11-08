import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CompanyList from "./companies/CompanyList";
import Home from "./Home";
import JobList from "./jobs/JobList";
import Profile from "./Profile";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import CompanyDetails from "./companies/CompanyDetails"
import ProtectedRoute from "./ProtectedRoute"

const Routes = ({ signup, login }) => {

    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <ProtectedRoute exact path="/companies">
                    <CompanyList />
                </ProtectedRoute>
                <ProtectedRoute exact path="/companies/:handle">
                    <CompanyDetails />
                </ProtectedRoute>
                <ProtectedRoute exact path="/jobs">
                    <JobList />
                </ProtectedRoute>
                <Route exact path="/login">
                    <LogInForm login={login} />
                </Route>
                <Route exact path="/signup">
                    <SignUpForm signup={signup} />
                </Route>
                <ProtectedRoute exact path="/profile">
                    <Profile />
                </ProtectedRoute>
                <Redirect to="/" />
            </Switch>
        </div>

    )
}

export default Routes;