import React from 'react';
import locationImg from '../../../assets/location-merchant.png'
const Merchant = () => {
    return (
        <div data-aos="zoom-in-up" className="my-5 bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] mx-3 lg:mx-0 lg:p-20 md:p-10 rounded-xl">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={locationImg}
                    className="max-w-full md:max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div className=''>
                        <button className="btn bg-[#CAEB66] rounded-full text-black hover:bg-[#03373D] hover:text-white border-none">Become a Merchant</button>
                        <button className="btn  border border-[#CAEB66] md:ml-3 mt-3 md:mt-0 rounded-full text-[#CAEB66] bg-[#03373D] hover:bg-[#CAEB66] hover:text-white">Earn with Profast Courier</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Merchant;