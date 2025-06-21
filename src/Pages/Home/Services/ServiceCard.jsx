// components/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ service }) => {
    const { icon: Icon, title, description } = service;
    return (
        <div className="bg-white hover:bg-[#DEF29F] shadow-sm rounded-2xl p-5 hover:shadow-xl transition duration-300">
            <div className="text-4xl text-primary mb-4 flex justify-center">
                <Icon />
            </div>
            <h3 className="text-xl text-primary  font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default ServiceCard;
