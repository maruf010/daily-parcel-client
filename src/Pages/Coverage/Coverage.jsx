// src/pages/Coverage.jsx

import React from "react";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
    const serviceCenters = useLoaderData();
    console.log(serviceCenters);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl text-primary font-bold text-center mb-6">
                We are available in 64 districts
            </h1>

            {/* Search input will go here */}
            
            <BangladeshMap serviceCenters={serviceCenters}></BangladeshMap>
        </div>
    );
};

export default Coverage;
