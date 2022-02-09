import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  padding-bottom: 28px;
`;

export function PageTitle({title}) {
  return (
    <Title>
      {title}
    </Title>
  )
}
