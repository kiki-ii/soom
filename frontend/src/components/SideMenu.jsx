import { HashLink as Link } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Box, CloseButton, Drawer, VStack, Portal, IconButton } from '@chakra-ui/react'
import {  useState } from 'react';
import { IoMdMenu } from 'react-icons/io';


export const SideMenu = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isHome = currentPath === '/';

  const sideclose = e => {
    e.addEventListener('click', setOpen(false));
  };
  

  
  return (
    <Box className='sidemenu_box' position={'absolute'} right={{ base: '1rem', md: '3rem'}}>
      <Drawer.Root open={open} onOpenChange={e => setOpen(e.open)}>
        <Drawer.Trigger asChild>
          <IconButton variant='plain' className='btn_menu'  display={{base: 'block', lg: 'none'}}>
            <IoMdMenu  />
          </IconButton>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.CloseTrigger asChild>
                <CloseButton className='closebtn' size='lg' />
              </Drawer.CloseTrigger>
              <Drawer.Body padding={'0'}>
                <VStack className='sidemenu'>
                  
                  {isHome ? 
                    <>
                    <Link to='/' onClick={sideclose}>Home</Link>
                    <Link to='/work' onClick={sideclose}>Portfolio</Link>
                    <AnchorLink href='#skills' onClick={sideclose}>Skills</AnchorLink>
                    <AnchorLink href='#services' onClick={sideclose}>Services</AnchorLink>
                    <AnchorLink href='#about' onClick={sideclose}>About me</AnchorLink>
                    </>
                    : 
                    <>
                      <Link to='/' onClick={sideclose}>Home</Link>
                    <Link to='/work' onClick={sideclose}>Portfolio</Link>
                    <Link to='/#skills' onClick={sideclose}>Skills</Link>
                    <Link to='/#services' onClick={sideclose}>Services</Link>
                    <Link to='/#about' onClick={sideclose}>About me</Link>
                    </>
                    }
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
}

