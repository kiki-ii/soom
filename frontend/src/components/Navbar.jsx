import { Box,  HStack,} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { TfiLock, TfiUnlock, TfiPlus, TfiArrowUp } from 'react-icons/tfi';
import { Link, useLocation } from 'react-router-dom';
import { SideMenu } from './SideMenu';

export const Navbar = () => {
  const [showBtn, setShowBtn] = useState(false);
  // const topButton = document.querySelector('.btn_top');
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isHome = currentPath === '/';
  // const isWork = currentPath === '/work';
  
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
        
        <HStack className='nav_item' gap='16' display={{ base: 'none', lg: 'flex' }}>
          {isHome ?
            <>
              <AnchorLink href='#work'>Work</AnchorLink>
              <AnchorLink href='#skills'>Skills</AnchorLink>
              <AnchorLink href='#services'>Services</AnchorLink>
              <AnchorLink href='#about'>About</AnchorLink>
            </>
            :
            <>
              <Link to='/' >Work</Link>
              <Link to='/' >Skills</Link>
              <Link to='/' >Services</Link>
              <Link to='/' >About</Link>
            </>
          }

          
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
