import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCardList from "../jobs/JobCardList"

const CompanyDetails = () => {
    const { handle } = useParams();
    let INITIAL_STATE = {
        handle: "",
        name: "",
        description: "",
        numEmployees: 0,
        logoUrl: "",
        jobs: []
    }
    const [company, setCompany] = useState(INITIAL_STATE);
    useEffect(() => {
        async function getCompany() {
            const c = await JoblyApi.getCompany(handle)
            setCompany(c);
        }
        getCompany();
    }, [handle]);

    return (
        <div className="col-md-8 offset-md-2 bg-light my-4">
            <h3>{company.name}</h3>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs} />
        </div>
    )
}

export default CompanyDetails;