import React, { useContext, useState } from "react";
import JoblyApi from "./api";
import { Form, Label, Input, Card, CardBody, Alert } from "reactstrap";
import CurrUserContext from "./CurrUserContext";

const Profile = () => {
    const { currUser, setCurrUser } = useContext(CurrUserContext);
    const INITIAL_FORM_DATA = {
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        email: currUser.email,
        username: currUser.username,
        password: ""
    };
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [formErrors, setFormErrors] = useState([]);
    const [saveSuccess, setSaveSucess] = useState(false);

    async function handleSubmit(evt) {
        evt.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        }

        let updatedUser;
        let username = formData.username;

        try {
            updatedUser = await JoblyApi.saveProfile(username, profileData)
        } catch (errors) {
            setFormErrors(errors);
            return;
        }

        setFormData(data => ({ ...data, password: "" }));
        setFormErrors([]);
        setSaveSucess(true)

        setCurrUser(updatedUser)
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
        setFormErrors([]);
    }
    return (
        <div className="container">
            <h2 className="my-4">{formData.username}'s Profile</h2>
            <Card className="bg-dark text-light">
                <CardBody className="bg-dark text-light">
                    <Form
                        onSubmit={handleSubmit}
                        className="SignupForm">
                        {(formErrors.length) ?
                            formErrors.map(e => (<Alert color="danger">
                                {e}
                            </Alert>))
                            : null
                        }
                        {(saveSuccess) ?
                            <Alert color="success">
                                Saved Successfully
                            </Alert>
                            :
                            null
                        }

                        <Label htmlFor="firstName">First Name:</Label>
                        <Input
                            value={formData.firstName}
                            onChange={handleChange}
                            name="firstName"
                            placeholder="first name"
                        />
                        <Label htmlFor="lastName">Last Name:</Label>
                        <Input
                            value={formData.lastName}
                            onChange={handleChange}
                            name="lastName"
                            placeholder="last name"
                        />
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            type="email"
                            placeholder="email"
                        />
                        <Label htmlFor="password">Enter Password to Confirm Changes:</Label>
                        <Input
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            type="password"
                            placeholder="password"
                        />
                        <button className="btn btn-danger mt-3">Submit</button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Profile;