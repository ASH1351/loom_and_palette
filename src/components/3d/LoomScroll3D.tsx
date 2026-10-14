import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface StageInfo {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
}

const STAGES: StageInfo[] = [
  {
    number: '01',
    title: 'The Raw Silk & Real Zari Thread',
    subtitle: 'From Mulberry Cocoons to Gilded Spindles',
    description: 'We source organic mulberry filaments and pure metallic tilla zari threads spun in ancient Varanasi ateliers. Each delicate strand possesses extraordinary tensile strength and natural luminous sheen.',
    detail: 'Tensile-tested 100% natural mulberry silk with 98.5% pure silver tilla electroplated in 24k champagne gold.',
  },
  {
    number: '02',
    title: 'The Handloom Warp & Weft Interlace',
    subtitle: 'Rhythmic Craft of Master Weavers',
    description: 'On traditional wooden fly-shuttle handlooms in Maheshwar and Banaras, our generational artisans weave 120 threads per inch. No high-speed industrial shortcuts — only mindful human touch and heritage artistry.',
    detail: '32 to 48 hours of artisanal hand-weaving per garment piece, preserving UNESCO-recognized loom traditions.',
  },
  {
    number: '03',
    title: 'The Inclusive Couture Drape',
    subtitle: 'Engineered Proportions: XS to 4XL',
    description: 'Unlike mass-fashion brands that simply multiply measurements uniformly, Vaishnavi hand-grades every single silhouette individually. Armholes, bust depth, waist contouring and hip flare are sculpted to empower every woman.',
    detail: 'Over 8 dedicated fitting rounds across real women in sizes XS, M, 2XL, and 4XL before pattern finalization.',
  },
];

