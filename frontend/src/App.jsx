import { Box, Theme} from '@chakra-ui/react'
import { ColorModeProvider, LightMode } from './components/ui/color-mode'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

import Router from './router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

import './App.css'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);


function App() {
  

  return (   
    <ColorModeProvider forcedTheme="light">
      <Theme appearance="light">      
        <Box  w={'full'} minH={'100vh'} className='body_bg' >
          <Navbar />
          <Router />
          
        </Box>        
      </Theme>
    </ColorModeProvider>    
    
  )
}

export default App
