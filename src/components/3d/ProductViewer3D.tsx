import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Sun, Sparkles, Layers, RefreshCw } from 'lucide-react';
import { Product } from '../../types';

interface ProductViewer3DProps {
  product: Product;
  className?: string;
}

export const ProductViewer3D: React.FC<ProductViewer3DProps> = ({ product, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'runway' | 'atelier'>('studio');
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [currentAngleDeg, setCurrentAngleDeg] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // References to three objects for runtime state updates
  const sceneRef = useRef<THREE.Scene | null>(null);
  const garmentGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.PointLight(0xc9a96e, 2.2, 10);
    fillLight.position.set(-3, 1, 2);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    const rimLight = new THREE.DirectionalLight(0xd8b4a6, 1.6);
    rimLight.position.set(0, -3, -2);
    scene.add(rimLight);

    // Garment Group containing the luxury mannequin silhouette & sculpted dress form
    const garmentGroup = new THREE.Group();
    scene.add(garmentGroup);
    garmentGroupRef.current = garmentGroup;

    // Pedestal base
    const pedestalGeo = new THREE.CylinderGeometry(1.2, 1.3, 0.12, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      metalness: 0.85,
      roughness: 0.2,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.65;
    garmentGroup.add(pedestal);

    // Gold pedestal accent ring
    const ringGeo = new THREE.TorusGeometry(1.22, 0.02, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xc9a96e,
      metalness: 0.9,
      roughness: 0.15,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.59;
    garmentGroup.add(ring);

    // Torso Couture Mannequin Body
    const torsoGeo = new THREE.CylinderGeometry(0.48, 0.65, 1.8, 36, 16);
    const primaryHex = product.colors[0]?.hex
      ? parseInt(product.colors[0].hex.replace('#', '0x'), 16)
      : 0xd8b4a6;

    const fabricMat = new THREE.MeshPhysicalMaterial({
      color: primaryHex,
      roughness: 0.35,
      metalness: 0.15,
      clearcoat: 0.6,
      clearcoatRoughness: 0.3,
      side: THREE.DoubleSide,
    });
    materialRef.current = fabricMat;

    const torso = new THREE.Mesh(torsoGeo, fabricMat);
    torso.position.y = -0.3;
    garmentGroup.add(torso);

    // Flared Silhouette Skirt / Peplum drape
    const skirtGeo = new THREE.ConeGeometry(0.95, 1.3, 36, 16, true);
    const skirt = new THREE.Mesh(skirtGeo, fabricMat);
    skirt.position.y = -1.0;
    garmentGroup.add(skirt);

    // Champagne Zari Border Ring at hem
    const zariBorderGeo = new THREE.TorusGeometry(0.95, 0.025, 16, 48);
    const zariMat = new THREE.MeshStandardMaterial({
      color: 0xc9a96e,
      metalness: 0.95,
      roughness: 0.15,
    });
    const zariBorder = new THREE.Mesh(zariBorderGeo, zariMat);
    zariBorder.rotation.x = Math.PI / 2;
    zariBorder.position.y = -1.6;
    garmentGroup.add(zariBorder);

    // Neckline & Shoulder Accents
    const collarGeo = new THREE.TorusGeometry(0.35, 0.03, 16, 32);
    const collar = new THREE.Mesh(collarGeo, zariMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 0.62;
    garmentGroup.add(collar);

    // Floating Stole / Dupatta Silk Ribbon drape
    const stoleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.7, 0.5, 0.2),
      new THREE.Vector3(-0.5, 0.1, 0.5),
      new THREE.Vector3(0.1, -0.4, 0.6),
      new THREE.Vector3(0.6, -0.9, 0.3),
      new THREE.Vector3(0.8, -1.4, -0.1),
    ]);
    const stoleGeo = new THREE.TubeGeometry(stoleCurve, 40, 0.09, 12, false);
    const stoleMat = new THREE.MeshPhysicalMaterial({
      color: 0xc9a96e,
      metalness: 0.4,
      roughness: 0.3,
      clearcoat: 0.8,
    });
    const stole = new THREE.Mesh(stoleGeo, stoleMat);
    garmentGroup.add(stole);

    // Interactive Drag Controls (Mouse & Touch)
    let pointerDown = false;
    let prevPointerX = 0;
    let velocityX = 0;

    const onPointerDown = (clientX: number) => {
      pointerDown = true;
      setIsDragging(true);
      prevPointerX = clientX;
      velocityX = 0;
    };

    const onPointerMove = (clientX: number) => {
      if (!pointerDown || !garmentGroupRef.current) return;
      const deltaX = clientX - prevPointerX;
      garmentGroupRef.current.rotation.y += deltaX * 0.012;
      velocityX = deltaX * 0.012;
      prevPointerX = clientX;
      
      const deg = Math.round(((garmentGroupRef.current.rotation.y % (Math.PI * 2)) * 180) / Math.PI);
      setCurrentAngleDeg(deg >= 0 ? deg : 360 + deg);
    };

    const onPointerUp = () => {
      pointerDown = false;
      setIsDragging(false);
    };

    // DOM event listeners on the container
    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX);
    const handleMouseUp = () => onPointerUp();

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) onPointerDown(e.touches[0].clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) onPointerMove(e.touches[0].clientX);
    };
    const handleTouchEnd = () => onPointerUp();

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Render Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (garmentGroupRef.current) {
        // Friction damping when dragged
        if (!pointerDown && Math.abs(velocityX) > 0.0005) {
          garmentGroupRef.current.rotation.y += velocityX;
          velocityX *= 0.92;
        }

        // Automatic idle slow rotation if enabled
        if (isRotating && !pointerDown && Math.abs(velocityX) < 0.001) {
          garmentGroupRef.current.rotation.y += 0.006;
          const deg = Math.round(((garmentGroupRef.current.rotation.y % (Math.PI * 2)) * 180) / Math.PI);
          setCurrentAngleDeg(deg >= 0 ? deg : 360 + deg);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      pedestalGeo.dispose();
      pedestalMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      torsoGeo.dispose();
      fabricMat.dispose();
      skirtGeo.dispose();
      zariBorderGeo.dispose();
      zariMat.dispose();
      collarGeo.dispose();
      stoleGeo.dispose();
      stoleMat.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [product, isRotating]);

  // Lighting preset switcher
  useEffect(() => {
    if (!keyLightRef.current || !fillLightRef.current) return;
    if (lightingPreset === 'studio') {
      keyLightRef.current.color.setHex(0xffffff);
      keyLightRef.current.intensity = 2.8;
      fillLightRef.current.color.setHex(0xc9a96e);
    } else if (lightingPreset === 'runway') {
      keyLightRef.current.color.setHex(0xffdfba);
      keyLightRef.current.intensity = 3.4;
      fillLightRef.current.color.setHex(0xff9977);
    } else {
      // Atelier Ambient
      keyLightRef.current.color.setHex(0xfaf7f2);
      keyLightRef.current.intensity = 2.0;
      fillLightRef.current.color.setHex(0xd8b4a6);
    }
  }, [lightingPreset]);

  // Wireframe toggle
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.wireframe = wireframeMode;
    }
  }, [wireframeMode]);

  // Zoom control
  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const newZoom = direction === 'in' ? Math.max(0.6, zoomLevel - 0.15) : Math.min(1.4, zoomLevel + 0.15);
    setZoomLevel(newZoom);
    cameraRef.current.position.z = 4.2 * newZoom;
  };

  const snapToAngle = (degrees: number) => {
    if (!garmentGroupRef.current) return;
    const rad = (degrees * Math.PI) / 180;
    garmentGroupRef.current.rotation.y = rad;
    setCurrentAngleDeg(degrees);
  };

  return (
    <div className={`relative w-full h-[380px] sm:h-[480px] bg-gradient-to-b from-[#FAF7F2] to-[#F2ECE1] rounded-2xl overflow-hidden border border-[#E8E2D9] ${className}`}>
      {/* 3D Canvas element */}
      <div 
        ref={containerRef} 
        className={`w-full h-full cursor-grab active:cursor-grabbing ${isDragging ? 'cursor-grabbing' : ''}`}
        title="Drag or swipe to rotate 360°"
      />

      {/* Floating 360 Degree Indicator */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#C9A96E]/30 text-xs font-medium text-[#0B0B0B] shadow-sm">
        <RotateCw className={`w-3.5 h-3.5 text-[#C9A96E] ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        <span>360° Luxury Drape: <strong className="font-serif">{currentAngleDeg}°</strong></span>
      </div>

      {/* Angle Quick-Snap Buttons */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-white/80 backdrop-blur-md p-1 rounded-full border border-[#E8E2D9] shadow-sm">
        <button
          onClick={() => snapToAngle(0)}
          className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-[#0B0B0B] hover:bg-[#C9A96E] hover:text-white transition-colors"
        >
          Front
        </button>
        <button
          onClick={() => snapToAngle(90)}
          className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-[#0B0B0B] hover:bg-[#C9A96E] hover:text-white transition-colors"
        >
          Side
        </button>
        <button
          onClick={() => snapToAngle(180)}
          className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-[#0B0B0B] hover:bg-[#C9A96E] hover:text-white transition-colors"
        >
          Back
        </button>
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/85 backdrop-blur-md border border-[#E8E2D9] shadow-md">
        {/* Rotation & Wireframe Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
              isRotating ? 'bg-[#0B0B0B] text-white border-[#0B0B0B]' : 'bg-white text-[#6B6B6B] border-[#E8E2D9] hover:border-[#C9A96E]'
            }`}
            title={isRotating ? 'Pause auto-spin' : 'Start auto-spin'}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isRotating ? 'Pause' : 'Auto-Spin'}</span>
          </button>

          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
              wireframeMode ? 'bg-[#C9A96E] text-white border-[#C9A96E]' : 'bg-white text-[#6B6B6B] border-[#E8E2D9] hover:border-[#C9A96E]'
            }`}
            title="Inspect artisanal weave structure"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Weave Mesh</span>
          </button>
        </div>

        {/* Lighting Atmosphere switcher */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-semibold mr-1 hidden md:inline">Light:</span>
          {(['studio', 'runway', 'atelier'] as const).map((preset) => (
            <button
              key={preset}
              onClick={() => setLightingPreset(preset)}
              className={`px-2 py-1 rounded text-[11px] capitalize transition-all ${
                lightingPreset === preset
                  ? 'bg-[#0B0B0B] text-[#C9A96E] font-medium'
                  : 'text-[#6B6B6B] hover:text-[#0B0B0B]'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleZoom('in')}
            className="p-1.5 rounded-lg bg-white border border-[#E8E2D9] text-[#0B0B0B] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="p-1.5 rounded-lg bg-white border border-[#E8E2D9] text-[#0B0B0B] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Touch swipe hint overlay for mobile */}
      <div className="absolute inset-x-0 bottom-16 pointer-events-none flex justify-center sm:hidden">
        <span className="px-3 py-1 rounded-full bg-black/40 text-white/90 text-[10px] backdrop-blur-sm">
          Swipe horizontally to rotate 360°
        </span>
      </div>
    </div>
  );
};
