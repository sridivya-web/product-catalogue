
import React from 'react';
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts';

const ProductCharts = ({data}) => {
    return (
        <>
       
        <BarChart width={600} height = {300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey='productname'/>
            <YAxis />
            <Legend/>
            <Bar dataKey='quantity' fill="#8884d8"/>
        </BarChart>
        </>
    )
}

export default ProductCharts;