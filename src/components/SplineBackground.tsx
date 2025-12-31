import Spline from '@splinetool/react-spline';

export default function SplineBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Spline
        scene="https://prod.spline.design/UY8rDNeHhJNWxTLH/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}
