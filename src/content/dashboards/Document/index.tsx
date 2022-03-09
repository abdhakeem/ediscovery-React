import React from 'react'
import { useParams } from "react-router-dom";

export default function DocumentComponent() {
    let params = useParams();
    return (
        <h1>{ params.docid }</h1>
    )
}