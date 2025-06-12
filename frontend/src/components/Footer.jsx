import { Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'



export const Footer = () => {
  useEffect(() => {
  
  const text = document.querySelector(".text > p");
  text.innerHTML = text.innerText.split("").map(
      (char, i) => `<span style="transform:rotate(${i * 8.8}deg)">${char}</span>`
    ).join("");
    },[])
  
  return (
    <footer h={'580px'} className='section footer'>
      <div className="circle_box">
        <div className='circle'>
        {/* <div classNam e="innersize"></div> */}
          <div className="text">
            <p>Copyright © Lee Soomin • </p>
          </div>
        </div>
      </div>
        <p className='txt_big'>Less, but Better</p>

      </footer>
  )
}
