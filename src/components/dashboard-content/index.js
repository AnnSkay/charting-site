import React, {useState, useEffect} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import 'antd/dist/antd.min.css';
import {DatePicker} from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {ContentWrapper} from '../content-wrapper';
import {PageTitle} from '../page-title';
import {StatisticsBlock} from '../statistics-block';
import currencyStore from '../../mobx/currencyStore.js';
import { observer } from 'mobx-react';

const {RangePicker} = DatePicker;

Highcharts.setOptions({
  lang: {
    loading: 'Загрузка...',
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    shortMonths: ['янв', 'фев', 'марта', 'апр', 'май', 'июня', 'июля', 'авг', 'сент', 'окт', 'нояб', 'дек']
  }
});

const RangePickerField = styled(RangePicker)`
  width: 241px;
  height: 40px;
  margin-bottom: 16px;
  border-radius: 8px;
`;

const StatisticsAndBarChartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StatisticsBlocksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 522px;
`;

const GlobalStyleCharts = createGlobalStyle`
  .dashboard__bar-chart {
    background: #FFFFFF;
    border: 0.5px solid #E9E9FF;
    border-radius: 8px;
    //width: 45%;
    height: 304px;
    padding: 10px 20px;
  }

  .dashboard__line-chart {
    //width: 100%;
    height: 434px;
    background: #FFFFFF;
    border: 0.5px solid #E9E9FF;
    border-radius: 8px;
    padding: 24px 30px 50px 15px;
  }
