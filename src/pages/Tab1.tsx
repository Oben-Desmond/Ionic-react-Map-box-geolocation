import { CameraResultType, HapticsImpactStyle, HapticsNotificationType, KeyboardStyle, Plugins, StatusBarStyle } from '@capacitor/core';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { mapboxgl } from '../mapbox/mapbox';
import ReactMapGL, {Marker, Layer}  from 'react-map-gl';

 
 
  

let  accessToken = 'pk.eyJ1Ijoib2JlbmRlc21v*******************************;


const Tab1: React.FC = () => {

  const parkLayer:any = {
    id: 'landuse_park',
    type: 'fill',
    source: 'mapbox',
    'source-layer': 'landuse',
    filter: ['==', 'class', 'park']
  };
  const [long, setlong] = useState(0)
  const [lat, setlat] = useState(0)
    const [viewport, setViewport] = useState({
    
    latitude:  4.2046,
    longitude: 9.4977,
    zoom: 5,
    height:window.innerHeight,
    width:window.innerWidth,
    pitch:30
  });
   
  useEffect(()=>{
    Plugins.Geolocation.watchPosition({enableHighAccuracy:true,timeout:3000,maximumAge:2000},(res)=>{
     if(res){
      setlong(res.coords.longitude)
      setlat(res.coords.latitude)
     }
       
    })
    try{
      Plugins.StatusBar.setOverlaysWebView({overlay:true})
      Plugins.StatusBar.setStyle({style:StatusBarStyle.Light})
    }catch{}
     
  },[])
  const [parkColor, setParkColor] = React.useState('#8fa');
  return (
    <div>
    <ReactMapGL
    {...viewport} width="100vw" height="100vh" mapboxApiAccessToken={accessToken} 
    onViewportChange={(nextViewport:any )=> setViewport(nextViewport)}
>
<Marker latitude={lat} longitude={long} offsetLeft={-20} offsetTop={-10}>
        {/* <div style={{height:`10px`, width:`10px`, borderRadius:`50%`,backgroundColor:`blue`,opacity:0.7}}></div> */}
     <img 
     
     style={{height:`30px`, width:`30px`}}  src={`https://lh3.googleusercontent.com/proxy/xPfwUqppgCYr0gl-nDQRaGcAoyIY0hy2pN2Bt5E_aRAAsqa0Otc9gPQylhl4WD3XG7bPYiLQpaGUpv0ac8ynMEFE1l2rKcF73WBIA31naiqEycTfIiI5VXm4A-mrULp6-MUKdt5amAkM`} alt="pointer"/>
      </Marker>
      <Layer {...parkLayer} paint={{'fill-color': parkColor}} />
</ReactMapGL>
  {/* <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}></Marker> */}
  </div>
  );
};

export default Tab1;
 
