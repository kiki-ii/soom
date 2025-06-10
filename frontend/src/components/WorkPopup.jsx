import { Box, CloseButton, Dialog, Image, Portal } from '@chakra-ui/react'
import React, { useState } from 'react'
import { WorkCard } from './WorkCard';

export const WorkPopup = ({work }) => {
  const [open, setOpen] = useState(false);

  function getImageUrl(name) {
    return new URL(`../assets/images/work/${name}`, import.meta.url).href;
  }

  return (
    <Dialog.Root
      size='xl'
      motionPreset='slide-in-bottom'
      scrollBehavior='outside'
      open={open}
      onOpenChange={e => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <WorkCard work={work} setOpen={setOpen} />
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {/* <Dialog.Header>
              <Dialog.Title>With Outside Scroll</Dialog.Title>
            </Dialog.Header> */}
            <Dialog.CloseTrigger  bgColor={'#ffffff'} asChild>
              <CloseButton size='lg' />
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <Box>
                {work.image.map(img => (
                  <Image src={getImageUrl(img)} key={img.inex} />
                ))}
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
