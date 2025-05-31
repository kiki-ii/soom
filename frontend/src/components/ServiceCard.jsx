import { Card, Image } from '@chakra-ui/react';


export const ServiceCard = ( {service}) => {
  
  function getImageUrl(name) {
  // note that this does not include files in subdirectories
    return new URL(`../assets/images/${name}`, import.meta.url).href;
  }
    // console.log('service :', service.map(w => <p>{ w.title}</p>));
  
  return (
    <Card.Root className="servicecard">
      <Image src={getImageUrl(service.iconimg)} alt='' />
      <Card.Body gap={4}>
        <Card.Title>{service.title}</Card.Title>
        <Card.Description>{service.descript}</Card.Description>
      </Card.Body>
    </Card.Root>
  )
}
