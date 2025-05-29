import { Badge, Card, HStack, Image } from '@chakra-ui/react'
// import {useuseWorkStoreWork} from '../store/work.js'


export const WorkCard = ({work}) => {
  // console.log('work :', work.map(w => <p>{ w.title}</p>));
  return (
    <Card.Root className="workcard" border={'none'}>
      <Image src={ work.thumbnail} alt={work.title} />
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
