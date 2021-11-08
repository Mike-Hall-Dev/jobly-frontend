import React from "react";
import JobCard from "./JobCard";
import { ListGroup, ListGroupItem } from "reactstrap";


const JobCardList = ({ jobs }) => {
    return (
        <div>
            <ListGroup className="bg-dark">
                {jobs.map(job => (
                    <ListGroupItem className="bg-dark">
                        {
                            <JobCard job={job} />
                        }
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>

    )

}

export default JobCardList;