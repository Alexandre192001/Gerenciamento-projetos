import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './components/pages/Home'
import Contato from './components/pages/Contato'
import NovoProjeto from './components/pages/Cadastro'
import Empresa from './components/pages/Empresa'
import NavBar  from './components/layout/NavBar'
import Container from './components/layout/Container'
import Projects from './components/pages/Projects'
import Footer from './components/layout/Footer'
import Project from './components/pages/project'

export default function App() {
  return(
    <>
  <Router>
    <NavBar/>
      <Container customClass="min-heigth">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/Contato" element={<Contato/>}/>
          <Route path="/NovoProjeto" element={<NovoProjeto/>}/>
          <Route path="/Empresa" element={<Empresa/>}/>
          <Route path="/ProjectsAll" element={<Projects/>}/>
          <Route path="/Project/:id" element={<Project/>}/>
        </Routes>
      </Container>
  </Router>
  <Footer/>
    </>
  )
}
