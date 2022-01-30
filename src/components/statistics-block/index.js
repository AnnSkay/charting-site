import React from 'react';
import './index.css';
import 'antd/dist/antd.min.css';
import {CaretDownOutlined, CaretUpOutlined, InfoCircleOutlined} from "@ant-design/icons";

export function StatisticsBlock({title, currentValue, previousValue}) {
  const changeValue = (currentValue - previousValue) / previousValue * 100;

  const numberWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const valueDifference = (previous, current) => {
    return Math.abs((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="statistics-block">
      <div className="statistics-block__header">
        {title}
        <InfoCircleOutlined/>
      </div>

      <div className="statistics-block__content">
        <div className="statistics-block__current-value">
          {numberWithSpaces(currentValue)}
        </div>

        {
          changeValue >= 0 ?
            <CaretUpOutlined
              style={{fontSize: '12px', color: '#52C41A', paddingLeft: '10px', paddingRight: '5px'}}
            /> :
            <CaretDownOutlined
              style={{fontSize: '12px', color: '#F5222D', paddingLeft: '10px', paddingRight: '5px'}}
            />
        }

        <div
          className="statistics-block__value-change"
          style={{color: changeValue >= 0 ? '#52C41A' : '#F5222D'}}
        >
          {valueDifference(previousValue, currentValue)}%
        </div>
      </div>

      <div className="statistics-block__previous-value">
        {numberWithSpaces(previousValue)}
      </div>
    </div>
  )
}
