import React, { useEffect, useState } from 'react'
import Echart from './components/echart';
import { Button } from 'antd';

const appData = [
    {
        name: 'fleetClickTotal',
        percent: 100,
        title: 'Target fleets：',
        number: 500000000,
    },
    {
        name: 'fleetLayoverClosed',
        percent: 47.2,
        title: 'Layover closed：',
        number: 236,
        itemStyle: {
            color: 'grey',
        },
    },
    {
        name: 'fleetLayoverOpened',
        percent: 72.6,
        title: 'Layover opened：',
        number: 500
    },
    {
        name: 'fleetGoToPage',
        percent: 52.8,
        title: 'Go to Landing Page：',
        number: 264
    },
]

const pcData = [
    {
        name: 'fleetClickTotal',
        percent: 100,
        title: 'Target fleets：',
        number: 1000000,
    },
    {
        name: 'fleetLayoverClosed',
        percent: 50,
        title: 'Layover closed：',
        number: 100,
        itemStyle: {
            color: 'grey',
        },
    },
    {
        name: 'fleetLayoverOpened',
        percent: 80,
        title: 'Layover opened：',
        number: 50000
    },
    {
        name: 'fleetGoToPage',
        percent: 50,
        title: 'Go to Landing Page：',
        number: 30000
    },
]

const EchartSankey = () => {
    const [echartData, setEchartData] = useState([]);

    useEffect(() => {
        setEchartData(appData)
    }, [])

    return <>
        <Button onClick={() => setEchartData(pcData)}>pc</Button>
        <Button onClick={() => setEchartData(appData)}>app</Button>
        <Echart data={echartData} />
    </>
}

export default EchartSankey