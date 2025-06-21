// pages/Home/ClientLogos.jsx
import React from 'react';
import Marquee from 'react-fast-marquee';
import logo1 from '../../../assets/brands/amazon.png';
import logo2 from '../../../assets/brands/amazon_vector.png';
import logo3 from '../../../assets/brands/casio.png';
import logo4 from '../../../assets/brands/moonstar.png';
import logo5 from '../../../assets/brands/randstad.png';
import logo6 from '../../../assets/brands/start-people 1.png';
import logo7 from '../../../assets/brands/start.png';

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const CompanyMarquee = () => {
    return (
        <section className="py-10 ">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-2xl text-primary font-bold mb-12">We've helped thousands of sales teams</h2>
                <Marquee
                    gradient={false}
                    speed={50}
                    pauseOnHover={true}
                    className="flex gap-10"
                >
                    {logos.map((logo, index) => (
                        <div key={index} className="mx-12">
                            <img
                                src={logo}
                                alt={`Client logo ${index + 1}`}
                                className="h-6 w-auto object-contain"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default CompanyMarquee;
