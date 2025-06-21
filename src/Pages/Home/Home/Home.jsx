import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import CompanyMarquee from '../CompanyMarquee/CompanyMarquee';
import BenefitsSection from '../Benefits/BenefitsSection';
import Merchant from '../Merchant/Merchant';

const Home = () => {
    return (
        <>
            <div className='my-5'>
                <Banner></Banner>
            </div>
            <Services></Services>
            <CompanyMarquee></CompanyMarquee>
            <BenefitsSection></BenefitsSection>
            <Merchant></Merchant>
        </>
    );
};

export default Home;