`;

// генерация рандомных данных для блоков статистики
function generateStatisticsBlocksData() {
  const blocksTitle = ['Water', 'Fire', 'Wind', 'Forest'];
  const blocksData = [];

  for (let i = 0; i < blocksTitle.length; i++) {
    blocksData.push({
      title: blocksTitle[i],
      previousValue: Math.round(Math.random() * 29500 + 500),
      currentValue: Math.round(Math.random() * 29500 + 500)
    });
  }

  return blocksData;
}

// генерация рандомных данных для bar chart
function generateBarChartData() {
  const countriesName = ['USA', 'Spain', 'Italy', 'Russia'];
  const countriesColor = ['#EE0056', '#6900EE', '#EE9D00', '#2100EE'];
  const data = [];

  for (let i = 0; i < countriesName.length; i++) {
    data.push({
      name: countriesName[i],
      color: countriesColor[i],
      value: Math.round(Math.random() * 20001)
    });
  }

  data.sort((prev, next) => next.value - prev.value);

  return data;
}

// генерация рандомных данных для line chart
function generateLineChartData(startDate, endDate) {
  const seriesName = ['line A', 'line B', 'line C'];
  const seriesColor = ['#FF0000', '#42C86A', '#1890FF'];
  const numberOfPoints = Math.round(Math.random() * 61 + 20);
  const lineChartSeriesData = [];

  for (let i = 0; i < seriesName.length; i++) {
    let singleSeriesData = [
      [Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes()
      ),
        Math.round(Math.random() * 2001)
      ]
    ];

    for (let j = 1; j < numberOfPoints - 1; j++) {
      singleSeriesData.push([Date.UTC(
        Math.trunc(Math.random() * (endDate.getFullYear() + 1 - startDate.getFullYear()) + startDate.getFullYear()),
        Math.trunc(Math.random() * (endDate.getMonth() + 1 - startDate.getMonth()) + startDate.getMonth()),
        Math.trunc(Math.random() * (endDate.getDate() + 1 - startDate.getDate()) + startDate.getDate()),
        Math.trunc(Math.random() * (endDate.getHours() + 1 - startDate.getHours()) + startDate.getHours()),
        Math.trunc(Math.random() * 61)
      ),
        Math.round(Math.random() * 2001)
      ]);
    }

    singleSeriesData.push([Date.UTC(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      endDate.getHours(),
      endDate.getMinutes()
    ),
      Math.round(Math.random() * 2001)
    ]);

    lineChartSeriesData.push({
      name: seriesName[i],
      color: seriesColor[i],
      marker: {
        enabled: false
      },
      data: singleSeriesData
    });
  }


  return lineChartSeriesData;
}

const DashboardContent = observer(() => {
  const [statisticsBlocks, setStatisticsBlocks] = useState(generateStatisticsBlocksData());

  const [chartsData, setChartsData] = useState({
    barChart: generateBarChartData(),
    lineChart: generateLineChartData(
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),),
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 20)
    ).map(item => {
        item.data = item.data.sort((prev, next) => prev[0] - next[0]);
        return item;
      }
    )
  });

  const [barChartOptions, setBarChartOptions] = useState({
    chart: {
      type: 'bar'
    },

    colors: chartsData.barChart.map(data => data.color),

    title: {
      text: null
    },

    xAxis: {
      title: {
        text: null
      },
      lineWidth: 0,
      categories: chartsData.barChart.map(data => data.name),
      labels: {
        style: {
          color: '#8C8C8C',
          fontSize: '16px'
        }
      }
    },

    yAxis: {
      title: {
        text: null
      },
      lineWidth: 1,
      lineColor: '#BFBFBF',
      min: 0,
      gridLineWidth: 0,
      tickWidth: 1,
      tickLength: 4,
      labels: {
        style: {
          color: '#8C8C8C',
          fontSize: '12px'
        },
        formatter: function () {
          let label = this.axis.defaultLabelFormatter.call(this);

          if (label.substr(label.length - 1) === 'k') {
            label = label.slice(0, -1) * 1000;
            return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
          }

          return label;
        }
      },
      tickInterval: 5000
    },

    tooltip: {
      borderColor: '#ECECEC',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      shadow: false,
      headerFormat: '',
      pointFormat: '{point.y}<br/>',
      valueSuffix: currencyStore.currencySymbol,
      shared: true
    },

    credits: {
      enabled: false
    },

    exporting: {
      enabled: false
    },

    series: [{
      name: null,
      colorByPoint: true,
      showInLegend: false,
      data: chartsData.barChart.map(data => data.value)
    }]
  });

  const [lineChartOptions, setLineChartOptions] = useState({
    title: {
      text: null
    },

    yAxis: {
      lineWidth: 0,
      min: 0,
      gridLineWidth: 1,
      gridLineDashStyle: 'dash',
      title: {
        text: null
      }
    },

    xAxis: {
      type: 'datetime',
      tickInterval: 3600 * 1000,
      tickWidth: 1,
      tickLength: 4,
      min: Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      max: Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 20),
      labels: {
        format: '{value:%H:%M}'
      },
      crosshair: {
        color: '#BFBFBF',
        dashStyle: "Dash"
      }
    },

    legend: {
      align: 'center',
      verticalAlign: 'top',
      itemStyle: {
        fontSize: '14px'
      }
    },

    plotOptions: {
      series: {
        states: {
          inactive: {
            opacity: 1
          },
          hover: {
            enabled: false
          }
        },
        label: {
          connectorAllowed: false
        }
      }
    },

    credits: {
      enabled: false
    },

    exporting: {
      enabled: false
    },

    tooltip: {
      borderColor: '#ECECEC',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      shadow: false,
      headerFormat: '',
      useHTML: true,
      pointFormat:
        `<svg viewBox="0 0 80 80" width="4" height="4">
            <circle style="fill: {series.color}" cx="2" cy="2" r="2"/>
        </svg>
        <b> {series.name}: </b>{point.y}<br/>`,
      valueSuffix: currencyStore.currencySymbol,
      shared: true
    },

    series: chartsData.lineChart
  });

  //изменение данных для всех виджетов страницы при выборе даты
  const changeDate = (date) => {
    //изменение данных для блоков статистики
    setStatisticsBlocks(generateStatisticsBlocksData());

    //изменение данных для bar chart
    const randomBarChartData = generateBarChartData();

    setBarChartOptions({
      series: {
        data: randomBarChartData.map(data => data.value)
      },
      xAxis: {
        categories: randomBarChartData.map(data => data.name)
      }
    });

    //изменение данных для line chart
    let format, tickInterval;

    if (date[0]._d.getFullYear() === date[1]._d.getFullYear() &&
      date[0]._d.getMonth() === date[1]._d.getMonth() &&
      date[0]._d.getDate() === date[1]._d.getDate()) {
      format = '{value:%H:%M}';
      tickInterval = 3600 * 1000;
    } else {
      format = '{value:%e %b}';
      tickInterval = 24 * 3600 * 1000;
    }

    const randomLineChartData = generateLineChartData(date[0]._d, date[1]._d);

    setLineChartOptions({
      xAxis: {
        labels: {
          format: format
        },
        tickInterval: tickInterval,
        min: Date.UTC(date[0]._d.getFullYear(),
          date[0]._d.getMonth(),
          date[0]._d.getDate(),
          date[0]._d.getHours(),
          date[0]._d.getMinutes(), 0),
        max: Date.UTC(date[1]._d.getFullYear(),
          date[1]._d.getMonth(),
          date[1]._d.getDate(),
          date[1]._d.getHours(),
          date[1]._d.getMinutes(), 0)
      },
      series: randomLineChartData
    });

    setChartsData({
      ...chartsData,
      barChart: randomBarChartData,
      lineChart: randomLineChartData
    });
  }

  return (
    <ContentWrapper>
      <PageTitle title={'Good morning!'}/>

      <RangePickerField
        onChange={changeDate}
        showTime
      />

      {currencyStore.currency}

      <div>
        <StatisticsAndBarChartWrapper>
          <StatisticsBlocksWrapper>
            {statisticsBlocks &&
            statisticsBlocks.map((block, index) => {
              return (
                <StatisticsBlock title={block.title}
                                 currentValue={block.currentValue}
                                 previousValue={block.previousValue}
                                 key={(index + 1).toString()}
                />
              );
            })}
          </StatisticsBlocksWrapper>

          <GlobalStyleCharts/>
          <HighchartsReact
            highcharts={Highcharts}
            containerProps={{className: 'dashboard__bar-chart'}}
            options={barChartOptions}
          />
        </StatisticsAndBarChartWrapper>

        <HighchartsReact
          highcharts={Highcharts}
          containerProps={{className: 'dashboard__line-chart'}}
          options={lineChartOptions}
        />
      </div>
    </ContentWrapper>
  )
});

export default DashboardContent;
