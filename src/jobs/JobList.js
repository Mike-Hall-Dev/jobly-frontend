import React from "react";
import JoblyApi from "../api";
import { useEffect, useState } from "react";
import { Form, Input, Button, FormGroup } from "reactstrap";

import JobCardList from "./JobCardList";

const JobList = () => {
    const [jobs, setJobs] = useState(null)
    const [search, setSearch] = useState("");

    async function getJobs() {
        const j = await JoblyApi.getAllJobs()
        setJobs(j)
    }

    useEffect(() => {
        getJobs();
    }, []);

    const onChange = (e) => {
        const { value } = e.target;
        setSearch(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (search.length > 0) {
            const j = await JoblyApi.getAllJobs({ title: search });
            setJobs(j)
        } else {
            getJobs()
        }
    }

    if (!jobs) return <p>Loading...</p>;

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
            {jobs.length
                ? (
                    <JobCardList jobs={jobs} />
                ) : (<p>No Results Found.</p>)
            }

        </div >
    )

}

export default JobList;