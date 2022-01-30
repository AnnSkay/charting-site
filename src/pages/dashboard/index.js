import React, {useState} from 'react';
import './index.css';
import 'antd/dist/antd.min.css';
import {StatisticsBlock} from "../../components/statistics-block";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export function Dashboard({statisticsBlocks, barChartOptions, lineChartOptions}) {
  return (
    <div>
      <div className="flex-block">
        <div className="statistics-blocks">
          {statisticsBlocks &&
          statisticsBlocks.map((block) => {
            return (
              <StatisticsBlock title={block.title}
                               currentValue={block.currentValue}
                               previousValue={block.previousValue}/>
            );
          })}
        </div>

        <HighchartsReact
          highcharts={Highcharts}
          containerProps={{className: 'bar-chart'}}
          options={barChartOptions}
        />
      </div>

      <HighchartsReact
        highcharts={Highcharts}
        containerProps={{className: 'line-chart'}}
        options={lineChartOptions}
      />
    </div>
  )
}

