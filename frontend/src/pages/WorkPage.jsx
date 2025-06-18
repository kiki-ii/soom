import { Box, Grid, GridItem, Heading, Text, VStack,  } from '@chakra-ui/react'
import product from '../store/portfolio';
import { useWorkStore } from '../store/work';
import { useEffect } from 'react';
import { WorkPopup } from '../components/WorkPopup';

export const WorkPage = () => {
    const { fetchWorks, works } = useWorkStore();
const products = product;
  const paddingX = { base: '1.5rem', md: ' 4rem', lg: '6rem', xl: '16rem' };
  
    useEffect(() => {
      fetchWorks();
        
      
    }, [fetchWorks, ]);
  
  return (
    <Box className='container'  w={'100%'} display={'flex'} flexDir={'column'}  overflow={'hidden'}> 
      {/* PORTFOLIO */}
      <Box id='work' className='section portfolio_box' paddingX={paddingX}  >
        <VStack className='section_title' alignItems={'start'}>
          
          <Heading >PORTFOLIO</Heading>
        </VStack>
        <Grid h={{base:'auto', }} 
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
    </Box>
  )
}
