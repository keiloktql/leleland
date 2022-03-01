import React from 'react';
import { Icon } from '@iconify/react';
import { firebaseFn } from '../utils/firebase';

const Sandbox = () => {

  const handleOnClick = async () => {
    try {
      const [result, err] = await firebaseFn.postView("calculator");
      console.log(err)
    } catch (error){
      console.log(error);
    }

  }

  return <div className="c-Sandbox">
    <button onClick={() => handleOnClick()}>Add view</button>
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