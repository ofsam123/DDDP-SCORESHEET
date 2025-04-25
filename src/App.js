import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FourOhFour from './pages/FourOhFour';
import Home from './pages/Home';
import Login from './pages/Login';
import DPATSheet from './pages/DPATSheet';
import DPATAssessment from './pages/DPATAssessment';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <div className="container-fluid">
       <BrowserRouter >
          <Routes>
            <Route path='/login' element={<Login />} />

            {/* private routes */}
            <Route element={<RequireAuth />} >
                <Route path='/' element={<Home />}/>
                 <Route path='/dpat-score-sheet' element={<DPATSheet />}/>
                 <Route path='/dpat-assessment-sheet' element={<DPATAssessment />}/>
            </Route>
            {/* private routes */}
            
            <Route path='*' element={<FourOhFour />}/>
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
