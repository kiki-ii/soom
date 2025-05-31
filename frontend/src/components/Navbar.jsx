import { Box, Button, HStack, Icon, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { TfiLock, TfiUnlock, TfiPlus, TfiArrowUp  } from 'react-icons/tfi';
import { Link } from 'react-router-dom';

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
    <nav id='top' className='gnb'>
      <Box w={'full'} display={'flex'} justifyContent={'space-between'}>
        <Link to='/'>
          <div className='logo '><p className='blind'>Soom Logo</p>  
          </div>
        
        </Link>
        <HStack className='nav_item' gap='16'>
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
      </Box>
      
      <AnchorLink href='#top' className={showBtn ? 'btn_top show' : 'btn_top'} >
        <TfiArrowUp />
      </AnchorLink>
    </nav>
  )
}
