import './App.css';
import ThemeProvider from './ThemeProvider'
import { useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import HomePage from './Pages/Home'
import AboutPage from './Pages/About';
import ContactPage from './Pages/Contact';
import WorkPage from './Pages/Works';
import SkillsPage from './Pages/Skill';
import LoadingPage from './Pages/Loading';
import NavBar from './Components/Navbar'
import snow from './Asset/snow.jpg'
import CustomCursor from "./Components/CustomCursor";

function App() {
  const [introPage, setIntroPage] = useState(false);
  const [isSticky, setIsSticky] = useState(false);


  useEffect(() => {
    const visited = localStorage.getItem('visited')

    if (!visited) {
      setIntroPage(true)
      localStorage.setItem("visited", "true")

      setTimeout(() => {
        setIntroPage(false)
      }, 3000)
    }
  }, [])

  return (
    <ThemeProvider>
      {introPage ? <LoadingPage /> :
        <HashRouter>
          <div
            style={{
              backgroundImage: `url(${snow})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              minHeight: "100vh",
              paddingTop: isSticky ? "80px" : "0px",
            }}
          >
            <CustomCursor />
            <NavBar setIsSticky={setIsSticky} />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/contact' element={<ContactPage />} />
              <Route path='/work' element={<WorkPage />} />
              <Route path='/skill' element={<SkillsPage />} />
              <Route path='*' element={<h1>404 Page Not Found</h1>} />

            </Routes>
          </div>
        </HashRouter>
      }
    </ThemeProvider>
  );
}

export default App;
