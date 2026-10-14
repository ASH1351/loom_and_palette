import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroFabricSceneProps {
  className?: string;
}

export const HeroFabricScene: React.FC<HeroFabricSceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isLowPower, setIsLowPower] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    // Determine if mobile/low power
    const isMobileDevice = window.innerWidth < 768;
    setIsLowPower(isMobileDevice);

    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobileDevice,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileDevice ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Luxury Lights
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.4);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xc9a96e, 2.5);
    goldKeyLight.position.set(5, 6, 4);
    scene.add(goldKeyLight);

    const roseFillLight = new THREE.DirectionalLight(0xd8b4a6, 2.0);
    roseFillLight.position.set(-5, -4, 3);
    scene.add(roseFillLight);

    const pointLight = new THREE.PointLight(0xffeedd, 3, 20);
    pointLight.position.set(0, 2, 5);
    scene.add(pointLight);

    // Create Silk Fabric Cloth Ribbon Mesh
    const ribbonSegmentsX = isMobileDevice ? 40 : 70;
    const ribbonSegmentsY = isMobileDevice ? 40 : 70;
    const geometry = new THREE.PlaneGeometry(8, 5.5, ribbonSegmentsX, ribbonSegmentsY);

    // Silk Material with Champagne Gold / Soft Rose Reflections
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xf5eee6,
      emissive: 0x221a10,
      roughness: 0.28,
      metalness: 0.15,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      transmission: 0.05,
      ior: 1.45,
      side: THREE.DoubleSide,
      wireframe: false,
    });

    const fabricMesh = new THREE.Mesh(geometry, material);
    fabricMesh.rotation.x = -0.3;
    fabricMesh.rotation.y = 0.15;
    scene.add(fabricMesh);

    // Secondary Silk Ribbon Swirl
    const ribbonGeo = new THREE.TorusKnotGeometry(2.2, 0.22, isMobileDevice ? 64 : 100, 16, 2, 3);
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0xc9a96e,
      roughness: 0.35,
      metalness: 0.5,
      clearcoat: 0.9,
      side: THREE.DoubleSide,
    });
    const swirlMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    swirlMesh.position.set(0.5, -0.2, -1.2);
    swirlMesh.scale.set(0.8, 0.8, 0.8);
    scene.add(swirlMesh);

    // Original vertex positions for wave displacement
    const posAttribute = geometry.attributes.position;
    const initialPositions = posAttribute.array.slice();

    // Mouse & Touch Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        targetMouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        targetMouseY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // IntersectionObserver to pause rendering when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Pause rendering if hero is off-screen

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Silk Fabric wave simulation
      const positions = posAttribute.array;
      const count = posAttribute.count;

      for (let i = 0; i < count; i++) {
        const u = initialPositions[i * 3];
        const v = initialPositions[i * 3 + 1];

        // Complex fluid multi-frequency sine wave
        const wave1 = Math.sin(u * 1.2 + elapsedTime * 1.4) * 0.45;
        const wave2 = Math.cos(v * 1.6 + elapsedTime * 1.1) * 0.35;
        const wave3 = Math.sin((u + v) * 0.8 + elapsedTime * 1.8) * 0.25;

        // Interactive mouse ripple influence
        const distFromCursor = Math.hypot(u - mouseX * 3.5, v - mouseY * 2.5);
        const mouseRipple = Math.sin(distFromCursor * 2.5 - elapsedTime * 3) * Math.exp(-distFromCursor * 0.6) * 0.4;

        positions[i * 3 + 2] = wave1 + wave2 + wave3 + mouseRipple;
      }
      posAttribute.needsUpdate = true;
      geometry.computeVertexNormals();

      // Gentle floating rotations
      fabricMesh.rotation.z = Math.sin(elapsedTime * 0.3) * 0.06 + mouseX * 0.12;
      fabricMesh.rotation.y = 0.15 + mouseY * 0.15;

      swirlMesh.rotation.x = elapsedTime * 0.25;
      swirlMesh.rotation.y = elapsedTime * 0.35 + mouseX * 0.3;
      swirlMesh.position.y = -0.2 + Math.sin(elapsedTime * 0.8) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      ribbonGeo.dispose();
      ribbonMat.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {/* Three.js Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Graceful 2D Fallback if WebGL is unsupported or disabled */}
      {!webglSupported && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2] via-[#F3EBE0] to-[#E9DFD2] opacity-80 flex items-center justify-center">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#C9A96E]/15 blur-3xl animate-pulse" />
          <div className="absolute w-[450px] h-[450px] rounded-full bg-[#D8B4A6]/20 blur-2xl" />
        </div>
      )}

      {/* Subtle Luxury Gradient Overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF7F2]/30 to-[#FAF7F2] pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#FAF7F2]/60 pointer-events-none" />
    </div>
  );
};
