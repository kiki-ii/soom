import { Route, Routes } from 'react-router-dom'
import { Box, Theme} from '@chakra-ui/react'
import { ColorModeProvider, LightMode } from "./components/ui/color-mode"
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { CreatePage } from './pages/CreatePage'
import { Footer } from './components/Footer'

import './App.css'


function App() {


  return (   
    <ColorModeProvider forcedTheme="light">
      <Theme appearance="light">      
        <Box  w={'full'} minH={'100vh'}>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/create' element={<CreatePage />} />
          </Routes>
          <Footer />
        </Box>        
      </Theme>
    </ColorModeProvider>    
    
  )
}

export default App
