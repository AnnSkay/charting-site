import React, {useState} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import 'antd/dist/antd.min.css';
import {DatePicker} from 'antd';
import {Table} from "antd";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";
import {ContentWrapper} from '../content-wrapper';
import {PageTitle} from '../page-title';
import {StatisticsBlock} from "../../components/statistics-block";
import { observer } from 'mobx-react';
import currencyStore from '../../mobx/currencyStore.js';

const {RangePicker} = DatePicker;

const GlobalStyleTable = createGlobalStyle`
  .ant-table-thead > tr > th {
    background-color: #ECECFF;
    font-weight: bold;
    padding: 13px;
  }

  .ant-table-container table > thead > tr > td {
    padding: 13px;
  }

  .ant-table-container table > thead > tr:first-child th:first-child {
    border-top-left-radius: 8px;
  }

  .ant-table-container table > thead > tr:first-child th:last-child {
    border-top-right-radius: 8px;
  }

  .ant-table-container table > tbody > tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
  }

  .ant-table-container table > tbody > tr:last-child td:last-child {
    border-bottom-right-radius: 8px;
  }

  .ant-pagination-item {
    border-color: #E1E1FF;
  }

  .ant-pagination-item-link {
    border-color: #E1E1FF !important;
  }

  .ant-pagination-disabled .ant-pagination-item-link {
    color: #E1E1FF !important;
  }

  .ant-pagination-prev:not(.ant-pagination-disabled) .ant-pagination-item-link:hover,
  .ant-pagination-next:not(.ant-pagination-disabled) .ant-pagination-item-link:hover {
    border-color: #8F00FF !important;
    color: #8F00FF !important;
  }

  .ant-pagination-item:hover,
  .ant-pagination-item-active {
    border-color: #8F00FF;
  }

  .ant-pagination-item-active a,
  .ant-pagination-item a:hover {
    color: #8F00FF;
  }

  .ant-pagination-disabled .ant-pagination-item-link:hover {
    border-color: #d9d9d9 !important;
  }
`;

const RangePickerField = styled(RangePicker)`
  width: 241px;
  height: 40px;
  margin-bottom: 16px;
  border-radius: 8px;
`;

// генерация рандомных данных для блока статистики
function generateStatisticsBlockData() {
  const blockTitles = ['Water', 'Fire', 'Wind', 'Forest'];

  return {
    title: blockTitles[Math.round(Math.random() * 4)],
    previousValue: Math.round(Math.random() * 29500 + 500),
    currentValue: Math.round(Math.random() * 29500 + 500)
  };
}

// генерация рандомных данных для таблицы
function generateTableData() {
  const rowsNumber = 15;
  const tableData = [];

  for (let i = 0; i < rowsNumber; i++) {
    tableData.push({
      key: i + 1,
      name: `Row ${i + 1}`,
      value: Math.round(Math.random() * 49001 + 1000),
      prevValue: Math.round(Math.random() * 49001 + 1000)
    });
  }

  return tableData;
}

const StatisticsContent = observer(() => {
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
          {numberWithSpaces(record.value)} {currencyStore.currencySymbol}
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
          {numberWithSpaces(record.prevValue)} {currencyStore.currencySymbol}
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

  const [statisticsBlock, setStatisticsBlock] = useState(generateStatisticsBlockData());

  const [dataTable, setDataTable] = useState(generateTableData());

  //превращение числа в число с пробелами
  const numberWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  //изменение данных для всех виджетов страницы при выборе даты
  const changeDate = () => {
    //изменение данных для блока статистики
    setStatisticsBlock(generateStatisticsBlockData());

    //изменение данных для таблицы
    setDataTable(generateTableData());
  }

  return (
    <ContentWrapper>
      <PageTitle title={'Statistics'}/>

      <RangePickerField
        onChange={changeDate}
        showTime
      />

      <div>
        <StatisticsBlock
          title={statisticsBlock.title}
          currentValue={statisticsBlock.currentValue}
          previousValue={statisticsBlock.previousValue}
        />

        <GlobalStyleTable/>
        <Table
          columns={columns}
          dataSource={dataTable}
          pagination={{defaultPageSize: 5}}
        />
      </div>
    </ContentWrapper>
  )
});

export default StatisticsContent;
