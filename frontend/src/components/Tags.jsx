import { Box } from '@chakra-ui/react';
import {TagCloud} from 'react-tagcloud';


const rotate = () => Math.floor(Math.random() * 60) - 30; // -30도에서 30도 사이로 회전

const options = {
  luminosity: 'dark',
  hue: '260deg',
  // hue: '#4536B2',
}
const customRenderer = (tag, size, color) => (
  <span
    key={tag.value}
    className='tags_item'
    style={{
      animation: 'blinker 4s linear infinite',
      animationDelay: `${Math.random() * 2.5}s`,
      fontSize: `${size / 2.0}rem`,
      transform: `rotate(${rotate}deg)`,
      color: color,
    }}
  >
    {tag.value}
  </span>
)

export const Tags = () => {
  
  
  return (
    <Box paddingX={{ lg:'0px', xl: '100px'}} paddingY={{base:'10rem', xl: '0rem', }}>
      {/* minSize={4} maxSize={11} */}
        <TagCloud minSize={2} maxSize={10} tags={data} colorOptions={options} randomSeed={42}  renderer={customRenderer} />
      
    </Box>
  )
}


const data = [
  {value: 'HTML5',            count: 45  },
  {value: 'Figma',            count: 100  },
  {value: 'Photoshop',        count: 56  },
  {value: 'Cross Browsing',   count: 46  },
  {value: 'Vite',             count: 30  },
  {value: 'UX',               count: 80  },
  {value: 'User Test',        count: 30  },
  {value: ' User flow',       count: 20  },
  {value: 'Layout',           count: 55  },
  {value: 'Grid',             count: 65  },
  {value: 'CSS3',             count: 45  },
  {value: 'Wireframe',        count: 75  },
  {value: 'Motion',           count: 50  },
  {value: 'Prototyping',      count: 100  },
  {value: 'UI Components',    count: 70  },
  {value: 'UI/UX',            count: 120  },
  {value: 'React',            count: 80  },
  {value: 'S/CSS',            count: 85  },
  {value: 'Web Accesibility', count: 65  },
  {value: 'Illustrator',      count: 88  },
  {value: 'JavaScript',       count: 70  },
  {value: 'Typograpy',        count: 35  },
  {value: 'Git',              count: 45  },
  {value: 'Web Publishing',   count: 100  },
  {value: 'Design System',    count: 60  },
  {value: 'Responsive Web',   count: 75  },
  {value: 'Frontend',         count: 60  },
  {value: 'Github',           count: 50  },
  {value: 'Adobe XD',         count: 85  },
  {value: 'npm',              count: 40  },
  {value: 'Color',            count: 35  },
  {value: 'Web standards',    count: 55  },
  {value: 'Micro Interactions',count: 45,  },
  {value: 'Bootstrap',        count: 55,  },
  {value: 'Chakra UI',        count: 60,  },
]