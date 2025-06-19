import { Box, Grid, GridItem, Heading, Text, VStack,  } from '@chakra-ui/react'
import product from '../store/portfolio';
import { useWorkStore } from '../store/work';
import { useEffect, useLayoutEffect } from 'react';
import { WorkPopup } from '../components/WorkPopup';
import { Footer } from '../components/Footer';
import gsap from 'gsap';
import { SplitText } from "gsap/SplitText";

export const WorkPage = () => {
    const { fetchWorks } = useWorkStore();
const products = product;
  const paddingX = { base: '1.5rem', md: ' 3rem', lg: '4rem', xl: '10rem' };
  const marginL = { base: '-1.5rem', md: ' -3rem', lg: '-4rem', xl: '-10rem' };
  
    useEffect(() => {
      fetchWorks();        
      
    }, [fetchWorks,]);
  
  useLayoutEffect(() => {
    const split = SplitText.create('.title_h2', {
      type: 'chars,words,lines',
      charsClass: 'chars',
    });

    gsap.from(split.chars, {
      x: "random(-200, 200)" ,
      opacity: 0,
      autoAlpha: 0,
      stagger: 0.2,
      ease: 'sine.inOut',
      
    });
    return () => {
      split.revert();
    } 
  }, [])
  
  return (
    <Box className='workpage container'  w={'100%'} display={'flex'} flexDir={'column'}  overflow={'hidden'}> 
      {/* PORTFOLIO */}
      <Box id='work' className='section portfolio_box' paddingX={paddingX}  >
        <VStack className='portfolio_title' alignItems={'start'} marginLeft={marginL}>          
          <Heading className='title_h2' fontSize={{base:'3.5rem', md:'6rem', lg:'7rem', xl:'9.5rem'}} >PORTFOLIO</Heading>
        </VStack>
        <Grid h={{ base: 'auto', }} 
          // marginTop={{base:'10rem'}}
          templateRows={{base:'repeat(4, 1fr)',md:'repeat(2, 1fr)' , }}
          templateColumns={{base:'repeat(1, 1fr)' ,md:'repeat(2, 1fr)', lg:'repeat(3, 1fr)' }}
          gap={6}
          className='grid_portfolio'
        >         
          {products.map((product, index) => (
            <GridItem className='workcard' key={index} height={{lg:'200px'}} >
              <WorkPopup key={index}  work={product} />            
          </GridItem>
          ))}     
        </Grid>
      </Box>
      
      <Footer />
    </Box>
  )
}
