import React from 'react';

const SectionTitle = ({title, subTitle}) => {
    return (
        <div className='py-10'>
            <h2 className="text-xl text-left lg:text-4xl font-semibold text-[#FF8080] uppercase">{title} <span className="text-black mt-1">{ subTitle}</span></h2>
        </div>
    );
};

export default SectionTitle;