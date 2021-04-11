// import React, { useEffect, useRef, useState } from "react";

// import WaveSurfer from "wavesurfer.js";
// import './visualizer.css'

// const formWaveSurferOptions = ref => ({
//   container: ref,
//   waveColor: "#eee",
//   progressColor: "OrangeRed",
//   cursorColor: "OrangeRed",
//   barWidth: 2,
//   barRadius: 2,
//   responsive: true,
//   height: 150,

  
//   // If true, normalize by the maximum peak instead of 1.0.
//   normalize: true,
//   // Use the PeakCache to improve rendering speed of large waveforms.
//   partialRender: true,
//   pixelRatio: 1,

  
// });

// export default function Waveform({ url }) {
//   const waveformRef = useRef(null);
//   const wavesurfer = useRef(null);
//   const [playing, setPlay] = useState(false);
//   const [volume, setVolume] = useState(0.5);

//   // create new WaveSurfer instance
//   // On component mount and when url changes
//   useEffect(() => {
//     setPlay(false);

//     const options = formWaveSurferOptions(waveformRef.current);
//     wavesurfer.current = WaveSurfer.create(options);

//     wavesurfer.current.load(url);

//     wavesurfer.current.on("ready", function() {
//       // https://wavesurfer-js.org/docs/methods.html
//       // wavesurfer.current.play();
//       // setPlay(true);
    
//       // make sure object stillavailable when file loaded
//       if (wavesurfer.current) {
//         wavesurfer.current.setVolume(volume);
//         setVolume(volume);
//       }
//     });

//     // Removes events, elements and disconnects Web Audio nodes.
//     // when component unmount
//     return () => wavesurfer.current.destroy();
//   }, [url]);

//   const handlePlayPause = () => {
//     setPlay(!playing);
//     wavesurfer.current.playPause();
//   };

//   const onVolumeChange = e => {
//     const { target } = e;
//     const newVolume = +target.value;

//     if (newVolume) {
//       setVolume(newVolume);
//       wavesurfer.current.setVolume(newVolume || 1);
//     }
//   };

//   return (
//     <div>
//       <div id="waveform" ref={waveformRef} />
      
//     </div>
//   );
// }
