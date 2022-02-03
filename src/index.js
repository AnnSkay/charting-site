import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.min.css';
import cn from 'classnames';
import {DatePicker} from 'antd';
import {Layout, Select, Avatar, Badge} from 'antd';
import {Option} from "antd/es/mentions";
import {UserOutlined, CaretDownOutlined, DashboardOutlined, TableOutlined} from '@ant-design/icons';
import {Dashboard} from './pages/dashboard';
import {Statistics} from "./pages/statistics";
import {PageTitle} from "./components/page-title";

const {Header, Sider, Content} = Layout;
const {RangePicker} = DatePicker;

function MainPage() {
  const [dashboardSelected, isDashboardSelected] = useState(true);
  const [statisticsSelected, isStatisticsSelected] = useState(false);

  const [pageTitle, setPageTitle] = useState('Good morning!');

  const [currency, setCurrency] = useState('USD');

  const generateTableData = () => {
    let dataTableRandom = [];
    for (let i = 0; i < 15; i++) {
      let currentValue = Math.round(Math.random() * 49001 + 1000);
      let previousValue = Math.round(Math.random() * 49001 + 1000);
      let dataRow = {};
      dataRow.key = i + 1;
      dataRow.name = `Row ${i + 1}`;
      dataRow.value = currentValue;
      dataRow.prevValue = previousValue;

      dataTableRandom.push(dataRow);
    }

    return dataTableRandom;
  }

  const [dataTable, setDataTable] = useState(generateTableData());

  const [statisticsBlocks, setStatisticsBlocks] = useState([
    {
      title: 'Water',
      currentValue: 20567,
      previousValue: 12056
    },
    {
      title: 'Fire',
      currentValue: 5567,
      previousValue: 13056
    },
    {
      title: 'Wind',
      currentValue: 1567,
      previousValue: 556
    },
    {
      title: 'Forest',
      currentValue: 567,
      previousValue: 544
    }
  ]);

  let countriesBarChart = [
    {
      name: 'USA',
      value: 3456
    },
    {
      name: 'Spain',
      value: 8657
    },
    {
      name: 'Italy',
      value: 2576
    },
    {
      name: 'Russia',
      value: 9000
    }
  ];

  let dataLineChart = [
    [
      [Date.UTC(2022, 2, 2, 12, 0), 934],
      [Date.UTC(2022, 2, 2, 12, 34), 503],
      [Date.UTC(2022, 2, 2, 12, 40), 150],
      [Date.UTC(2022, 2, 2, 13, 0), 177],
      [Date.UTC(2022, 2, 2, 13, 30), 658],
      [Date.UTC(2022, 2, 2, 15, 30), 31],
      [Date.UTC(2022, 2, 2, 18, 50), 931],
      [Date.UTC(2022, 2, 2, 20, 34), 133],
      [Date.UTC(2022, 2, 2, 22, 0), 175]
    ],
    [
      [Date.UTC(2022, 2, 2, 12, 0), 916],
      [Date.UTC(2022, 2, 2, 12, 40), 64],
      [Date.UTC(2022, 2, 2, 13, 0), 742],
      [Date.UTC(2022, 2, 2, 13, 10), 851],
      [Date.UTC(2022, 2, 2, 14, 40), 490],
      [Date.UTC(2022, 2, 2, 15, 0), 742],
      [Date.UTC(2022, 2, 2, 16, 30), 282],
      [Date.UTC(2022, 2, 2, 18, 23), 121],
      [Date.UTC(2022, 2, 2, 22, 0), 434]
    ],
    [
      [Date.UTC(2022, 2, 2, 12, 0), 912],
      [Date.UTC(2022, 2, 2, 12, 40), 642],
      [Date.UTC(2022, 2, 2, 13, 0), 74],
      [Date.UTC(2022, 2, 2, 13, 10), 451],
      [Date.UTC(2022, 2, 2, 14, 40), 410],
      [Date.UTC(2022, 2, 2, 15, 0), 732],
      [Date.UTC(2022, 2, 2, 16, 30), 22],
      [Date.UTC(2022, 2, 2, 18, 23), 421],
      [Date.UTC(2022, 2, 2, 24, 0), 634]
    ]
  ];

  countriesBarChart.sort((prev, next) => next.value - prev.value);

  const [barChartOptions, setBarChartOptions] = useState({
    chart: {
      type: 'bar'
    },

    colors: ['#2100EE', '#6900EE', '#EE0056', '#EE9D00'],

    title: {
      text: null
    },

    xAxis: {
      lineWidth: 0,
      categories: countriesBarChart.map(country => country.name),
      labels: {
        style: {
          color: '#8C8C8C',
          fontSize: '16px'
        }
      },
      title: {
        text: null
      }
    },

    yAxis: {
      lineWidth: 1,
      lineColor: '#BFBFBF',
      min: 0,
      gridLineWidth: 0,
      tickWidth: 1,
      tickLength: 4,
      title: {
        text: null,
        align: 'high'
      },
      labels: {
        style: {
          color: '#8C8C8C',
          fontSize: '12px'
        },
        formatter: function () {
          let label = this.axis.defaultLabelFormatter.call(this);

          if (label.substr(label.length - 1) === 'k') {
            label = label.slice(0, -1) * 1000;
            return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
      valueSuffix: (currency === 'USD') ? '$' : '€',
      shared: true
    },

    credits: {
      enabled: false
    },

    exporting: {
      enabled: false
    },

    series: [{
      name: ['Money', 'ffc'],
      colorByPoint: true,
      showInLegend: false,
      data: countriesBarChart.map(country => country.value)
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
      min: Date.UTC(2022, 2, 2, 12, 20, 0),
      max: Date.UTC(2022, 2, 2, 22, 20, 0),
      labels: {
        format: '{value:%H:%M}',
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
        '<svg viewBox="0 0 80 80" width="4" height="4">\n <circle style="fill: {series.color}" cx="2" cy="2" r="2"/>\n</svg>' +
        '<b> {series.name}: </b>' + '{point.y}<br/>',
      valueSuffix: '$',
      shared: true
    },

    series: [{
      name: 'line A',
      color: '#FF0000',
      marker: {
        enabled: false
      },
      data: dataLineChart[0]
    }, {
      name: 'line B',
      color: '#42C86A',
      marker: {
        enabled: false
      },
      data: dataLineChart[1]
    }, {
      name: 'line C',
      color: '#1890FF',
      marker: {
        enabled: false
      },
      data: dataLineChart[2]
    }],
  });

  const selectChangeCurrency = (value) => {
    setCurrency(value);
    setBarChartOptions({
      tooltip: {valueSuffix: value === 'USD' ? '$' : '€'}
    });
    setLineChartOptions({
      tooltip: {valueSuffix: value === 'USD' ? '$' : '€'}
    });
  };

  const selectDate = (date) => {
    //генерация данных для таблицы
    setDataTable(generateTableData());

    //генерация данных для блоков статистики
    setStatisticsBlocks([
      {
        title: 'Water',
        previousValue: statisticsBlocks[0].currentValue,
        currentValue: Math.round(Math.random() * 29500 + 500)
      },
      {
        title: 'Fire',
        previousValue: statisticsBlocks[1].currentValue,
        currentValue: Math.round(Math.random() * 29500 + 500)
      },
      {
        title: 'Wind',
        previousValue: statisticsBlocks[2].currentValue,
        currentValue: Math.round(Math.random() * 29500 + 500)
      },
      {
        title: 'Forest',
        previousValue: statisticsBlocks[3].currentValue,
        currentValue: Math.round(Math.random() * 29500 + 500)
      }
    ]);

    //генерация данных для bar chart
    for (let i = 0; i < countriesBarChart.length; i++) {
      countriesBarChart[i].value = Math.round(Math.random() * 20001);
    }
    countriesBarChart.sort((prev, next) => next.value - prev.value);
    setBarChartOptions({
      series: {
        data: countriesBarChart.map(country => country.value)
      },
      xAxis: {
        categories: countriesBarChart.map(country => country.name)
      }
    });

    let numberOfValues = Math.round(Math.random() * 61 + 20);
    let newDataLineChart = [];

    //генерация данных для line chart
    if (date[0]._d.getFullYear() === date[1]._d.getFullYear() &&
      date[0]._d.getMonth() === date[1]._d.getMonth() &&
      date[0]._d.getDate() === date[1]._d.getDate()) {

      //генерация данных для line chart для почасового интервала
      for (let i = 0; i < dataLineChart.length; i++) {
        let data = [
          [Date.UTC(
            date[0]._d.getFullYear(),
            date[0]._d.getMonth(),
            date[0]._d.getDate(),
            date[0]._d.getHours(),
            date[0]._d.getMinutes()
          ),
            Math.round(Math.random() * 2001)
          ]
        ];

        for (let j = 1; j < numberOfValues - 1; j++) {
          let point = [Date.UTC(
            date[0]._d.getFullYear(),
            date[0]._d.getMonth(),
            date[0]._d.getDate(),
            Math.round(Math.random() * (date[1]._d.getHours() + 1 - date[0]._d.getHours()) + date[0]._d.getHours()),
            Math.round(Math.random() * 61)
          ),
            Math.round(Math.random() * 2001)
          ];

          data.push(point);
        }

        data.push([Date.UTC(
          date[1]._d.getFullYear(),
          date[1]._d.getMonth(),
          date[1]._d.getDate(),
          date[1]._d.getHours(),
          date[1]._d.getMinutes()
        ),
          Math.round(Math.random() * 2001)
        ]);

        newDataLineChart.push(data);
      }

      setLineChartOptions({
        xAxis: {
          labels: {
            format: '{value:%H:%M}'
          },
          tickInterval: 3600 * 1000,
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
        series: [{
          data: newDataLineChart[0]
        }, {
          data: newDataLineChart[1]
        }, {
          data: newDataLineChart[2]
        }]
      });
    } else {

      //генерация данных для line chart для интервала в один день
      for (let i = 0; i < dataLineChart.length; i++) {
        let data = [
          [Date.UTC(
            date[0]._d.getFullYear(),
            date[0]._d.getMonth(),
            date[0]._d.getDate(),
            date[0]._d.getHours(),
            date[0]._d.getMinutes()
          ),
            Math.round(Math.random() * 2001)
          ]
        ];

        for (let j = 1; j < numberOfValues - 1; j++) {
          let point = [Date.UTC(
            Math.round(Math.random() * (date[1]._d.getFullYear() + 1 - date[0]._d.getFullYear()) + date[0]._d.getFullYear()),
            Math.round(Math.random() * (date[1]._d.getMonth() + 1 - date[0]._d.getMonth()) + date[0]._d.getMonth()),
            Math.round(Math.random() * (date[1]._d.getDate() + 1 - date[0]._d.getDate()) + date[0]._d.getDate()),
            Math.round(Math.random() * 24),
            Math.round(Math.random() * 61)
          ),
            Math.round(Math.random() * 2001)
          ];

          data.push(point);
        }

        data.push([Date.UTC(
          date[1]._d.getFullYear(),
          date[1]._d.getMonth(),
          date[1]._d.getDate(),
          date[1]._d.getHours(),
          date[1]._d.getMinutes()
        ),
          Math.round(Math.random() * 2001)
        ]);

        newDataLineChart.push(data);
      }

      setLineChartOptions({
        xAxis: {
          labels: {
            format: '{value:%e %b}'
          },
          tickInterval: 24 * 3600 * 1000,
          min: Date.UTC(date[0]._d.getFullYear(),
            date[0]._d.getMonth(),
            date[0]._d.getDate(),
            date[0]._d.getHours(),
            date[0]._d.getMinutes(),
            0),
          max: Date.UTC(date[1]._d.getFullYear(),
            date[1]._d.getMonth(),
            date[1]._d.getDate(),
            date[1]._d.getHours(),
            date[1]._d.getMinutes(),
            0)
        },
        series: [{
          data: newDataLineChart[0]
        }, {
          data: newDataLineChart[1]
        }, {
          data: newDataLineChart[2]
        }]
      });
    }

    //генерация данных для таблицы

  }

  const selectPage = (isDashboard, isStatistics) => {
    isDashboardSelected(isDashboard);
    isStatisticsSelected(isStatistics);

    isDashboard ? setPageTitle('Good morning!') : setPageTitle('Statistics');
  }

  const dashboardMenuClass = () => cn('menu-item', {
    ['menu-item_active']: dashboardSelected
  });

  const statisticsMenuClass = () => cn('menu-item', {
    ['menu-item_active']: statisticsSelected
  });

  return (
    <Layout>
      <Sider>
        <div className="logo">
          .Logo
        </div>

        <div className={dashboardMenuClass()} onClick={() => selectPage(true, false)}>
          <DashboardOutlined style={{marginRight: 10}}/>
          Dashboard
        </div>

        <div className={statisticsMenuClass()} onClick={() => selectPage(false, true)}>
          <TableOutlined style={{marginRight: 10}}/>
          Statistics
        </div>
      </Sider>

      <Layout>
        <Header>
          <div>
            <label className="label-currency">
              Currency
            </label>

            <Select
              value={currency}
              onChange={selectChangeCurrency}
              id={currency}
              style={{width: 73, borderRadius: '8px'}}
            >
              <Option value="USD">USD</Option>
              <Option value="EUR">EUR</Option>
            </Select>
          </div>

          <div className="avatar-block">
            <Badge dot offset={[-5, 5]}>
              <Avatar size="large" style={{backgroundColor: 'white'}}
                      icon={<UserOutlined style={{color: '#605E5E'}}/>}/>
            </Badge>

            <CaretDownOutlined style={{color: '#BDBDBD', paddingLeft: '5px'}}/>
          </div>
        </Header>
        <Content style={{padding: '40px 24px'}}>
          <PageTitle title={pageTitle}/>

          <RangePicker
            style={{width: 241, height: 40, marginBottom: '16px', borderRadius: '8px'}}
            onChange={selectDate}
            showTime
          />

          <Dashboard
            statisticsBlocks={statisticsBlocks}
            barChartOptions={barChartOptions}
            lineChartOptions={lineChartOptions}
            isShow={dashboardSelected}
          />

          <Statistics
            statisticsBlock={statisticsBlocks[0]}
            dataTable={dataTable}
            isShow={statisticsSelected}
            currency={currency}
          />
        </Content>
      </Layout>
    </Layout>
  )
}

const container = document.getElementById("root");
ReactDOM.render(
  <MainPage/>,
  container
);
