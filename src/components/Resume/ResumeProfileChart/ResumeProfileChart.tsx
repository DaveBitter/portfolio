// Libs
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Utils
// @ts-ignore
import RadarChart from '../../../static/js/utils/vendor/radarChart.js';
import Observer from '../../../static/js/utils/Observer';
import ResizeTracker from '../../../static/js/utils/ResizeTracker';
import { getDictionary } from '../../../static/js/utils/getContent';

// Resources

// Components

// Interface
interface IProps {
}

// Component
const ResumeProfileChart = ({ ...attributes }: IProps) => {
    const dictionary = getDictionary();

    const containerRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const renderChart = () => {
            if (!containerRef.current) { return; }

            const margin = { top: 100, right: 100, bottom: 100, left: 100 };
            const width = Math.min(700, containerRef.current.offsetWidth) - margin.left - margin.right

            RadarChart(
                '#resume-profile-chart',
                [{
                    name: 'Profile',
                    axes: [
                        { axis: dictionary.frontEndEngineer, value: 100 },
                        { axis: dictionary.frontEndDesign, value: 95 },
                        { axis: dictionary.accessibility, value: 65 },
                        { axis: dictionary.performance, value: 75 },
                        { axis: dictionary.uXDesign, value: 80 },
                        { axis: dictionary.devOps, value: 40 },
                        { axis: dictionary.backEndJSEngineer, value: 60 },
                    ]
                }],
                {
                    w: width,
                    h: width,
                    margin: margin,
                    levels: 5,
                    roundStrokes: true,
                    color: d3.scaleOrdinal().range(['#ff1343']),
                    format: '.0f'
                }
            )
        };

        renderChart();

        Observer.subscribe(ResizeTracker, 'resizeUpdate', renderChart);

        return () => Observer.unsubscribe(ResizeTracker, 'resizeUpdate', renderChart)
    }, []);
    return <div id='resume-profile-chart' className='resume-profile-chart' ref={containerRef} data-reveal-in-view  {...attributes} />;
};

// Props
ResumeProfileChart.defaultProps = {};

export default ResumeProfileChart;
