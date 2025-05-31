import { Box, Grid, GridItem, Heading, HStack, Image, Text, Wrap, } from '@chakra-ui/react';

import {WorkCard} from '../components/WorkCard';
import {ServiceCard} from '../components/ServiceCard';
import {useDragScroll} from '../hooks/useDragScroll.js';


import { useWorkStore } from '../store/work';
import { useServiceStore } from '../store/service';
import { useEffect } from 'react';

export const HomePage = () => {

  const {fetchServices, services } = useServiceStore();
  const { fetchWorks, works } = useWorkStore();
  
  useEffect(() => {
    fetchWorks();
    fetchServices();
  }, [fetchWorks, fetchServices]);
  
  
  const [ref] = useDragScroll();
  if (!ref) {
    const services_box = document.querySelector('.services_box');
    services_box.style.overflowY = 'auto';
  }

  function getImageUrl(name) {
    // note that this does not include files in subdirectories
    return new URL(`../assets/images/${name}`, import.meta.url).href;
  }
  


  

  return (
    <Box w={'100%'} display={'flex'} flexDir={'column'}>
      {/* Hero section */}
      <Box className='hero' bg={'pink.100'} w={'100%'} h={'100vh'}>
        <Box className='hero_text'>
          <Text className='name' fontSize={'3xl'}>
            Lee soo min
          </Text>
          <Text className='title' fontSize={'9xl'}>
            UI<span>/</span>UX <span>&</span>
            <br />
            Web Publishing
          </Text>
        </Box>
      </Box>
      <Box id='work' className='workcard_box'>
        <Heading>Work</Heading>
        <Grid
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(3, 1fr)'
          gap={4}
        >
        
          {works.map(work => (
          <GridItem rowSpan={2} key={work._id} >
            <WorkCard  work={work} />            
          </GridItem>
          ))}
          
          {/*
          <GridItem rowSpan={2}>
            <WorkCard key={work._id} work={work}/>            
          </GridItem>
           <GridItem rowSpan={3}>
            <WorkCard />
          </GridItem>
          <GridItem rowSpan={2}>
            <WorkCard />
          </GridItem>
          <GridItem rowSpan={3}>
            <WorkCard />
          </GridItem>
          <GridItem rowSpan={3}>
            <WorkCard />
          </GridItem>
          <GridItem rowSpan={2}>
            <WorkCard />
          </GridItem> */}
        </Grid>
      </Box>

      {/* Skills */}
      <Box id='skills' className='skills_box'>
        <HStack position='relative'>
          <Heading>Skills</Heading>
          <Text className='skills_box_p'>The skills, tools and technologies I use : </Text>
        </HStack>
        <Grid
          className='skills'
          templateRows='repeat(3, 1fr)'
          templateColumns='repeat(6, 1fr)'
          gap={6}
        >
          <HStack>
            <Image src={getImageUrl('icon_html.svg')} alt='html' />
            <Text>HTML 5</Text>
          </HStack>
          <HStack>
            <Image src={getImageUrl('icon_css.svg')} alt='css' />
            <Text>CSS</Text>
          </HStack>
          <HStack>
            <Image src={getImageUrl('icon_sass.svg')} alt='sass' />
            <Text>Sass</Text>
          </HStack>
          <HStack>
            <Image src={getImageUrl('icon_js.svg')} alt='javascript' />
            <Text>Javascript</Text>
          </HStack>
          <HStack>
            <Image src={getImageUrl('icon_bootstrap.svg')} alt='bootstrap' />
            <Text>Bootstrap</Text>
          </HStack>
          <HStack>
            <Image src={getImageUrl('icon_react.svg')} alt='react' />
            <Text>React</Text>
          </HStack>
          <HStack>
            <Image src={getImageUrl('icon_figma.svg')} alt='figma' />
            <Text>Figma</Text>
          </HStack>
          <HStack>
            <Image src={getImageUrl('icon_xd.svg')} alt='Adobe XD' />
            <Text>Adobe XD</Text>
          </HStack>
          <HStack>
            <Image src={getImageUrl('icon_vscode.svg')} alt='VSCode' />
            <Text>VSCode</Text>
          </HStack>
          <HStack>
            <Image src={getImageUrl('icon_ps.svg')} alt='photoshop' />
            <Text>Photoshop</Text>
          </HStack>
          <HStack>
            <Image src={getImageUrl('icon_ai.svg')} alt='illustrator' />
            <Text>Illustrator</Text>
          </HStack>
          <HStack>
            <Image src={getImageUrl('icon_notion.svg')} alt='notion' />
            <Text>Notion</Text>
          </HStack>
          <HStack>
            <Image src={getImageUrl('icon_github.svg')} alt='github' />
            <Text>Github</Text>
          </HStack>
        </Grid>
      </Box>

      {/* Services */}
      <Box id='services' className='services_box'>
        <Heading>Services</Heading>
        <Box className='service' ref={ref}>
          {services.map(service => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </Box>
      </Box>

      {/* About */}
      <Box id='about' className='about_box'>
        <Heading>About</Heading>
        <Text>
          안녕하세요. 디자인과 퍼블리싱에 대한 10년 이상의 경력을 가진 UI/UX
          디자이너 이수민입니다.
          <br />
          저는 UI/UX 디자인부터 최종 결과물이 웹에 구현되는 과정까지 전체적인
          흐름을 이해하며 작업하고 있습니다.
          <br />
          사용자의 입장에서 편리하고 직관적인 인터페이스를 디자인하는 동시에,{' '}
          <br />
          디자인 결과물을 웹 표준과 접근성을 고려하여 효율적인 코드로 구현하는
          데 강점을 가지고 있습니다.
          <br />
          디자인의 진정한 가치는 사람을 생각하는 데 있다고 생각합니다. <br />
          디자인의 본질을 항상 되뇌이며 기본이 탄탄하고 사람이 중심이 되는
          디자인을 위해 노력합니다. <br />
          디자인과 사람의 조화를, 이야기를 담은 디자인을 위해 끊임없이 노력하고
          있습니다.
        </Text>
      </Box>
      <Box h='500px'></Box>
    </Box>
  );
};
