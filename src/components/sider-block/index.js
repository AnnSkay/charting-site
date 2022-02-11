import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import 'antd/dist/antd.min.css';
import {Layout} from 'antd';
import {DashboardOutlined, TableOutlined} from "@ant-design/icons";
import {Link, useLocation} from 'react-router-dom';

const {Sider} = Layout;

const SiderWrapper = styled(Sider)`
  background: #FFFFFF !important;
`;

const GlobalStylesLogo = createGlobalStyle`
  @font-face {
    font-family: 'Gropled';
    src: local('Gropled'), url('../../../fonts/gropled-bold.otf') format('otf');
  }
`;

const Logo = styled.div`
  font-family: 'Gropled';
  font-weight: bold;
  font-size: 24px;
  line-height: 5px;
  margin: 38px 0 55px 16px;
`;

const DashboardOutlinedIcon = styled(DashboardOutlined)`
  margin-right: 10px;
`;

const TableOutlinedIcon = styled(TableOutlined)`
  margin-right: 10px;
`;

const MenuLink = styled(Link)`
  height: 40px;
  padding-left: 16px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  color: #000;
  &:hover {
    color: #000;
    font-weight: bold;
  }
`;

const DashboardMenuLink = styled(MenuLink)`
  background: ${({to, url}) => to === url || url === `/` ? '#ECECFF' : '#FFFFFF'};
  border-right: ${({to, url}) => to === url || url === `/` ? '2px solid #8F00FF' : 'none'};
`;

const StatisticsMenuLink = styled(MenuLink)`
  background: ${({to, url}) => url === to ? '#ECECFF' : '#FFFFFF'};
  border-right: ${({to, url}) => url === to ? '2px solid #8F00FF' : 'none'};
`;

export function SiderBlock() {
  const url = useLocation().pathname;

  return (
    <SiderWrapper>
      <GlobalStylesLogo/>
      <Logo>
        .Logo
      </Logo>

      <DashboardMenuLink
        to="/Dashboard"
        url={url}
      >
        <DashboardOutlinedIcon/>
        Dashboard
      </DashboardMenuLink>

      <StatisticsMenuLink
        to="/Statistics"
        url={url}
      >
        <TableOutlinedIcon/>
        Statistics
      </StatisticsMenuLink>
    </SiderWrapper>
  )
}
