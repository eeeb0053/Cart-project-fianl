import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie'
import axios from 'axios'

const MyResponsivePie = () => {
    const [ userData1, setUserData1 ] = useState([])
    const [ userData2, setUserData2 ] = useState([])
    const URL = 'http://localhost:8080/analyses/'
    useEffect(() =>{
        axios.get(URL+'gender', {headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+localStorage.getItem("token")}})
        .then(resp => {
            setUserData1(resp.data)
        })
        .catch(err => {
            alert(err)
        })
        axios.get(URL+'preferGenre', {headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer '+localStorage.getItem("token")}})
        .then(resp => {
            setUserData2(resp.data)
        })
        .catch(err => {
            alert(err)
        })
    }, [])
    const data1 = [
    {
        labels: 'female',
        id: 'female',
        value: userData1.female,
        color: 'hsl(27, 70%, 50%)'
    },
    {
        labels: 'male',
        id: 'male',
        value: userData1.male,
        color: 'hsl(143, 70%, 50%)'
    },
    ]
    const data2 = [
        {
            labels: 'media',
            id: 'media',
            value: userData2.media,
            color: 'hsl(27, 70%, 50%)'
        },
        {
            labels: 'craft',
            id: 'craft',
            value: userData2.craft,
            color: 'hsl(143, 70%, 50%)'
        },
        {
            labels: 'painting',
            id: 'painting',
            value: userData2.painting,
            color: 'hsl(143, 70%, 50%)'
        },
        {
            labels: 'installation',
            id: 'installation',
            value: userData2.installation,
            color: 'hsl(143, 70%, 50%)'
        },
        {
            labels: 'sculpture',
            id: 'sculpture',
            value: userData2.sculpture,
            color: 'hsl(143, 70%, 50%)'
        },
        ]
    return(<>
    <ResponsivePie
        data={data1}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        startAngle={-43}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', '0.2' ] ] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'female'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'male'
                },
                id: 'dots'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    <ResponsivePie
        data={data2}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        startAngle={-43}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', '0.2' ] ] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'media'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'installation'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'craft'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sculpture'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'painting'
                },
                id: 'dots'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    </>
)
}

export default MyResponsivePie;

