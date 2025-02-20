import React from 'react';
import deliveryImage from '../assets/fast-delivery_5637217.png';
import serviceImage from '../assets/24-hours_3293329.png';
import guaranteeImage from '../assets/shield_5254204.png';

const Services = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 px-8 lg:px-10 my-16'>
            <div className='flex flex-col items-center text-center shadow-xl px-2 py-4 border rounded-md'>
                <img className='h-[60px] w-[60px]' src={deliveryImage} alt="" />
                <h2 className='text-2xl md:text-xl font-bold uppercase mt-3'>Free and Fast Delivery</h2>
                <p>Free delivery for all orders over $150.</p>
            </div>

            <div className='flex flex-col items-center text-center shadow-xl px-2 py-4 border rounded-md'>
                <img className='h-[60px] w-[60px]' src={serviceImage} alt="" />
                <h2 className='text-2xl md:text-xl font-bold uppercase mt-3'>24/7 Customer Service</h2>
                <p>Friendly 24/7 customer support.</p>
            </div>

            <div className='flex flex-col items-center text-center shadow-xl px-2 py-4 border rounded-md'>
                <img className='h-[60px] w-[60px]' src={guaranteeImage} alt="" />
                <h2 className='text-2xl md:text-xl font-bold uppercase mt-3'>Money Back Guarantee</h2>
                <p>We return money within 30 days.</p>
            </div>
            
        </div>
    );
};

export default Services;