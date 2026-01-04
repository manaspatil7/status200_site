import type { THREE } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      points: any;
      bufferGeometry: any;
      bufferAttribute: any;
      pointsMaterial: any;
      mesh: any;
      icosahedronGeometry: any;
      meshBasicMaterial: any;
      color: any;
      fog: any;
      ambientLight: any;
      pointLight: any;
    }
  }
}
