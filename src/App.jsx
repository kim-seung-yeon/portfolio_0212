import { Routes, Route } from 'react-router-dom';
import Visual from './pages/Visual';
import Info from './pages/Info';
import Strengths from './pages/Strengths';
import Journey from './pages/Journey';

import Skill from './pages/Skill';
import Experience from './pages/Experience';
import Favorite from './pages/Favorite';
import Clonecoding from './pages/Clonecoding';
import Question from './pages/Question';
import Contact from './pages/Contact';
import Nav from './components/Nav';
import A from './pages/A';
import Project from './pages/Project';

export default function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div id="info-section">
                <Visual />
                <Info />
                <Strengths />
                <Journey />
              </div>
              <div id="project-section">
                <A />
                <Skill />
                <Clonecoding />
              </div>
              <div id="experience-section">
                <Experience />
                <Favorite />
              </div>
              <div id="faq-section">
                <Question />
              </div>
              <div id="contact">
                <Contact />
              </div>
            </>
          }
        />

        <Route
          path="/info"
          element={
            <>
              <Visual />
              <Info />
              <Strengths />
              <Journey />
            </>
          }
        />


        <Route
          path="/journey"
          element={
            <>
              <Journey />
            </>
          }
        />

        <Route
          path="/a"
          element={<A />}
        />
      </Routes>
    </div>
  );
}
