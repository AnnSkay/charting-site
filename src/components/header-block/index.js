import React, {useState} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import 'antd/dist/antd.min.css';
import {Layout, Select, Avatar, Badge} from 'antd';
import {UserOutlined, CaretDownOutlined} from '@ant-design/icons';
import currencyStore from '../../mobx/currencyStore.js';

const {Header} = Layout;
const {Option} = Select;

const HeaderWrapper = styled(Header)`
  background: #EFEFFF !important;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 19px 27px !important;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  margin-right: 11px;
`;

const GlobalStyleSelect = createGlobalStyle`
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 8px !important;
  }
`;

const AvatarBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const AvatarIcon = styled(Avatar)`
  background-color: white;
`;

const UserOutlinedIcon = styled(UserOutlined)`
  color: #605E5E;
`;

const CaretDownOutlinedIcon = styled(CaretDownOutlined)`
  color: #BDBDBD;
  padding-left: 5px;
`;

const HeaderBlock = () => {
  const [currency, setCurrency] = useState('USD');

  const changeCurrency = (value) => {
    setCurrency(value);

    currencyStore.change(value);
  };

  return (
    <HeaderWrapper>
      <div>
        <Label>
          Currency
        </Label>

        <GlobalStyleSelect/>
        <Select
          value={currency}
          onChange={changeCurrency}
        >
          <Option value="USD">USD</Option>
          <Option value="EUR">EUR</Option>
        </Select>
      </div>

      <AvatarBlock>
        <Badge offset={[-5, 5]} dot>
          <AvatarIcon size="large" icon={<UserOutlinedIcon/>}/>
        </Badge>

        <CaretDownOutlinedIcon/>
      </AvatarBlock>
    </HeaderWrapper>
  )
};

export default HeaderBlock;
