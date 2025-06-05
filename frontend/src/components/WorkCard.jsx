import { Badge, Box, Card, HStack, Image } from '@chakra-ui/react'


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
        <Card.Title>{work.title}</Card.Title>
        <HStack mt="2" >
          {work.tag.map(t => (
          <Badge size={{sm:'sm', md:"lg"}} key={t}>{t}</Badge>
          ))}
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}
