import { Route, Routes } from 'react-router-dom'
import { Box, Theme} from '@chakra-ui/react'
import { ColorModeProvider, LightMode } from './components/ui/color-mode'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { Footer } from './components/Footer'

import './App.css'
// import CreatePage from './pages/CreatePage'


function App() {


  return (   
    <ColorModeProvider forcedTheme="light">
      <Theme appearance="light">      
        <Box  w={'full'} minH={'100vh'} className='body_bg'>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            {/* <Route path='/create' element={<CreatePage />} /> */}
          </Routes>
          <Footer />
        </Box>        
      </Theme>
    </ColorModeProvider>    
    
  )
}

export default App
