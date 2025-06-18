import { Routes, Route, useLocation } from 'react-router';

import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { HomePage } from '../pages/HomePage';
import { WorkPage } from '../pages/WorkPage';


gsap.registerPlugin(ScrollSmoother, useGSAP);

export default function Router() {
  const location = useLocation();

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });
  }, [location]);

  return (
    <div id='smooth-wrapper'>
      <div id='smooth-content'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/work' element={<WorkPage />} />
          {/* <Route path='/create' element={<CreatePage />} /> */}
        </Routes>
      </div>
    </div>
  );
}
