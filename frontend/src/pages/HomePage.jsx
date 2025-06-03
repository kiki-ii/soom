
import { Box, Grid, GridItem, Heading, HStack, Image, Text } from '@chakra-ui/react';
import {WorkCard} from '../components/WorkCard';
import {ServiceCard} from '../components/ServiceCard';
import {useDragScroll} from '../hooks/useDragScroll.js';
import product from '../store/portfolio.js';

import { useWorkStore } from '../store/work';
import { useServiceStore } from '../store/service';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { WorkPopup } from '../components/WorkPopup.jsx';
import { Bg } from '../components/Bg.jsx';

import { gsap } from "gsap";    
import { SplitText } from "gsap/SplitText";


export const HomePage = () => {

  const {fetchServices, services } = useServiceStore();
  const { fetchWorks, works } = useWorkStore();
  const products = product;
  
  gsap.registerPlugin(SplitText);
  
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
  
  function SplitTitle({ text }) {
  return (
    <div>
      {text.split('').map((char, i) => (
        <span key={i} className="hero_title " style={{ animationDelay: `${i * 0.1}s` }}>
          {char}
        </span>
      ))}
    </div>
  );
  }
  
  


  useLayoutEffect(() => {
    gsap.registerPlugin(SplitText);

    let split = SplitText.create('.about', {
      type: 'chars,words,lines',
      charsClass: 'chars',
      // wordsClass: "",
      // wordDelimiter: String.fromCharCode(8205)
    });

    gsap.from(split.chars, {
      x: -500,
      opacity: 0,
      autoAlpha: 0,
      stagger: 0.05,
      duration: 1,
      ease: 'back',
    });

    return () => split.revert(); // 메모리 누수 방지
  }, []); 
  
  
  
  return (
    <Box w={'100%'} display={'flex'} flexDir={'column'}>
      {/* HERO section */}
      <Box className='hero' w={'100%'} h={'100vh'} padding={{ base: '0rem 1.5rem', xl:'1.75rem 10rem', lg: '1rem 6rem', md: '0rem 3rem'}} borderBottom={'1px solid #d8d8d8'}>
        <Box className='hero_text' zIndex={'1'} >
          <Text className='name' fontSize={{base:'xl', md:'2xl', lg:'3xl', xl:'3xl'}}>
            Lee soo min
          </Text>
          {/* <h1  className='title'>UI/UX &<br /> Web Publishing</h1> */}
          <SplitTitle text="UI/UX &" />
          <SplitTitle text="Web Publishing" />
          
          {/* <Text className='title' textWrap={'wrap'} fontSize={{base: '6xl', md:'8xl', lg:'8xl', xl:'8.5rem'}}>
            UI<span>/</span>UX <span>&</span>
            <br />
            Web Publishing
          </Text> */}
        </Box>
        {/* <Box position={'absolute'} left={'0'} top={'0'} w={'100%'} h={'100%'} zIndex={'0'}>
          <iframe src="https://my.spline.design/circleblur-OzXPv7GgLooPtjhFqr6Surve-65u/" frameborder="0" width="100%" height="100%"></iframe>
        </Box> */}
        {/* <Bg /> */}
      </Box>
      
      {/* WORK */}
      <Box id='work' className='workcard_box' padding={{ base: '4rem 1.5rem',md: '4rem 3rem',  lg: '6rem 4rem', xl:'14rem 10rem 5rem 10rem'}}>
        <Heading>Work</Heading>
        <Grid h={{base:'auto', xl: '1100px'}} 
          templateRows={{base:'repeat(6, 1fr)',md:'repeat(3, 1fr)', lg:'repeat(5, 1fr)'}}
          templateColumns={{base:'repeat(1, 1fr)' ,md:'repeat(2, 1fr)' ,lg:'repeat(3, 1fr)'}}
          gap={6}
          className='grid_work'
        >
                    
          {products.map(product => (
            <GridItem className='workcard' key={product.id}  >
              <WorkPopup key={product.id}  work={product} />
            
          </GridItem>
          ))}  
          
          
        </Grid>
      </Box>

      {/* SKILLS */}
      <Box id='skills' className='skills_box' padding={{ base: '4rem 1.5rem',md: '4rem 3rem',  lg: '8rem 4rem', xl:'10rem 10rem 6rem 10rem'}}>
        <HStack position='relative' display={{base:'block', lg:'flex'}}>
          <Heading>Skills</Heading>
          <Text position={{base:'relative', lg:'absolute'}} marginTop={{base:'1rem', lg:'0'}} className='skills_box_p'>The skills, tools and technologies I use : </Text>
        </HStack>
        
        <Grid
          className='skills' paddingX={{base:'4%', lg:'10%', xl:'8%'}}
          templateRows={{base: 'repeat(6, 1fr)',lg:'repeat(5, 1fr)', xl:'repeat(3, 1fr)' }}
          templateColumns={{base: 'repeat(2, 1fr)',lg:'repeat(3, 1fr)', xl:'repeat(6, 1fr)'}}
          gap={6} fontSize={{base:'1rem',md:'1.125rem', lg:'1.25rem'}}
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

      {/* SERVICES */}
      <Box id='services' className='services_box' padding={{ base: '4rem 1.5rem',md: '4rem 3rem',  lg: '6rem 4rem', xl:'10rem 10rem'}}>
        <Heading>Services</Heading>
        <Box className='service' ref={ref}>
          {services.map(service => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </Box>
      
      </Box>

      {/* ABOUT */}
      <Box id='about' className='about_box' padding={{ base: '4rem 1.5rem',md: '4rem 3rem',  lg: '6rem 4rem', xl:'10rem 10rem'}} display={{base: 'block', lg:'flex'}} borderTop={'1px solid #d8d8d8'}>
        <Heading >About</Heading>
        <Text width={{base:'auto', lg: '55%'}} paddingTop={{base:'2rem', lg:'0'}} fontSize={{base: '1.125rem', lg:'1.375rem'}} className='about'>
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
