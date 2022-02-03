import React from 'react';
import './index.css';
import 'antd/dist/antd.min.css';
import cn from 'classnames';
import {StatisticsBlock} from "../../components/statistics-block";
import {Table} from "antd";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";


export function Statistics({statisticsBlock, dataTable, isShow, currency}) {
  const numberWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '25%'
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: '25%',
      render: (text, record) => (
        <>
          {numberWithSpaces(record.value)}
          {currency === 'USD' ? ' $' : ' €'}
        </>
      )
    },
    {
      title: 'Prev value',
      dataIndex: 'prevValue',
      key: 'prevValue',
      width: '25%',
      render: (text, record) => (
        <>
          {numberWithSpaces(record.prevValue)}
          {currency === 'USD' ? ' $' : ' €'}
        </>
      )
    },
    {
      title: '',
      key: 'changes',
      dataIndex: 'changes',
      render: (text, record) => {
        if (record.value >= record.prevValue) {
          return (
            <>
              <CaretUpOutlined
                style={{fontSize: '14px', color: '#52C41A', paddingRight: '5px'}}
              />
              <span style={{color: '#52C41A'}}>
                    {Math.abs((record.value - record.prevValue) / record.prevValue * 100).toFixed(1)}%
                  </span>
            </>
          );
        } else {
          return (
            <>
              <CaretDownOutlined
                style={{fontSize: '14px', color: '#F5222D', paddingRight: '5px'}}
              />
              <span style={{color: '#F5222D'}}>
                    {Math.abs((record.value - record.prevValue) / record.prevValue * 100).toFixed(1)}%
                  </span>
            </>
          );
        }
      }
    }
  ];

  const statisticsClass = () => cn({
    ['no-display']: !isShow
  });

  return (
    <div className={statisticsClass()}>
      <StatisticsBlock title={statisticsBlock.title}
                       currentValue={statisticsBlock.currentValue}
                       previousValue={statisticsBlock.previousValue}
      />

      <Table columns={columns} dataSource={dataTable} pagination={{defaultPageSize: 5}}/>
    </div>
  )
}
