import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FourOhFour from './pages/FourOhFour';
import Home from './pages/Home';
import Login from './pages/Login';
import DPATSheet from './pages/DPATSheet';
import DPATAssessment from './pages/DPATAssessment';

function App() {
  return (
    <div className="container-fluid">
       <BrowserRouter >
          <Routes>
            <Route path='/login' element={<Login />} />

            {/* private routes */}
            {/* <Route element={<RequireAuth />} > */}
                <Route path='/' element={<Home />}/>
                 <Route path='/dpat-score-sheet' element={<DPATSheet />}/>
                 <Route path='/dpat-assessment-sheet' element={<DPATAssessment />}/>
                {/*<Route path='/ussd-dashboard' element={<USSDDashboard />} />
                <Route path='/ivr-dashboard' element={<IVRDashboard />} />
                <Route path='/users' element={<Users />} />
                <Route path='/district-report' element={<DistrictReport />}/>
                <Route path='/region-report' element={<RegionReoprt />}/>
                <Route path='/analysis' element={<Analysis />}/>
                <Route path='/real' element={<Real />}/>
                <Route path='/trial' element={<Trial />}/> */}
            {/* </Route> */}
            
            <Route path='*' element={<FourOhFour />}/>
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
