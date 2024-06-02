import { View } from 'react-native';
import React from 'react';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, TextureLoader } from 'expo-three';
import { THREE } from 'expo-three';
import { GLTFLoader } from 'three-stdlib';
// import modelFile from '../../public/models/capybara/scene.gltf'; // Import the model file

const FarmTab = () => {
  // const [camera, setCamera] = React.useState(null);
  // const [prevTouch, setPrevTouch] = React.useState(null);
  // const [model, setModel] = React.useState(null);

  // const onContextCreate = async (gl) => {
  //   const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  //   const renderer = new Renderer({ gl });
  //   renderer.setSize(width, height);
  //   renderer.setClearColor(0xffffff);

  //   const ambientLight = new THREE.AmbientLight(0x101010);
  //   scene.add(ambientLight);

  //   const pointLight = new THREE.PointLight(0xffffff, 1, 0);
  //   pointLight.position.set(10, 10, 10);
  //   scene.add(pointLight);

  //   const loader = new GLTFLoader();
  //   loader.parse(modelFile, '', (gltf) => {
  //     const model = gltf.scene;
  //     model.position.set(0, 0, -5); // Move the model back so it's visible
  //     scene.add(model);
  //     setModel(model);
  //   });

  //   setCamera(camera);

  //   const animate = () => {
  //     requestAnimationFrame(animate);
  //     if (model) {
  //       model.rotation.x += 0.01;
  //       model.rotation.y += 0.01;
  //     }
  //     renderer.render(scene, camera);
  //     gl.endFrameEXP();
  //   };
  //   animate();
  // };

  // const onTouchMove = (event) => {
  //   const { touches } = event.nativeEvent;
  //   if (touches.length === 1) {
  //     const touch = touches[0];
  //     if (prevTouch) {
  //       const movementX = touch.pageX - prevTouch.pageX;
  //       const movementY = touch.pageY - prevTouch.pageY;
  //       camera.rotation.x += movementY * 0.01;
  //       camera.rotation.y += movementX * 0.01;
  //     }
  //     setPrevTouch(touch);
  //   }
  // };

  // const onTouchEnd = () => {
  //   setPrevTouch(null);
  // };

  // return (
  //   <View style={{ flex: 1 }}>
  //     <GLView
  //       style={{ flex: 1 }}
  //       onContextCreate={onContextCreate}
  //       onTouchMove={onTouchMove}
  //       onTouchEnd={onTouchEnd}
  //     />
  //   </View>
  // );

  return (
    <>
    </>
  );
};

export default FarmTab;