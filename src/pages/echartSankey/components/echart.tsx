import React, { useEffect, useRef, memo } from 'react'
import ReactECharts from 'echarts-for-react';
import type EChartsInstance from 'echarts-for-react';
import ReactDOM from 'react-dom'
import { isEqual } from 'lodash';

const series = {
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
            const labelStyleArr = [`{percentStyle|${percent}}%\n`,
            `{contentStyle|${title}}`, `\n{contentStyle|${number}}`]

            return labelStyleArr.join('\n')
        },

        rich: {
            percentStyle: {
                color: 'black',
                fontWeight: 'bold',
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
    animation: true,
    links: [
        {
            source: 'fleetClickTotal',
            target: 'fleetOtherThing',
            value: 50,
            lineStyle: {
                opacity: 0,
                color: 'white'
            },
        },
        {
            source: 'fleetLayoverOpened',
            target: 'fleetLayoverClosed',
            value: 50
        },
        {
            source: 'fleetClickTotal',
            target: 'fleetLayoverOpened',
            value: 100
        },
        {
            source: 'fleetLayoverOpened',
            target: 'fleetGoToPage',
            value: 50
        }
    ]
}


interface EchartSankeyProps {
    data: Record<string, any>[]
}

const EchartSankey: React.FC<EchartSankeyProps> = ({ data = [] }) => {
    const echartRef = useRef<EChartsInstance>();

    const newSeries = {
        ...series, data: [...data, ...[{
            name: 'fleetOtherThing',
            percent: '',
            title: '',
            label: {
                formatter: ''
            },
            itemStyle: {
                opacity: 0,
            },

        }]]
    }


    const onChartReady = (echarts: EChartsInstance) => {
        echartRef.current = echarts
    }

    useEffect(() => {
        echartRef.current?.clear()// 清除画布
        ReactDOM.render(
            <ReactECharts
                option={{ series: newSeries }}
                onChartReady={onChartReady}
            />, document.getElementById('eachartSankey'))
    }, [newSeries])

    return <div id='eachartSankey'></div>
}




export default memo(EchartSankey, (preProps, nextProps) => {
    if (isEqual(preProps, nextProps)) {
        return true; // 返回true表示不用渲染
    }
    return false;
});
