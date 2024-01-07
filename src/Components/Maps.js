import React, { useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';

const Map = ({ pop }) => {
  const lat = 31.5204;
  const lon = 74.3587;

  useEffect(() => {
    const loadMap = () => {
      const script = document.createElement('script');
      script.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.25.1/maps/maps-web.min.js';
      script.async = true;
      script.onload = () => {
        const map = tt.map({
          key: 'vYyUh2tVNbH47tYBvQ3rfKrbvf2AaB7f',
          container: 'map',
        });
        map.addControl(new tt.FullscreenControl());
        map.addControl(new tt.NavigationControl());
        const popup = new tt.Popup({ offset: 30 }).setHTML(`the POP at this is : ${pop}`);
        new tt.Marker({ draggable: false })
          .setLngLat([lon, lat])
          .setPopup(popup)
          .addTo(map);
      };
      document.body.appendChild(script);
    };

    loadMap();
  }, [lat, lon, pop]);

  return <div id='map' className='map' style={{ width: '100%', height: '180px' }}></div>;
};

export default Map;
