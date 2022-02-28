import React from 'react';
import { Icon } from '@iconify/react';

const Sandbox = () => {
  return <div className="c-Sandbox">
    <figure class="c-Device c-Device--iphone-x">
      <div class="c-Device__Frame">
        <div className="c-Device__Screen">
        </div>
      </div>
      <div className="c-Device__Top">
        <p className="c-Device__Top-left">
          9:41
        </p>
        <p className="c-Device__Top-right">
          <Icon className="c-Device__Icon" icon="fluent:cellular-data-1-20-filled" />
          <Icon className="c-Device__Icon" icon="fluent:wifi-2-24-filled" />
          <Icon className="c-Device__Icon" icon="bi:battery-full" />
        </p>
      </div>
      <div class="c-Device__Stripe"></div>
      <div class="c-Device__Header"></div>
      <div class="c-Device__Sensors"></div>
      <div class="c-Device__Btns"></div>
      <div class="c-Device__Power"></div>
    </figure>
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