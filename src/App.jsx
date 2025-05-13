// import './App.css'
// import { Demo } from './Demo'
import { ToastContainer } from 'react-toastify'
import { Navbar } from './common/NavBar'
import { Route, Routes } from 'react-router-dom'
import { DashBoard } from './components/DashBoard'
import { History } from './components/History'
import { Analytics } from './components/Analytics'

function App() {

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3}
      />
      <Navbar />

      <Routes>
        <Route path='/' element={<DashBoard />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </>
  )
}

export default App
