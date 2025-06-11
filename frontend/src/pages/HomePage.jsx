
import { Accordion, Box, Center, Grid, GridItem, Heading, HStack, Image, Span, Text, VStack } from '@chakra-ui/react';
import {ServiceCard} from '../components/ServiceCard';
// import {useDragScroll} from '../hooks/useDragScroll.js';
import product from '../store/portfolio.js';

import { useWorkStore } from '../store/work';
import { useServiceStore } from '../store/service';
import { useEffect,  useLayoutEffect,  useRef } from 'react';
import { WorkPopup } from '../components/WorkPopup.jsx';
import { Bg } from '../components/Bg.jsx';

import { gsap } from "gsap";    
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import faq from '../store/faq.js';
import { Tags } from '../components/Tags.jsx';

gsap.registerPlugin(SplitText, ScrollTrigger);


export const HomePage = () => {

  const {fetchServices, services } = useServiceStore();
  const { fetchWorks, works } = useWorkStore();
  const products = product;
  
  // const workRef = useRef();
  const containerRef = useRef(null);
  const sections = useRef([]);
  
  useEffect(() => {
    fetchWorks();
    fetchServices();
  }, [fetchWorks, fetchServices]);
  
  
  // const [ref] = useDragScroll();
  // if (!ref) {
  //   const services_box = document.querySelector('.services_box');
  //   services_box.style.overflowY = 'auto';
  // }

  function getImageUrl(name) {
    // note that this does not include files in subdirectories
    return new URL(`../assets/images/${name}`, import.meta.url).href;
  }
  
  function SplitTitle({ text }) {
  return (
    <div>
      {text.split('').map((char, i) => (
        <span key={i} className="hero_title " style={{ animationDelay: `${i * 0.3}s` }}>
          {char}
        </span>
      ))}
    </div>
  );
  }  
  

  // useLayoutEffect(() => {   
    
    
  //   // NOTE: WORK CARD
  //   // let work = gsap.utils.toArray('.workcard');        
    
  //   // const workTrigger = ScrollTrigger.create({
  //   //   trigger: '.workcard_box',
  //   //   start: 'top center',
  //   //   end: 'top 100px',
  //   // })
    
  //   // gsap.fromTo(work, {
  //   //   x: "random(-600, 600)",
  //   //   y: "random(-600, 600)",
  //   //   opacity: 0
  //   // },
  //   //   {
  //   //     duration: 1,
  //   //     stagger: 0.1,
  //   //     x: 0,
  //   //     y:0,
  //   //     opacity: 1,
  //   //     ease:'sine.inOut',
  //   //     scrollTrigger: workTrigger
  //   //   })
    
  //   // NOTE: CATCHPHRASE
  //    const split = SplitText.create('.catchphrase', {
  //      type: 'chars,words,lines',
  //      charsClass: 'chars',
  //    });

  //   gsap.from(split.chars, {
  //     y: "random(-200, 200)" ,
  //     // x: "random(-200, 200)",
  //     opacity: 0,
  //     autoAlpha: 0,
  //     stagger: 0.3,
  //     ease: 'sine.inOut',
  //     // toggleActions: 'play restart none reverse',
  //     scrollTrigger: {
  //       trigger: '.catchphrase_box', // .skills_box
  //       start: 'top center',
  //       endTrigger: '#services',
  //       end: 'bottom center',    
  //       markers:false        
  //     },
      
  //   });

  //   return () => {
      
  //     split.revert(); // 메모리 누수 방지
  //     ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // ScrollTrigger 정리
  //   }
  // }, []); 
  
  const addToRefs = (el) => {
    if (el && !sections.current.includes(el)) {
      sections.current.push(el);
    }
  };
  
  return (
    <Box className='container'  w={'100%'} display={'flex'} flexDir={'column'} ref={containerRef} overflow={'hidden'}> 
      {/* HERO section */}
      <Box ref={addToRefs} className='section hero' w={'100%'} h={'100vh'} padding={{ base: '0rem 1.5rem', xl:'1.75rem 10rem', lg: '1rem 6rem', md: '0rem 3rem'}} borderBottom={'1px solid #d8d8d8'}>
        <Box className='hero_text' zIndex={'1'} >
          <Text className='name' fontSize={{base:'xl', md:'2xl', lg:'3xl', xl:'3xl'}}>
            Lee soo min
          </Text>
          {/* <h1  className='title'>UI/UX &<br /> Web Publishing</h1> */}
          <Box>
          
          <SplitTitle text="UI/UX Design &" />
          <SplitTitle className="delay" text="Web Publishing" />
          </Box>
        </Box>
        
        {/* <Bg /> */}
      </Box>
      
      {/* PORTFOLIO */}
      <Box id='work' className='workcard_box' padding={{ base: '4rem 1.5rem', md: '4rem 3rem', lg: '6rem 4rem', xl: '14rem 10rem 5rem 10rem' }} ref={containerRef}>
        <VStack className='section_title' alignItems={'start'}>
          <Text>PORTFOLIO</Text>
          <Heading >Design in Action</Heading>
        </VStack>
        <Grid h={{base:'auto', xl: '1100px'}} 
          templateRows={{base:'repeat(4, 1fr)',md:'repeat(2, 1fr)' , }}
          templateColumns={{base:'repeat(1, 1fr)' ,md:'repeat(2, 1fr)', lg:'repeat(12, 1fr)' }}
          gap={6}
          className='grid_work'
        > 
        
          {products.slice(0, 4).map((product, index) => (
            <GridItem className='workcard' key={index}  >
              <WorkPopup key={index}  work={product} />            
          </GridItem>
          ))}            
          
        </Grid>
      </Box>

      {/* SKILLS */}
      <Box id='skills' className='skills_box' padding={{ base: '4rem 1.5rem', md: '4rem 3rem', lg: '8rem 4rem', xl: '4rem 10rem' }} >
        <VStack className='section_title' alignItems={'start'}>
          <Text>SKILLS</Text>
          <Heading >What I Work With</Heading>
        </VStack>
        
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
          <Box  className='skills_cat_box'>
            <h4>Development</h4>
            <Grid templateColumns={'repeat(2, 1fr)'} gap={'3'}>
              <Box className='skill_item' >
                <Image src={getImageUrl('icon_html.svg')} alt='html' />
                <Text>HTML 5</Text>
              </Box>
              <Box className='skill_item' >
                <Image src={getImageUrl('icon_css.svg')} alt='css' />
                <Text>CSS</Text>
              </Box>
              <Box className='skill_item' >
                <Image src={getImageUrl('icon_js.svg')} alt='javascript' />
                <Text>Javascript</Text>
              </Box>
              <Box className='skill_item' >
                <Image src={getImageUrl('icon_bootstrap.svg')} alt='bootstrap' />
                <Text>Bootstrap</Text>
              </Box>
              <Box className='skill_item' >
                <Image src={getImageUrl('icon_react.svg')} alt='react' />
                <Text>React</Text>
              </Box>
              
            </Grid>
          </Box>
          <Box className='skills_cat_box'>
            <h4>Design</h4>
            <Grid templateColumns={'repeat(2, 1fr)'} gap={'3'}>
              <Box className='skill_item' >
                <Image src={getImageUrl('icon_figma.svg')} alt='figma' />
                <Text>Figma</Text>
              </Box>
              <Box className='skill_item' >
                <Image src={getImageUrl('icon_xd.svg')} alt='Adobe XD' />
                <Text>Adobe XD</Text>
              </Box>
              <Box className='skill_item' >
                <Image src={getImageUrl('icon_ps.svg')} alt='Photoshop' />
                <Text>Photoshop</Text>
              </Box>
              <Box className='skill_item' >
                <Image src={getImageUrl('icon_ai.svg')} alt='illustrator' />
                <Text>Illustrator</Text>
              </Box>
              
            </Grid>
          </Box>
          <Box className='skills_cat_box'>
            <h4>Tools</h4>
            <Grid templateColumns={'repeat(2, 1fr)'} gap={'3'}>
              <Box className='skill_item' >
                <Image src={getImageUrl('icon_vscode.svg')} alt='vscode' />
                <Text>VSCode</Text>
              </Box>
              <Box className='skill_item' >
                <Image src={getImageUrl('icon_notion.svg')} alt='notoin' />
                <Text>Notion</Text>
              </Box>
              <Box className='skill_item' >
                <Image src={getImageUrl('icon_github.svg')} alt='github' />
                <Text>Github</Text>
              </Box>
            </Grid>
          </Box>

        </Grid>
      </Box>
      
      {/* <Box ref={addToRefs}  className='section catchphrase_box'><Text className='catchphrase'>Less, <span>but</span> Better</Text></Box> */}

      {/* SERVICES */}
      <Box id='services' className='services_box' padding={{ base: '4rem 1.5rem',md: '4rem 3rem',  lg: '6rem 4rem', xl:'10rem 10rem'}}>
        <VStack className='section_title' alignItems={'start'}>
          <Text>SERVICES</Text>
          <Heading >What I Offer</Heading>
        </VStack>
        <Grid className='service' templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg:'repeat(3, 1fr)', xl:'repeat(4, 1fr)'}} gridAutoFlow={'dense'} >
          {services.map(service => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </Grid>      
      </Box>
      
      
      {/* TAGS */}
      <Box id='tags' className='tags_box' paddingX={{ base: '4rem 1.5rem',md: '4rem 3rem',  lg: '6rem 4rem', xl:'10rem 16rem'}} display={{base:'none', xl:'block'}}>
        <Tags />
      </Box>
      

      {/* ABOUT */}
      <Box id='about' ref={addToRefs} className='section about_box' padding={{ base: '4rem 1.5rem', md: '4rem 3rem', lg: '6rem 4rem', xl: '10rem 10rem' }} paddingBottom={'0 !important'} display={{ base: 'block', lg: 'flex' }} justifyContent={'space-between'}>        
        <VStack className='section_title' alignItems={'start'}>
          <Text>ABOUT ME</Text>
          <Heading lineHeight={'125% !important'} >Less Design, <br />More Meaning</Heading>
        </VStack>
        <Text width={{base:'auto', lg: '55%'}} paddingTop={{base:'2rem', lg:'0'}} fontSize={{base: '1.125rem', lg:'1.375rem'}} className='about_p'>
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
      
      <Box className='section faq_box' padding={{ base: '4rem 1.5rem',md: '4rem 3rem',  lg: '6rem 4rem', xl:'10rem 10rem'}} display={{base: 'block', lg:'flex'}}  >
        <Accordion.Root collapsible defaultValue={["1"]}>
          {faq.map((f, id) => (
            <Accordion.Item key={id} value={f.id}>
              <Accordion.ItemTrigger className='faq_trigger'>
                <Text flex="1" >{f.title}</Text>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody className='faq_cont'>{f.description}</Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Box>
      
      
      
    </Box>
  );
};
