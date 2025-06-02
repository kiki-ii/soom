import { Badge, Box, Card, HStack, Image } from '@chakra-ui/react'



export const WorkCard = ({ work }) => {
  
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
    <Card.Root  border={'none'} key={work._id} h='100%'>
      {/* <Image src={getImageUrl(work.thumb)} alt={work.title} /> */}
      <Box className='work_img' style={workImg} ></Box>
      
      <Card.Body gap="2" className='workcard_body' >
        <Card.Title>{work.title}</Card.Title>
        <HStack mt="2" >
          {work.tag.map(t => (
          <Badge size="lg" key={t}>{t}</Badge>
          ))}
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}
