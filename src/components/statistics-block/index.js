import React from 'react';
import './index.css';
import 'antd/dist/antd.min.css';
import {CaretDownOutlined, CaretUpOutlined, InfoCircleOutlined} from "@ant-design/icons";

export function StatisticsBlock({title, currentValue, previousValue}) {
  const getNumberWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const getValueDifference = (previous, current) => {
    return Math.abs((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="statistics">
      <div className="statistics__header">
        {title}
        <InfoCircleOutlined/>
      </div>

      <div className="statistics__content">
        <div className="statistics__current-value">
          {getNumberWithSpaces(currentValue)}
        </div>

        {
          currentValue >= previousValue ?
            <CaretUpOutlined
              style={{fontSize: '12px', color: '#52C41A', paddingLeft: '10px', paddingRight: '5px'}}
            /> :
            <CaretDownOutlined
              style={{fontSize: '12px', color: '#F5222D', paddingLeft: '10px', paddingRight: '5px'}}
            />
        }

        <div
          className="statistics__value-change"
          style={{color: currentValue >= previousValue ? '#52C41A' : '#F5222D'}}
        >
          {getValueDifference(previousValue, currentValue)}%
        </div>
      </div>

      <div className="statistics__previous-value">
        {getNumberWithSpaces(previousValue)}
      </div>
    </div>
  )
}
