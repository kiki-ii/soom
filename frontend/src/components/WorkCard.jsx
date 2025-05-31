import { Badge, Card, HStack, Image } from '@chakra-ui/react'



export const WorkCard = ({ work }) => {
  
  function getImageUrl(name) {  
    return new URL(`../assets/images/work/${name}`, import.meta.url).href;
  }
  // console.log('work :', work.map(w => <p>{ w.title }</p>));
  
  return (
    <Card.Root className="workcard" border={'none'} key={work._id}>
      <Image src={getImageUrl(work.thumb)} alt={work.title} />
      
      <Card.Body gap="3">
        <Card.Title>{work.title}</Card.Title>
        <HStack mt="2">
          {work.tag.map(t => (
          <Badge size="lg" key={t._id}>{t}</Badge>
          ))}
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}
