import logo from './logo.svg';
import Button from "@mui/material/Button"
import Helmet from 'react-helmet';
import { CssBaseline } from '@mui/material';
import {Routes, Route, Router} from 'react-router-dom';
import { Login } from './components/Login'
import {history} from './helpers/history'
import { MainPage } from './components/MainPage';

function App() {
  return (
    // <div className="App">
      <Router location={history.location} navigator={history}>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Helmet>
      <CssBaseline/>
      
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<MainPage/>}/>
        </Routes>
      </Router>
    // </div>
  );
}

export default App;
