import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {RecoilRoot} from "recoil";
import{ThemeProvider} from "styled-components";
import {createGlobalStyle} from "styled-components";
import {theme} from "./theme";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
`


ReactDOM.render(
  <React.StrictMode>
      <RecoilRoot>
          <ThemeProvider theme={theme}>
              <GlobalStyle/>
              <App />
          </ThemeProvider>
      </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);