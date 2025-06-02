import { Box,  CloseButton,  Drawer, VStack, Portal, IconButton } from '@chakra-ui/react'
import {  useState } from 'react';
import { IoMdMenu } from 'react-icons/io';


export const SideMenu = () => {
  const [open, setOpen] = useState(false);

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
                <CloseButton className='closebtn' size='2xl' />
              </Drawer.CloseTrigger>
              <Drawer.Body>
                <VStack className='sidemenu'>
                  <a href='#work' onClick={sideclose}>Work</a>
                  <a href='#skills' onClick={sideclose}>Skills</a>
                  <a href='#services' onClick={sideclose}>Services</a>
                  <a href='#about' onClick={sideclose}>About</a>
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
}

