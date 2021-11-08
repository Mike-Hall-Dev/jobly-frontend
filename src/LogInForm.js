import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import { Form, Label, Input, Alert } from "reactstrap";

const LoginForm = ({ login }) => {
    console.log(login)
    const INITIAL_DATA = {
        username: "",
        password: "",
    };
    const [formData, setFormData] = useState(INITIAL_DATA);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    async function handleSubmit(evt) {
        evt.preventDefault();
        let res = await login(formData);
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
            className="LoginForm col-md-8 offset-md-2">
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
            <button className="btn btn-danger">Submit</button>
        </Form>
    )
}

export default LoginForm;