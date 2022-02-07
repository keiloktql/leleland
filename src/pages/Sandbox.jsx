import React from 'react';

const Sandbox = () => {
  return <div>This is sandbox</div>;
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