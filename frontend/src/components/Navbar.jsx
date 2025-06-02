import { Box, Button, HStack, Icon, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { TfiLock, TfiUnlock, TfiPlus, TfiArrowUp } from 'react-icons/tfi';
import { IoMdMenu } from "react-icons/io";
import { Link } from 'react-router-dom';
import { SideMenu } from './SideMenu';

export const Navbar = () => {
  const [showBtn, setShowBtn] = useState(false);
  // const topButton = document.querySelector('.btn_top');
  
  useEffect(() => {
    const showBtn = () => {
      if (window.scrollY > 400) {
        setShowBtn(true)
      } else {
        setShowBtn(false)
      }
    };
    window.addEventListener('scroll', showBtn);
    return () => {
      window.removeEventListener('scroll', showBtn)
    }
  },[])
  
  
  return (
    <Box id='top' className='gnb' padding={{ base: '1rem 1rem', xl:'1.75rem 10rem', lg: '1rem 6rem', md: '1rem 3rem'}}>
      <Box w={'full'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Link to='/'>
          <Box className='logo ' w={{base: '48px', lg: '60px'}} h={{base: '48px', lg: '60px'}} ><p className='blind'>Soom Logo</p>  
          </Box>
        
        </Link>
        
        <HStack className='nav_item' gap='16' display={{base:'none', lg:'flex'}}>
          <AnchorLink href='#work'>Work</AnchorLink>
          <AnchorLink href='#skills'>Skills</AnchorLink>
          <AnchorLink href='#services'>Services</AnchorLink>
          <AnchorLink href='#about'>About</AnchorLink>
          
          {/* <Icon  size="lg" >
            <TfiLock />
          </Icon>
          <Link to='/create'>          
            <Icon size='lg'>
              <TfiPlus />
            </Icon>
          </Link> */}
        </HStack>
        <SideMenu />
        
      </Box>
      
      <a href='#top' animation="bounce" className={showBtn ? 'btn_top show' : 'btn_top'} >
        <TfiArrowUp />
      </a>
      
    </Box>
  )
}
