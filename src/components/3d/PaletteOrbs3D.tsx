import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useShop } from '../../context/ShopContext';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ColorOrbData {
  name: string;
  hex: string;
  desc: string;
  count: number;
}

const PALETTE_DATA: ColorOrbData[] = [
  { name: 'Champagne Gold', hex: '#C9A96E', desc: 'Zari weaves & regal metallic accents', count: 6 },
  { name: 'Rose Blush', hex: '#D8B4A6', desc: 'Poetic florals & gentle silk chiffon', count: 5 },
  { name: 'Onyx Black', hex: '#0B0B0B', desc: 'Timeless luxury & structured contrast', count: 5 },
  { name: 'Warm Ivory', hex: '#FAF7F2', desc: 'Pure chanderi & handloom mulmul base', count: 4 },
  { name: 'Forest Sage', hex: '#7A8471', desc: 'Artisanal earth tones & botanical dyes', count: 3 },
  { name: 'Royal Emerald', hex: '#1F4E3B', desc: 'Opulent festive velvet & deep jewel tones', count: 3 },
];

export const PaletteOrbs3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateTo, setFilterColor } = useShop();
  const [activeColor, setActiveColor] = useState<ColorOrbData>(PALETTE_DATA[0]);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xc9a96e, 2.0, 15);
    fillLight.position.set(-4, -2, 4);
    scene.add(fillLight);

    // Raycaster for interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Create 3D Orbs arranged in an elliptical luxury arc
    const orbsGroup = new THREE.Group();
    scene.add(orbsGroup);

    const sphereGeo = new THREE.SphereGeometry(0.72, isMobile ? 32 : 64, isMobile ? 32 : 64);
    const orbMeshes: THREE.Mesh[] = [];

    PALETTE_DATA.forEach((color, index) => {
      const angle = (index / PALETTE_DATA.length) * Math.PI * 2;
      const radiusX = isMobile ? 2.2 : 3.2;
      const radiusY = isMobile ? 1.0 : 1.4;

      const hexNum = parseInt(color.hex.replace('#', '0x'), 16);
      const isBlack = color.name.includes('Black');
      const isIvory = color.name.includes('Ivory');

      const orbMat = new THREE.MeshPhysicalMaterial({
        color: hexNum,
        roughness: isBlack ? 0.15 : 0.25,
        metalness: isBlack ? 0.4 : isIvory ? 0.1 : 0.35,
        clearcoat: 0.9,
        clearcoatRoughness: 0.15,
        reflectivity: 0.9,
        ior: 1.5,
      });

      const mesh = new THREE.Mesh(sphereGeo, orbMat);
      mesh.position.set(
        Math.cos(angle) * radiusX,
        Math.sin(angle) * radiusY,
        Math.sin(angle * 2) * 0.4
      );
      mesh.userData = { colorData: color, baseScale: 1, basePos: mesh.position.clone() };

      // Gold halo ring for each orb
      const ringGeo = new THREE.TorusGeometry(0.85, 0.015, 12, 48);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xc9a96e,
        metalness: 0.9,
        roughness: 0.2,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      ring.rotation.y = angle;
      mesh.add(ring);

      orbsGroup.add(mesh);
      orbMeshes.push(mesh);
    });

    // Handle mouse move & raycasting
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = mouse.x;
      mouseY = mouse.y;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(orbMeshes);

      if (intersects.length > 0) {
        container.style.cursor = 'pointer';
        setIsHovering(true);
        const hoveredMesh = intersects[0].object as THREE.Mesh;
        const data = hoveredMesh.userData.colorData as ColorOrbData;
        if (data) {
          setActiveColor(data);
        }
      } else {
        container.style.cursor = 'default';
        setIsHovering(false);
      }
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(orbMeshes);
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const data = clickedMesh.userData.colorData as ColorOrbData;
        if (data) {
          setFilterColor(data.name);
          navigateTo('shop', { color: data.name });
        }
      }
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('click', onClick);

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Visibility toggle
    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    observer.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Gentle orbital spin
      orbsGroup.rotation.y = elapsed * 0.12 + mouseX * 0.2;
      orbsGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.08 + mouseY * 0.1;

      // Individual floating breathing effect
      orbMeshes.forEach((mesh, i) => {
        mesh.position.y = mesh.userData.basePos.y + Math.sin(elapsed * 1.5 + i) * 0.08;
        mesh.rotation.y = elapsed * 0.5;

        // Scale up active or hovered orb
        const isCurrentActive = mesh.userData.colorData.name === activeColor.name;
        const targetScale = isCurrentActive ? 1.22 : 1.0;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);

      sphereGeo.dispose();
      orbMeshes.forEach((m) => {
        (m.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeColor]);

  const handleSelectFilter = (color: ColorOrbData) => {
    setActiveColor(color);
    setFilterColor(color.name);
    navigateTo('shop', { color: color.name });
  };

  return (
    <div className="relative w-full py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-[#C9A96E] font-medium tracking-[0.25em] text-xs uppercase flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Artisanal Palette
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0B0B0B]">
          Explore by Shaded Emotion
        </h2>
        <p className="mt-3 text-[#6B6B6B] text-sm sm:text-base max-w-xl mx-auto font-light">
          Every dye is hand-formulated using conscious botanical pigments and heritage mineral baths. Hover or click an orb to curate your wardrobe.
        </p>
      </div>

      {/* 3D Canvas Container */}
      <div className="relative w-full h-[380px] sm:h-[450px] rounded-3xl bg-gradient-to-b from-white/60 to-[#FAF7F2]/40 backdrop-blur-md border border-[#E8E2D9] overflow-hidden shadow-sm">
        <div ref={containerRef} className="w-full h-full" />

        {/* Dynamic Color Card Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-md p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-[#C9A96E]/40 shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="w-7 h-7 rounded-full shadow-inner border border-white"
                style={{ backgroundColor: activeColor.hex }}
              />
              <div>
                <h4 className="font-serif text-lg text-[#0B0B0B] font-semibold flex items-center gap-2">
                  {activeColor.name}
                  <span className="text-[11px] font-sans font-normal text-[#6B6B6B] bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#E8E2D9]">
                    {activeColor.count} Designs
                  </span>
                </h4>
                <p className="text-xs text-[#6B6B6B]">{activeColor.desc}</p>
              </div>
            </div>

            <button
              onClick={() => handleSelectFilter(activeColor)}
              className="px-4 py-2 rounded-full bg-[#0B0B0B] text-white hover:bg-[#C9A96E] transition-all text-xs font-medium flex items-center gap-1.5 shadow-sm group shrink-0"
            >
              <span>View</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Swatch Quick Selector Pills */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E8E2D9]">
          {PALETTE_DATA.map((color) => (
            <button
              key={color.name}
              onClick={() => setActiveColor(color)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all ${
                activeColor.name === color.name
                  ? 'bg-[#0B0B0B] text-white font-medium shadow-sm'
                  : 'text-[#6B6B6B] hover:text-[#0B0B0B]'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
              <span>{color.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
