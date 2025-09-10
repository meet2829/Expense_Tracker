import { useState,useEffect } from "react";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";


const Colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a28ef5"];

const CategoryBarChart = ({ expenses }) => {
    // Group by category
    const data = expenses.reduce((acc, curr) => {
        const found = acc.find((item) => item.name === curr.category);
        if (found) {
            found.value += Number(curr.amount);
        } else {
            acc.push({ name: curr.category, value: Number(curr.amount) });
        }
        return acc;
    }, []);

    return (
        <div className="w-full h-[300px] mt-8">
            <h2 className="text-xl font-semibold text-center mb-4 text-foreground">
                Category-wise Expenses
            </h2>
           
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8">
                            {data.map((_, index) => (
                                <cell key={index} fill={Colors[index % Colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
        </div>
    );
};
export default CategoryBarChart;
