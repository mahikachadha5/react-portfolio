import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';
import { Effect } from 'postprocessing';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import halftoneFragmentShader from './halftoneFragmentShader.glsl';

const blobVertexShader = `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  varying vec3 vNormal;

  void main() {
    vec3 pos = position;
    float displacement = sin(pos.x * uFrequency + uTime) *
                         sin(pos.y * uFrequency + uTime) *
                         sin(pos.z * uFrequency + uTime) * uAmplitude;
    pos += normal * displacement;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const blobFragmentShader = `
  varying vec3 vNormal;

  void main() {
    float brightness = dot(vNormal, vec3(-0.6, 0.5, 0.8));
    brightness = pow(max(brightness, 0.0), 1.0);
    gl_FragColor = vec4(vec3(brightness), 1.0);
    
  }
`;

class HalftoneEffectImpl extends Effect {
  constructor({ pixelSize = 10.0, offset = true, useLuma = true }) {
    const uniforms = new Map([
      ['pixelSize', new THREE.Uniform(pixelSize)],
      ['offset', new THREE.Uniform(offset)],
      ['useLuma', new THREE.Uniform(useLuma)],
    ]);

    super('CustomDotsEffect', halftoneFragmentShader, { uniforms });

    this.pixelSize = pixelSize;
    this.offset = offset;
    this.useLuma = useLuma;
    this.uniforms = uniforms;
  }

  update(_renderer, _inputBuffer, _deltaTime) {
    this.uniforms.get('pixelSize').value = this.pixelSize;
    this.uniforms.get('offset').value = this.offset;
    this.uniforms.get('useLuma').value = this.useLuma;
  }
}

const CustomHalftoneEffect = wrapEffect(HalftoneEffectImpl);

const Blob = () => {
  const meshRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uFrequency: { value: 1.0 },
    uAmplitude: { value: 0.3 },
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.5, 128]} />
      <shaderMaterial
        vertexShader={blobVertexShader}
        fragmentShader={blobFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Suspense>
        <color attach="background" args={['#000000']} />
        <OrbitControls />
        <Blob />
        <EffectComposer>
          <CustomHalftoneEffect pixelSize={7.0} offset={true} useLuma={true} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};

export default Scene;
