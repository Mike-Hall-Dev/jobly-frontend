import React from "react";
import JoblyApi from "../api";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Form, Input, Button, FormGroup } from "reactstrap";

import CompanyCard from "./CompanyCard";

const List = ({ type }) => {
    const [companies, setCompanies] = useState(null)
    const [search, setSearch] = useState("")

    async function getItems() {
        const c = await JoblyApi.getAllCompanies()
        setCompanies(c)
    }

    useEffect(() => {
        getItems();
    }, []);

    const onChange = (e) => {
        const { value } = e.target;
        setSearch(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (search.length > 0) {
            const c = await JoblyApi.getAllCompanies({ name: search });
            setCompanies(c)
        } else {
            getItems()
        }
    }

    if (!companies) return <p>Loading...</p>;

    return (
        <div className="col-md-8 offset-md-2">
            <Form
                inline
                className="d-flex justify-content-center my-4"
                onSubmit={handleSubmit}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 me-2">
                    <Input
                        value={search}
                        onChange={onChange} />
                </FormGroup>
                <Button color="primary">Search</Button>
            </Form>
            {companies.length
                ? (
                    <ListGroup className="bg-dark">
                        {companies.map(company => (
                            <ListGroupItem className="bg-dark">
                                {
                                    <CompanyCard key={company.handle} company={company} />
                                }
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                ) : (<p>No Results Found.</p>)}

        </div>
    )
}

export default List;