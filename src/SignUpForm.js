import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import { Form, Label, Input, Alert } from "reactstrap";

const SignupForm = ({ signup }) => {
    console.log(signup)
    const INITIAL_DATA = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    };
    const [formData, setFormData] = useState(INITIAL_DATA);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    async function handleSubmit(evt) {
        evt.preventDefault();
        let res = await signup(formData);
        if (res.success) {
            history.push("/companies")
        } else {
            setErrors(res.errors)
        }
    }

    function onChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }))
    }

    return (
        <Form
            onSubmit={handleSubmit}
            className="SignupForm col-md-8 offset-md-2">
            {(errors.length) ?
                errors.map(e => (<Alert color="danger">
                    {e}
                </Alert>))
                : null
            }

            <Label htmlFor="username">Username:</Label>
            <Input
                value={formData.username}
                onChange={onChange}
                name="username"
                placeholder="username"
            />
            <Label htmlFor="password">Password:</Label>
            <Input
                value={formData.password}
                onChange={onChange}
                name="password"
                type="password"
                placeholder="password"
            />
            <Label htmlFor="firstName">First Name:</Label>
            <Input
                value={formData.firstName}
                onChange={onChange}
                name="firstName"
                placeholder="first name"
            />
            <Label htmlFor="lastName">Last Name:</Label>
            <Input
                value={formData.lastName}
                onChange={onChange}
                name="lastName"
                placeholder="last name"
            />
            <Label htmlFor="email">Email:</Label>
            <Input
                value={formData.email}
                onChange={onChange}
                name="email"
                type="email"
                placeholder="email"
            />
            <button className="btn btn-danger">Submit</button>
        </Form>
    )
}

export default SignupForm;
