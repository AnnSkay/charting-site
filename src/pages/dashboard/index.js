import React from 'react';
import './index.css';
import 'antd/dist/antd.min.css';
import cn from 'classnames';
import {StatisticsBlock} from "../../components/statistics-block";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export function Dashboard({statisticsBlocks, barChartOptions, lineChartOptions, isShow}) {
  Highcharts.setOptions({
    lang: {
      loading: 'Загрузка...',
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      shortMonths: ['янв', 'фев', 'марта', 'апр', 'май', 'июня', 'июля', 'авг', 'сент', 'окт', 'нояб', 'дек']
    }
  });

  const dashboardClass = () => cn({
    'no-display': !isShow
  });

  return (
    <div className={dashboardClass()}>
      <div className="flex-block">
        <div className="statistics-blocks">
          {statisticsBlocks &&
          statisticsBlocks.map((block) => {
            return (
              <StatisticsBlock title={block.title}
                               currentValue={block.currentValue}
                               previousValue={block.previousValue}
              />
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

