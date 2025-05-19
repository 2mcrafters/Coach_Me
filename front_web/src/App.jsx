import { useState } from 'react'
import { Route, Routes ,BrowserRouter } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import RessourcesTable from './lists/RessourcesList'
import AddRessource from './pages/addRessource'
import EditRessource from './pages/editRessource'
import PlanList from './lists/planList'
import AddPlan from './pages/addPlan'
import EditPlan from './pages/editPlan'
import { SessionsPage } from './pages/Sessions';
import { ReportsPage } from './pages/Reports';
import { ToastProvider } from './components/ui/use-toast';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1> */}
  <ToastProvider>

  
      <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/ressources' element={<RessourcesTable/>} />
        <Route path='/addRessource' element={<AddRessource/>} />
        <Route path='/editRessource/:id' element={<EditRessource/>} />
        <Route path='/plans' element={<PlanList/>} />
        <Route path='/addPlan' element={<AddPlan/>} />
        <Route path="/editPlan/:id" element={<EditPlan />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/reports" element={<ReportsPage />} />

      </Routes>
      </BrowserRouter>
      </ToastProvider>

    </>
  )
}

export default App
