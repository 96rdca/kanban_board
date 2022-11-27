/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import './App.css';
import Column from './components/Column';
import { ColumnType } from './utils/enums';
import React from 'react';

const mainCSS = {
  header: css({
    //  padding: '1 rem'
  }),
  divColumns: css({
    columns: 3,
    padding: '1rem',
  })
}

function App() {
  return (
    <div className="App">
      <header css={mainCSS.header}>
        <h1>Kanan Board</h1>
      </header>
      <div css={mainCSS.divColumns}>
        <Column column={ColumnType.TODO}></Column>
        <Column column={ColumnType.IN_PROGRESS}></Column>
        <Column column={ColumnType.COMPLETED}></Column>
      </div>
    </div>
  );
}

export default App;
