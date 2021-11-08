import React, { useState, useContext, useEffect } from "react"
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import CurrUserContext from "../CurrUserContext";

const Job = ({ job }) => {
    const { id, title, salary, equity, companyName } = job;

    const { hasAppliedToJob, applyToJob } = useContext(CurrUserContext)
    const [applied, setApplied] = useState();

    useEffect(function updateApplied() {
        setApplied(hasAppliedToJob(id))
    }, [id, hasAppliedToJob]);

    async function handleApply(evt) {
        if (hasAppliedToJob(id)) return;
        console.log("has appled? ", hasAppliedToJob(id))
        applyToJob(id);
        setApplied(true);
    }

    return (
        <section>
            <Card className="bg-dark text-light" id={id}>
                <CardBody>
                    <CardTitle className="font-weight-bold">
                        {title}
                    </CardTitle>
                    <CardText>{companyName}</CardText>
                    <p>
                        <b>Salary:</b> {(salary) ? `$${salary}` : "unknown"}
                    </p>
                    <p>
                        <b>Equity:</b> {(equity) ? equity : "None"}
                    </p>
                    <Button onClick={handleApply} disabled={applied}>
                        {applied ? "Applied" : "Apply"}
                    </Button>
                </CardBody>

            </Card>
        </section>
    )
}

export default Job;