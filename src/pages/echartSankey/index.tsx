import React, { useEffect, useState, useRef } from 'react'
import ReactECharts from 'echarts-for-react';
import ReactDOM from 'react-dom';

const option = {
    series: {
        type: 'sankey',
        layoutIterations: 0,//上对齐
        draggable: false,
        layout: 'none',
        emphasis: {
            // focus: 'adjacency'
        },
        nodeWidth: 130,
        itemStyle: {
            color: '#FF8C00',
            borderWidth: 10,
            borderType: 'dashed',
            borderDashOffset: 5,
            borderCap: 'round',
            opacity: 1,
            borderRadius: 10,
        },
        label: {
            color: 'black',
            position: [10, 10],
            formatter: (val) => {
                const { data: { percent, title, number } } = val;
                return percent + '%' + '\n' + '\n' + title + '\n' + '\n' + number
            }
        },
        lineStyle: {
            color: '#cccc',
        },

        data: [
            {
                name: 'a',
                percent: 100,
                title: 'Target fleet：',
                number: 689
            },
            {
                name: 'a2',
                percent: 47.2,
                title: 'Layover close：',
                number: 236
            },
            {
                name: 'b1',
                percent: 72.6,
                title: 'Layover opend：',
                number: 500
            },
            {
                name: 'c',
                percent: 52.8,
                title: 'Go to Lading page：',
                number: 264
            },
            {
                name: 'c2',
                percent: '',
                title: ''
            }
        ],
        links: [
            {
                source: 'a',
                target: 'c2',
                value: 30
            },
            {
                source: 'b1',
                target: 'a2',
                value: 50
            },
            {
                source: 'a',
                target: 'b1',
                value: 72.6
            },
            {
                source: 'b1',
                target: 'c',
                value: 50
            }
        ]
    }
};



const EchartSankey = () => {


    return <ReactECharts option={option} />
}

export default EchartSankey