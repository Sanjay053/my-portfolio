import './App.css';
import ThemeProvider from './ThemeProvider'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home'
import AboutPage from './Pages/About';
import ContactPage from './Pages/Contact';
import WorkPage from './Pages/Works';
import SkillsPage from './Pages/Skill';
import LoadingPage from './Pages/Loading';
import NavBar from './Components/Navbar'
import AnimatedCursor from "react-animated-cursor";
import snow from './Asset/snow.jpg'

function App() {
  const [introPage, setIntroPage] = useState(false);

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
      <AnimatedCursor
        innerSize={12}
        outerSize={40}
        color="79, 70, 229"
        outerAlpha={0.3}
        innerScale={1}
        outerScale={1.5}
        innerStyle={{
          borderRadius: '50%',
          backgroundColor: 'rgba(79,70,229,1)'
        }}
        outerStyle={{
          borderRadius: '50%',
          border: '2px solid rgba(79,70,229,0.3)'
        }}
      />
      {introPage ? <LoadingPage /> :
        <Router>
          <div style={{
            backgroundImage: `url(${snow})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh"
          }}>
            <NavBar />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/contact' element={<ContactPage />} />
              <Route path='/work' element={<WorkPage />} />
              <Route path='/skill' element={<SkillsPage />} />
              <Route path='*' element={<h1>404 Page Not Found</h1>} />

            </Routes>
          </div>
        </Router>}
    </ThemeProvider>
  );
}

export default App;
