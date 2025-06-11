import { Badge, Box, Card, HStack,Text, Image } from '@chakra-ui/react'


export const WorkCard = ({ work, setOpen }) => {
  // const [isOpen, setIsOpen] = useState(false);
    
  const handleOpen = ()=> {
    setOpen(true)
  }
  
  function getImageUrl(name) {  
    return new URL(`../assets/images/work/${name}`, import.meta.url).href;
  }
  const workImg = {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${getImageUrl(work.thumb)})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };
  
  
  return (
    
    <Card.Root  key={work._id} h='100%' >      
      <Box className='work_img' style={workImg} onClick={handleOpen}></Box>      
      <Card.Body gap="" className='workcard_body' >
        <HStack mb="3" wrap={'wrap'} >
          {work.tag.map(t => (
            // <Badge size={{base:'sm', md:"lg"}} key={t}>{t}</Badge>
            <Box className='badge' size={{base:'sm', md:"lg"}} key={t}>{t}</Box>
            
          ))}
        </HStack>
        <Card.Title>{work.title}</Card.Title>
      </Card.Body>
    </Card.Root>
  )
}
