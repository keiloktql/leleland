import React from 'react';
import { Icon } from '@iconify/react';
import { firebaseFn } from '../utils/firebase';

const Sandbox = () => {

  return <div className="c-Sandbox">
    <h1>Nothing to see here, but good job for finding this page</h1>
  </div>

    ;
};

// Example codes
// useEffect(() => {
//   let componentMounted = true;
//   (async () => {
//       try {
//           if (componentMounted) {

//           }
//       } catch (error) {
//           console.log(error);
//       }
//   })();
//   return (() => {
//       componentMounted = false;
//   });
// }, []);

export default Sandbox;