import { Box, HStack, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { TfiLock, TfiUnlock, TfiPlus  } from "react-icons/tfi";

export const Navbar = () => {
  return (
    <nav className='gnb'>
      <Box w={'full'} display={'flex'} justifyContent={'space-between'}>
        <Link to='/'>
          <div>Logo</div>
        
        </Link>
        <HStack >
          <div>menu01</div>
          <div>menu02</div>
          <div>menu03</div>
          <div>menu04</div>
          <div>menu05</div>
          <Icon  size="lg" >
            <TfiLock />
          </Icon>
          <Link to='/create'>          
            <Icon size='lg'>
              <TfiPlus />
            </Icon>
          </Link>
        </HStack>
      </Box>
    </nav>
  )
}
