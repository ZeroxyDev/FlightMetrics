import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";


type CobeProps = {
    originCords?: {lat : number, long: number};
    arrivalCords?: {lat : number, long: number};
    alternateCords?: {lat : number, long: number};
}
export function Cobe({ originCords, arrivalCords, alternateCords }: CobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef<number>(0);
  const springRef = useRef<number>(0);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();

// @ts-ignore
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [120 / 255, 120 / 255, 120 / 255],
      markerColor: [255 / 255, 255 / 255, 255 / 255],
      glowColor: [1.2, 1.2, 1.2],
      markers: [
        { location: [originCords?.lat, originCords?.long], size: 0.1},
        { location: [arrivalCords?.lat, arrivalCords?.long], size: 0.1},
        { location: [alternateCords?.lat, alternateCords?.long], size: 0.05},
      ],
      onRender: (state: { phi: number; width: number; height: number }) => {
        // This prevents rotation while dragging
        if (!pointerInteracting.current) {
          // Called on every animation frame.
          // `state` will be an empty object, return updated params.
          phi += 0.002;
        } 
        state.phi = phi + springRef.current;
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    setTimeout(() => canvasRef.current!.style.opacity = '1');

    return () => { 
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      maxWidth: 400,
      aspectRatio: 1,
      margin: 'auto',
      position: 'relative',
    }}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current!;
          canvasRef.current!.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            springRef.current = delta / 200;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            springRef.current = delta / 100;
          }
        }}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: 0,
          transition: 'opacity 1s ease',
        }}
      />
    </div>
  );
}
