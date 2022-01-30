import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.min.css';
import {DatePicker} from 'antd';
import {Layout, Select, Avatar, Badge} from 'antd';
import {Option} from "antd/es/mentions";
import {UserOutlined, CaretDownOutlined, DashboardOutlined, TableOutlined} from '@ant-design/icons';
import {Dashboard} from './pages/dashboard';
import {PageTitle} from "./components/page-title";

const {Header, Sider, Content} = Layout;
const {RangePicker} = DatePicker;

function MainPage() {
  let statisticsBlocks = [
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
  ];

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

  countriesBarChart.sort((prev, next) => next.value - prev.value);

  const [currency, setCurrency] = useState('USD');

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
      min: Date.UTC(2013, 4, 22, 12, 0),
      max: Date.UTC(2013, 4, 22, 22, 0),
      labels: {
        format: '{value:%d-%m-%Y %H:%M}',
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
      data: [
        [Date.UTC(2013, 4, 22, 12, 0), 934],
        [Date.UTC(2013, 4, 22, 12, 34), 503],
        [Date.UTC(2013, 4, 22, 12, 40), 150],
        [Date.UTC(2013, 4, 22, 13, 0), 177],
        [Date.UTC(2013, 4, 22, 13, 30), 658],
        [Date.UTC(2013, 4, 22, 15, 30), 31],
        [Date.UTC(2013, 4, 22, 18, 50), 931],
        [Date.UTC(2013, 4, 22, 20, 34), 133],
        [Date.UTC(2013, 4, 22, 22, 0), 175]
      ]
    }, {
      name: 'line B',
      color: '#42C86A',
      marker: {
        enabled: false
      },
      data: [
        [Date.UTC(2013, 4, 22, 12, 0), 916],
        [Date.UTC(2013, 4, 22, 12, 40), 64],
        [Date.UTC(2013, 4, 22, 13, 0), 742],
        [Date.UTC(2013, 4, 22, 13, 10), 851],
        [Date.UTC(2013, 4, 22, 14, 40), 490],
        [Date.UTC(2013, 4, 22, 15, 0), 742],
        [Date.UTC(2013, 4, 22, 16, 30), 282],
        [Date.UTC(2013, 4, 22, 18, 23), 121],
        [Date.UTC(2013, 4, 22, 22, 0), 434]
      ]
    }, {
      name: 'line C',
      color: '#1890FF',
      marker: {
        enabled: false
      },
      data: [
        [Date.UTC(2013, 4, 22, 12, 0), 744],
        [Date.UTC(2013, 4, 22, 12, 40), 722],
        [Date.UTC(2013, 4, 22, 14, 0), 405],
        [Date.UTC(2013, 4, 22, 15, 10), 771],
        [Date.UTC(2013, 4, 22, 16, 40), 185],
        [Date.UTC(2013, 4, 22, 17, 30), 377],
        [Date.UTC(2013, 4, 22, 18, 0), 742],
        [Date.UTC(2013, 4, 22, 20, 23), 147],
        [Date.UTC(2013, 4, 22, 23, 0), 387]
      ]
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
    for (let i = 0; i < countriesBarChart.length; i++) {
      countriesBarChart[i].value = Math.round(Math.random() * 20000);
    }
    countriesBarChart.sort((prev, next) => next.value - prev.value);
    setBarChartOptions({
      series: {data: countriesBarChart.map(country => country.value)},
      xAxis: {categories: countriesBarChart.map(country => country.name)}
    });

    console.log(date[0]._d.getDate());
  }

  return (
    <Layout>
      <Sider>
        <div className="logo">
          .Logo
        </div>

        <div className="menu-item">
          <DashboardOutlined style={{marginRight: 10}}/>
          Dashboard
        </div>

        <div className="menu-item">
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
          <PageTitle title='Good morning!'/>

          <RangePicker
            style={{width: 241, height: 40, marginBottom: '16px', borderRadius: '8px'}}
            onChange={selectDate}
            showTime
          />

          <Dashboard
            statisticsBlocks={statisticsBlocks}
            barChartOptions={barChartOptions}
            lineChartOptions={lineChartOptions}
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
