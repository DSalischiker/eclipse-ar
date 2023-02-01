import React, { Suspense, useState } from 'react'
import ReactDOM from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from "@react-three/drei";
import {ARButton, Interactive, XR, Controllers } from '@react-three/xr'
import './App.css'

function Box({ color, size, scale, children, ...rest }) {
  return (
    <mesh scale={scale} {...rest}>
      <boxBufferGeometry args={size} />
      <meshPhongMaterial color={color} />
      {children}
    </mesh>
  )
}

function Button(props) {
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState('blue')

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0)
  }

  return (
    <Interactive onHover={() => setHover(true)} onBlur={() => setHover(false)} onSelect={onSelect}>
      <Box color={color} scale={hover ? [0.6, 0.6, 0.6] : [0.5, 0.5, 0.5]} size={[0.4, 0.1, 0.1]} {...props}>
        <Suspense fallback={null}>
          <Text position={[0, 0, 0.06]} fontSize={0.05} color="#000" anchorX="center" anchorY="middle">
            Hello react-xr!
          </Text>
        </Suspense>
      </Box>
    </Interactive>
  )
}

function App() {
  return (
    <div className="canvas-container">
      <ARButton />
      <Canvas width="100" height="100">
        <XR
          foveation={0}
          referenseSpace="local"
        >
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <Button position={[0, 0.1, -0.2]} />
          {/* <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2, 2, 2]}/>
            <meshStandardMaterial color="red" />
          </mesh> */}
          <Controllers />
        </XR>
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App;