export const LoomScroll3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0);

  // References for Three.js manipulation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const stageGroupRef = useRef<THREE.Group | null>(null);
  const threadMeshRef = useRef<THREE.Mesh | null>(null);
  const loomGridRef = useRef<THREE.Group | null>(null);
  const garmentMeshRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xc9a96e, 3.0);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd8b4a6, 2.0);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    stageGroupRef.current = rootGroup;

    // --- STAGE 0: Spindle & Spiral Thread ---
    const threadGroup = new THREE.Group();
    rootGroup.add(threadGroup);

    // Spindle wooden core
    const spindleGeo = new THREE.CylinderGeometry(0.35, 0.45, 3.2, 32);
    const spindleMat = new THREE.MeshStandardMaterial({
      color: 0x3a2e28,
      roughness: 0.8,
    });
    const spindle = new THREE.Mesh(spindleGeo, spindleMat);
    threadGroup.add(spindle);

    // Golden thread coil wound around spindle
    const coilPoints: THREE.Vector3[] = [];
    for (let t = 0; t < Math.PI * 16; t += 0.25) {
      const radius = 0.58 + Math.sin(t * 0.5) * 0.05;
      const x = Math.cos(t) * radius;
      const y = (t / (Math.PI * 16)) * 2.4 - 1.2;
      const z = Math.sin(t) * radius;
      coilPoints.push(new THREE.Vector3(x, y, z));
    }
    const coilGeo = new THREE.BufferGeometry().setFromPoints(coilPoints);
    const coilMat = new THREE.LineBasicMaterial({
      color: 0xc9a96e,
      linewidth: 2,
    });
    const coilLine = new THREE.Line(coilGeo, coilMat);
    threadGroup.add(coilLine);

    // Luminous thread spiral
    const spiralGeo = new THREE.TorusKnotGeometry(1.4, 0.08, 100, 16, 3, 5);
    const spiralMat = new THREE.MeshPhysicalMaterial({
      color: 0xc9a96e,
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 0.8,
    });
    const spiral = new THREE.Mesh(spiralGeo, spiralMat);
    spiral.scale.set(0.9, 0.9, 0.9);
    threadGroup.add(spiral);
    threadMeshRef.current = spiral;

    // --- STAGE 1: Loom Grid Interlace (Warp & Weft) ---
    const loomGroup = new THREE.Group();
    rootGroup.add(loomGroup);
    loomGridRef.current = loomGroup;

    // Warp threads (vertical)
    const warpMat = new THREE.MeshPhysicalMaterial({
      color: 0xc9a96e,
      roughness: 0.4,
      metalness: 0.5,
    });
    const weftMat = new THREE.MeshPhysicalMaterial({
      color: 0xd8b4a6,
      roughness: 0.3,
      metalness: 0.2,
    });

    const threadCount = isMobile ? 10 : 16;
    for (let i = 0; i < threadCount; i++) {
      const offset = (i / (threadCount - 1)) * 3.6 - 1.8;
      // Vertical warp thread
      const warpGeo = new THREE.CylinderGeometry(0.025, 0.025, 3.6, 8);
      const warp = new THREE.Mesh(warpGeo, warpMat);
      warp.position.x = offset;
      warp.position.z = Math.sin(i) * 0.05;
      loomGroup.add(warp);

      // Horizontal weft thread
      const weftGeo = new THREE.CylinderGeometry(0.025, 0.025, 3.6, 8);
      const weft = new THREE.Mesh(weftGeo, weftMat);
      weft.rotation.z = Math.PI / 2;
      weft.position.y = offset;
      weft.position.z = Math.cos(i) * 0.05;
      loomGroup.add(weft);
    }

    // Handloom frame border
    const frameGeo = new THREE.BoxGeometry(4.0, 4.0, 0.15);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1f1a17,
      roughness: 0.7,
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.z = -0.15;
    loomGroup.add(frame);

    // --- STAGE 2: Finished Couture Silhouette ---
    const garmentGroup = new THREE.Group();
    rootGroup.add(garmentGroup);
    garmentMeshRef.current = garmentGroup;

    const silhouetteGeo = new THREE.ConeGeometry(1.4, 3.0, 32, 16, true);
    const silkMat = new THREE.MeshPhysicalMaterial({
      color: 0xd8b4a6,
      roughness: 0.3,
      metalness: 0.2,
      clearcoat: 0.7,
      side: THREE.DoubleSide,
    });
    const silhouette = new THREE.Mesh(silhouetteGeo, silkMat);
    silhouette.position.y = -0.3;
    garmentGroup.add(silhouette);

    const goldTrimGeo = new THREE.TorusGeometry(1.4, 0.04, 16, 48);
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xc9a96e,
      metalness: 0.9,
      roughness: 0.2,
    });
    const goldTrim = new THREE.Mesh(goldTrimGeo, goldTrimMat);
    goldTrim.rotation.x = Math.PI / 2;
    goldTrim.position.y = -1.78;
    garmentGroup.add(goldTrim);

    // Initial visibility state based on active stage
    threadGroup.visible = activeStage === 0;
    loomGroup.visible = activeStage === 1;
    garmentGroup.visible = activeStage === 2;

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

    // Visibility observer
    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        isVisible = e.isIntersecting;
      });
    }, { threshold: 0.1 });
    observer.observe(container);

    let clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      if (threadGroup.visible) {
        threadGroup.rotation.y = elapsed * 0.6;
        if (threadMeshRef.current) {
          threadMeshRef.current.rotation.x = elapsed * 0.4;
          threadMeshRef.current.rotation.z = elapsed * 0.3;
        }
      }

      if (loomGroup.visible) {
        loomGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.2;
        loomGroup.rotation.x = Math.cos(elapsed * 0.4) * 0.15;
      }

      if (garmentGroup.visible) {
        garmentGroup.rotation.y = elapsed * 0.5;
        garmentGroup.position.y = Math.sin(elapsed * 0.8) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);

      spindleGeo.dispose();
      spindleMat.dispose();
      coilGeo.dispose();
      coilMat.dispose();
      spiralGeo.dispose();
      spiralMat.dispose();
      warpMat.dispose();
      weftMat.dispose();
      frameGeo.dispose();
      frameMat.dispose();
      silhouetteGeo.dispose();
      silkMat.dispose();
      goldTrimGeo.dispose();
      goldTrimMat.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeStage]);

  return (
    <section className="relative w-full py-20 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-10">
        <span className="text-[#C9A96E] font-medium tracking-[0.25em] text-xs uppercase flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Artisanal Genesis
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0B0B0B]">
          Loom to Wardrobe
        </h2>
        <p className="mt-3 text-[#6B6B6B] text-sm sm:text-base max-w-2xl mx-auto font-light">
          Follow the mindful transformation of pure silk and hand-spun zari from ancient wooden looms into luxurious drapes tailored for sizes XS to 4XL.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Stage Viewer */}
        <div className="lg:col-span-7 relative h-[380px] sm:h-[480px] rounded-3xl bg-gradient-to-b from-white/70 via-[#FAF7F2]/50 to-[#EFE7DC]/40 backdrop-blur-md border border-[#E8E2D9] overflow-hidden shadow-sm flex items-center justify-center">
          <div ref={containerRef} className="w-full h-full" />

          {/* Current Stage Indicator */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C9A96E]/40 text-xs font-serif text-[#0B0B0B] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-ping" />
            <span>Artisanal Phase {STAGES[activeStage].number} of 03</span>
          </div>
        </div>

        {/* Right: Interactive Craft Story Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {STAGES.map((stage, idx) => {
            const isCurrent = activeStage === idx;
            return (
              <div
                key={stage.number}
                onClick={() => setActiveStage(idx)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isCurrent
                    ? 'bg-white border-[#C9A96E] shadow-xl translate-x-1 sm:translate-x-2'
                    : 'bg-white/50 border-[#E8E2D9] hover:bg-white/80 hover:border-[#C9A96E]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-serif text-2xl font-bold ${isCurrent ? 'text-[#C9A96E]' : 'text-[#6B6B6B]/60'}`}>
                    {stage.number}
                  </span>
                  {isCurrent && (
                    <span className="text-[11px] uppercase tracking-wider text-[#C9A96E] font-medium bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#C9A96E]/30">
                      Active Stage
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-serif text-[#0B0B0B] font-semibold mb-1">
                  {stage.title}
                </h3>
                <p className="text-xs text-[#C9A96E] font-medium mb-2.5">
                  {stage.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-3 font-light">
                  {stage.description}
                </p>

                {isCurrent && (
                  <div className="pt-3 border-t border-[#FAF7F2] text-xs text-[#0B0B0B] font-medium flex items-start gap-2 bg-[#FAF7F2]/60 p-2.5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                    <span>{stage.detail}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
