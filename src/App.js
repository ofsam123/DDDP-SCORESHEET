import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FourOhFour from './pages/FourOhFour';
import Home from './pages/Home';
import Login from './pages/Login';
import DPATSheet from './pages/DPATSheet';
import DPATAssessment from './pages/DPATAssessment';
import DPATRegionSats from './components/RegionalAnalytics'
import DPATdistrictSats from './components/DistricAnalytics'
import RequireAuth from './components/RequireAuth';
import AAP from './components/AAP';
import ProjectAndProgram from './components/ProjectAndProgram';

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
                 <Route path='/dpat-regional-analytics' element={<DPATRegionSats />}/>
                 <Route path='/dpat-district-analytics' element={<DPATdistrictSats />}/>
                 <Route path='/aap-analytics' element={<AAP />}/>
                 <Route path='/project-and-program-analytics' element={<ProjectAndProgram />}/>
            </Route>
            {/* private routes */}
            
            <Route path='*' element={<FourOhFour />}/>
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
