import React, { useEffect, useState, useRef } from 'react'
import ReactECharts from 'echarts-for-react';

const option = {
    series: {
        type: 'sankey',
        layoutIterations: 0,//上对齐
        draggable: false,
        layout: 'none',
        emphasis: {
            // focus: 'adjacency'
        },
        nodeWidth: 135,
        nodeAlign: 'left',
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
            fontWeight: 'bolder',
            formatter: (val) => {
                const { data: { percent, title, number } } = val;
                const labelStyleArr = [`{percentStyle|${percent}}%`,
                `{contentStyle|${title}}`, `\n{contentStyle|${number}}`]

                return labelStyleArr.join('\n')
            },

            rich: {
                percentStyle: {
                    color: 'black',
                    fontWeight: 'bold',
                    lineHeight: 24,
                    fontSize: 18,
                    fontFamily: 'Microsoft YaHei',
                    borderColor: '#449933',
                    borderRadius: 4
                },
                contentStyle: {

                },
            }
        },
        lineStyle: {
            color: '#cccc',
            curveness: 0.8
        },

        data: [
            {
                name: 'a',
                percent: 100,
                title: 'Target fleets：',
                number: 500000000,
            },
            {
                name: 'a2',
                percent: 47.2,
                title: 'Layover closed：',
                number: 236,
                itemStyle: {
                    color: 'grey',
                },
            },
            {
                name: 'b1',
                percent: 72.6,
                title: 'Layover opened：',
                number: 500
            },
            {
                name: 'c',
                percent: 52.8,
                title: 'Go to Landing Page：',
                number: 264
            },
            {
                name: 'c2',
                percent: '',
                title: '',
                label: {
                    formatter: ''
                },
                itemStyle: {
                    opacity: 0,
                },

            }
        ],
        links: [
            {
                source: 'a',
                target: 'c2',
                value: 50,
                lineStyle: {
                    opacity: 0
                },
            },
            {
                source: 'b1',
                target: 'a2',
                value: 50
            },
            {
                source: 'a',
                target: 'b1',
                value: 100
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