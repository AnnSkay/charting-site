import React from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.min.css';
import {CaretDownOutlined, CaretUpOutlined, InfoCircleOutlined} from "@ant-design/icons";

const StatisticsBlockWrapper = styled.div`
  background: #FFFFFF;
  border: 0.5px solid #E1E1E1;
  border-radius: 8px;
  width: 241px;
  padding: 21px 24px 16px;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const StatisticsBlockHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const StatisticsBlockContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  border-bottom: 1px dashed #E1E1E1;
`;

const StatisticsBlockCurrentValue = styled.div`
  font-size: 30px;
  line-height: 38px;
  font-weight: bold;
`;

const StatisticsBlockPreviousValue = styled.div`
  color: #8C8C8C;
  margin-top: 5px;
  padding-left: 4px;
`;

const CaretUpOutlinedIcon = styled(CaretUpOutlined)`
  font-size: 12px;
  color: #52C41A;
  padding-left: 10px;
  padding-right: 5px;
`;

const CaretDownOutlinedIcon = styled(CaretDownOutlined)`
  font-size: 12px;
  color: #F5222D;
  padding-left: 10px;
  padding-right: 5px;
`;

export function StatisticsBlock({title, currentValue, previousValue}) {
  const StatisticsBlockValueChange = styled.div`
    font-size: 12px;
    color: ${currentValue >= previousValue ? '#52C41A' : '#F5222D'};
  `;

  const getNumberWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const getValueDifference = (previous, current) => {
    return Math.abs((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <StatisticsBlockWrapper>
      <StatisticsBlockHeader>
        {title}
        <InfoCircleOutlined/>
      </StatisticsBlockHeader>

      <StatisticsBlockContent>
        <StatisticsBlockCurrentValue>
          {getNumberWithSpaces(currentValue)}
        </StatisticsBlockCurrentValue>

        {
          currentValue >= previousValue ?
            <CaretUpOutlinedIcon/>
            :
            <CaretDownOutlinedIcon/>
        }

        <StatisticsBlockValueChange>
          {getValueDifference(previousValue, currentValue)}%
        </StatisticsBlockValueChange>
      </StatisticsBlockContent>

      <StatisticsBlockPreviousValue>
        {getNumberWithSpaces(previousValue)}
      </StatisticsBlockPreviousValue>
    </StatisticsBlockWrapper>
  )
}
