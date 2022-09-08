import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import AdminDashbaord from './pages/admin/Dashboard'
import StudentDashboard from './pages/student/Dashboard'
import TutorDashboard from './pages/tutor/Dashboard'
import CreateQuiz from './pages/tutor/CreateQuiz'
import Tutors from './pages/Tutors'
import TutorProfile from './pages/TutorProfile'
import Quiz from './pages/Quiz'
import { useSelector } from 'react-redux'
import Messages from './pages/Messages'
import StudentProfile from './pages/StudentProfile'
import Meeting from './pages/Meeting'
import VideoCall from './components/VideoCall'
import Reviews from './pages/Reviews'
import Checkout from './pages/student/Checkout'
import NotAuto from './pages/NotAuto'
import PageNotFound from './pages/PageNotFound'
import ForgotPassword from './pages/ForgotPassword'
import HowItWorks from './pages/HowItWorks'
import PaymentSuccess from './pages/PaymentSuccess'
function App() {
  const { user } = useSelector((state) => state.auth)
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          {/* admin routes */}
          <Route path='/admin/dashboard' element={user ?user.data.role==='admin'? <AdminDashbaord /> :<NotAuto/>: <Login />} />
          {/* student routes */}
          <Route path='/student/dashboard' element={user ? user.data.role==='student'? <StudentDashboard /> :<NotAuto/>: <Login />} />
          {/* tutor routes */}
          <Route path='/tutors' element={<Tutors />} />
          <Route path='/tutor/:id' element={<TutorProfile />} />
          <Route path='/tutor/dashboard' element={user ?user.data.role==='tutor'?  <TutorDashboard />:<NotAuto/> : <Login />} />
          <Route path='/tutor/quiz/create' element={user?user.data.role==="tutor"?<CreateQuiz />:<NotAuto/>:<Login/>} />
          <Route path='/quiz/:id' element={user?<Quiz />:<Login/>} />
          <Route path='/reviews/:id' element={<Reviews/>}/>
          <Route name="Checkout" path='/checkout/:id' element={user?<Checkout/>:<Login/>}/>
          {/* <Route path='/message' element={user ? <Messages /> : <Login />}></Route> */}
          {/* Student routes */}
          <Route path='/student/:id' element={<StudentProfile />} />
          {/* Room */}
          <Route path='/room' element={<Meeting />}/>
          <Route path='/room/:id' element={<VideoCall/>}/>
          {/* page not found */}
          <Route path='*' element={<PageNotFound/>}/>
          <Route path="/how-it-works" element={<HowItWorks/>} />
          <Route path='/payment-success/:id' element={<PaymentSuccess/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
