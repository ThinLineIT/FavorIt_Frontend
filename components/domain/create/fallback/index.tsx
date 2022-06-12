import styled from '@emotion/styled';
import React from 'react';

const GenerateFallback = () => {
  return (
    <Div>
      <h1>Loading...</h1>
    </Div>
  );
};

export default GenerateFallback;

const Div = styled.div`
  width: 100%;
  height: 100%;
  background-color: hot-pink;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
  }
`;
