import React from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.min.css';
import {Layout} from 'antd';

const {Content} = Layout;

const ContentBlock = styled(Content)`
  min-height: 100vh;
  background: #F9F9FF !important;
  padding: 40px 24px;
`;

export function ContentWrapper(props) {
  return (
    <ContentBlock {...props} />
  );
}
