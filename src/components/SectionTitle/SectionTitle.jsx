import React from 'react';

const SectionTitle = ({title}) => {
    return (
        <div className='py-10'>
            <h2 className="text-xl text-left lg:text-4xl font-semibold text-orange-400 ">{title} <span className="text-black mt-1">Item </span></h2>
        </div>
    );
};

export default SectionTitle;