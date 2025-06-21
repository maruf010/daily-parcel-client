// pages/Home/ServicesSection.jsx
import React from 'react';
import {
    FaMapMarkedAlt,
    FaWarehouse,
    FaMoneyBillWave,
    FaHandshake,
    FaUndo
} from 'react-icons/fa';
import { FaTruckFast } from "react-icons/fa6";
import ServiceCard from './ServiceCard';


const services = [
    {
        title: "Express & Standard Delivery",
        description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        icon: FaTruckFast
    },
    {
        title: "Nationwide Delivery",
        description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        icon: FaMapMarkedAlt
    },
    {
        title: "Fulfillment Solution",
        description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        icon: FaWarehouse
    },
    {
        title: "Cash on Home Delivery",
        description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        icon: FaMoneyBillWave
    },
    {
        title: "Corporate Service / Contract In Logistics",
        description: "Customized corporate services which includes warehouse and inventory management support.",
        icon: FaHandshake
    },
    {
        title: "Parcel Return",
        description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        icon: FaUndo
    }
];

const Services = () => {
    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl text-primary font-bold mb-4">Our Services</h2>
                <p className="text-gray-600 max-w-3xl mx-auto mb-12">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, idx) => (
                        <ServiceCard key={idx} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
