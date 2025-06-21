import React from 'react';
import liveTrackingImg from '../../../assets/live-tracking.png';
import safeDeliveryImg from '../../../assets/safe-delivery.png';

const benefits = [
    {
        id: 1,
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: liveTrackingImg,
    },
    {
        id: 2,
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: safeDeliveryImg,
    },
    {
        id: 3,
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: safeDeliveryImg,
    },
];

const BenefitsSection = () => {
    return (
        <section className="py-16">

            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900">
                    Why Choose Us
                </h2>
                {/* Top section dashed divider */}
                <div className="border-t border-dashed border-gray-300 mb-10"></div>

                <div className="space-y-12">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.id}
                            className='flex flex-col lg:flex-row items-center gap-6 p-6 bg-white rounded-xl shadow-md'
                        >
                            {/* Image with vertical dashed line */}
                            <div className="w-full lg:w-1/3 flex justify-center relative">
                                <img
                                    src={benefit.image}
                                    alt={benefit.title}
                                    className="h-40 w-auto object-contain z-10"
                                />
                                {/* Vertical dashed line */}
                                <div className="hidden lg:block absolute top-0 right-[-10px] h-full border-r border-dashed border-gray-300"></div>
                            </div>

                            {/* Text */}
                            <div className="w-full lg:w-2/3">
                                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom section dashed divider */}
            <div className="border-t border-dashed border-gray-300 mt-16"></div>
        </section>
    );
};

export default BenefitsSection;
