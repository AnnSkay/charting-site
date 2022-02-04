import React from 'react';
import './index.css';
import cn from 'classnames';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {StatisticsBlock} from "../../components/statistics-block";

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
    'dashboard_hidden': !isShow
  });

  return (
    <div className={dashboardClass()}>
      <div className="dashboard__top-part">
        <div className="dashboard__statistics-blocks">
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
          containerProps={{className: 'dashboard__bar-chart'}}
          options={barChartOptions}
        />
      </div>

      <HighchartsReact
        highcharts={Highcharts}
        containerProps={{className: 'dashboard__line-chart'}}
        options={lineChartOptions}
      />
    </div>
  )
}

