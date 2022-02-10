import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import 'antd/dist/antd.min.css';
import {Layout} from 'antd';
import {SiderBlock} from './components/sider-block';
import HeaderBlock from './components/header-block';
import DashboardContent from './components/dashboard-content';
import StatisticsContent from './components/statistics-content';

const GlobalStyles = createGlobalStyle`
  * {
    font-family: Roboto, sans-serif;
  }
`;

function MainPage() {
  return (
    <BrowserRouter>
      <GlobalStyles/>
      <Layout>
        <SiderBlock/>

        <Layout>
          <HeaderBlock/>

          <Routes>
            <Route exact path='/' element={<DashboardContent/>}/>

            <Route exact path='/Dashboard' element={<DashboardContent/>}/>

            <Route exact path='/Statistics' element={<StatisticsContent/>}/>
          </Routes>

        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

const container = document.getElementById("root");
ReactDOM.render(
  <MainPage/>,
  container
);
