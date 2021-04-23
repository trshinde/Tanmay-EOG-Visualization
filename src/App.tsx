import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import Checkbox from './components/Checkbox';
import MultiChart from './components/MultiChart';
import Subscription from './Features/Subscription/subscription';
import MultipleMetrics from './Features/MultipleMetrics/multipleMetrics';

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(40,64,37)',
    },
    secondary: {
      main: 'rgb(200,222,205)',
    },
    background: {
      default: 'rgb(231,229,228)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <MultipleMetrics />
        <Subscription />
        <Header />
        <Checkbox />
        <MultiChart />
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
