import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, EyeOff, RotateCw, Maximize2, Sparkles, Box, Disc, Layers } from 'lucide-react';

export type GeometryType = 'vk' | 'sphere' | 'icosahedron' | 'torusKnot' | 'dodecahedron' | 'cyberRings';

// 3D floating destination waypoints for each section
const SECTION_WAYPOINTS: Record<string, { x: number; y: number; z: number; scale: number }> = {
  hero: { x: 0.0, y: 0.0, z: 0.2, scale: 1.0 },
  about: { x: 0.45, y: -0.05, z: 0.15, scale: 0.95 },
  skills: { x: -0.5, y: 0.08, z: 0.18, scale: 0.92 },
  projects: { x: 0.35, y: -0.1, z: 0.2, scale: 0.95 },
  experience: { x: -0.45, y: 0.08, z: 0.18, scale: 0.92 },
  education: { x: 0.0, y: -0.05, z: 0.25, scale: 1.0 },
  achievements: { x: 0.45, y: 0.08, z: 0.15, scale: 0.92 },
  contact: { x: -0.35, y: 0.05, z: 0.2, scale: 0.95 },
};

interface ThreeSceneProps {
  className?: string;
  showControls?: boolean;
  theme?: 'dark' | 'light';
  initialGeometry?: GeometryType;
  activeSection?: string;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  className = '',
  showControls = true,
  theme = 'dark',
  initialGeometry = 'vk',
  activeSection = 'hero',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mainGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // References to individual letters for water wave phase offset
  const vLetterRef = useRef<THREE.Group | null>(null);
  const kLetterRef = useRef<THREE.Group | null>(null);

  const [activeGeometry, setActiveGeometry] = useState<GeometryType>(initialGeometry);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframeOnly, setWireframeOnly] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Mouse interaction tracking
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const manualRotation = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const lastScrollY = useRef(0);

  // Water floating & buoyancy physics refs
  const waterWakeVelocity = useRef(0);
  const waterWakeDisplacement = useRef(0);
  const waterDepthDive = useRef(0);
  const waterDepthCurrent = useRef(0);
  const currentPos = useRef({ x: 0, y: 0, z: 0.2 });
  const currentScale = useRef(1.0);

  const prevSectionRef = useRef<string>(activeSection);

  // Fluid impulse when navigating to a new section (buoyancy wake)
  useEffect(() => {
    if (prevSectionRef.current !== activeSection) {
      waterWakeVelocity.current += 0.05;
      waterDepthDive.current += 0.2;
      prevSectionRef.current = activeSection;
    }
  }, [activeSection]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;
    cameraRef.current = camera;

    // 2. High-performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Central Model Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    mainGroupRef.current = mainGroup;

    // 4. Background Constellation / Particle Field
    const particleCount = 800;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 6 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      particleScales[i] = Math.random();
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2.5, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 1.5, 50);
    pointLight2.position.set(-5, -5, 3);
    scene.add(pointLight2);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Scroll handler for subtle 3D parallax
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Global mouse move handler for 3D parallax tilt even when background is pointer-events-none
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.targetX = x;
      mouse.current.targetY = y;
    };
    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Water floating & section arrival physics for 3D VK letters
      if (mainGroup) {
        // 1. Multi-harmonic Water Surface Wave Simulation (floating in water)
        const waveBob =
          Math.sin(elapsedTime * 1.15) * 0.22 +
          Math.sin(elapsedTime * 2.3 + 1.2) * 0.07 +
          Math.cos(elapsedTime * 3.7) * 0.03;
        const wavePitch =
          Math.sin(elapsedTime * 0.95) * 0.075 + Math.cos(elapsedTime * 1.9) * 0.025;
        const waveRoll =
          Math.cos(elapsedTime * 1.1) * 0.065 + Math.sin(elapsedTime * 2.2) * 0.025;
        const waveYaw = Math.sin(elapsedTime * 0.45) * 0.1;

        // 2. Fluid Wake & Hydrodynamic Scroll Reaction
        const scrollDelta = scrollY.current - lastScrollY.current;
        lastScrollY.current = scrollY.current;

        // Scrolling creates fluid wake: letters dip into water & dive slightly on fast scroll
        waterWakeVelocity.current += scrollDelta * 0.0022;
        waterDepthDive.current += Math.min(Math.abs(scrollDelta) * 0.003, 0.7);

        // Buoyant spring restoration back to water surface (Hooke's law + fluid damping)
        waterWakeDisplacement.current += waterWakeVelocity.current;
        waterWakeVelocity.current +=
          -waterWakeDisplacement.current * 0.07 - waterWakeVelocity.current * 0.14;

        // Depth buoyancy: returns smoothly to surface after scroll ceases
        waterDepthCurrent.current += (waterDepthDive.current - waterDepthCurrent.current) * 0.06;
        waterDepthDive.current *= 0.90;

        // 3. Smooth Section Waypoint Travel (Coming to the sections we go)
        const targetWaypoint =
          SECTION_WAYPOINTS[activeSection] || SECTION_WAYPOINTS.hero;
        currentPos.current.x += (targetWaypoint.x - currentPos.current.x) * 0.035;
        currentPos.current.y += (targetWaypoint.y - currentPos.current.y) * 0.035;
        currentPos.current.z += (targetWaypoint.z - currentPos.current.z) * 0.035;
        currentScale.current += (targetWaypoint.scale - currentScale.current) * 0.035;

        // 4. Position in 3D Space (Floating in water, traveling to each section)
        mainGroup.position.x = currentPos.current.x + mouse.current.x * 0.4;
        mainGroup.position.y =
          currentPos.current.y +
          waveBob -
          waterWakeDisplacement.current -
          mouse.current.y * 0.3;
        mainGroup.position.z = currentPos.current.z - waterDepthCurrent.current;

        // 5. Natural Upright Water Rocking (NO continuous rotation!)
        mainGroup.rotation.x = wavePitch - waterWakeVelocity.current * 0.35 + manualRotation.current.x;
        mainGroup.rotation.y = waveYaw + mouse.current.x * 0.15 + manualRotation.current.y;
        mainGroup.rotation.z = waveRoll - waterWakeVelocity.current * 0.18;

        manualRotation.current.x *= 0.92;
        manualRotation.current.y *= 0.92;

        mainGroup.scale.set(
          currentScale.current,
          currentScale.current,
          currentScale.current
        );

        // 6. Subtle Independent Wave Phase Between "V" and "K"
        if (vLetterRef.current) {
          vLetterRef.current.position.y = Math.sin(elapsedTime * 1.15) * 0.04;
          vLetterRef.current.rotation.z = Math.cos(elapsedTime * 1.1) * 0.02;
        }
        if (kLetterRef.current) {
          kLetterRef.current.position.y = Math.sin(elapsedTime * 1.15 - 0.6) * 0.04;
          kLetterRef.current.rotation.z = Math.cos(elapsedTime * 1.1 - 0.6) * 0.02;
        }
      }

      // Rotate particle cloud slowly
      if (particles) {
        particles.rotation.y = elapsedTime * 0.02;
        particles.rotation.x = elapsedTime * 0.01;
      }

      // Keep camera centered on the middle rolling sphere
      if (camera) {
        camera.position.set(0, 0, 6.5);
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Update Geometry whenever activeGeometry or wireframeOnly changes
  useEffect(() => {
    const mainGroup = mainGroupRef.current;
    if (!mainGroup) return;

    // Clear previous children
    while (mainGroup.children.length > 0) {
      const child = mainGroup.children[0] as THREE.Mesh | THREE.LineSegments | THREE.Points;
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
      mainGroup.remove(child);
    }

    let geom: THREE.BufferGeometry;

    switch (activeGeometry) {
      case 'vk': {
        const isLight = theme === 'light';
        const wireColor = isLight ? 0x111111 : 0xffffff;
        const pointColor = isLight ? 0x000000 : 0xffffff;
        const faceColor = isLight ? 0xf4f4f4 : 0x141414;

        if (particlesRef.current) {
          (particlesRef.current.material as THREE.PointsMaterial).color.setHex(isLight ? 0x333333 : 0xffffff);
        }

        const vkGroup = new THREE.Group();

        // 1. Bold, Architectural 2D Shape for "V"
        const vShape = new THREE.Shape();
        vShape.moveTo(-0.72, 1.1);
        vShape.lineTo(-0.28, 1.1);
        vShape.lineTo(0, -0.42);
        vShape.lineTo(0.28, 1.1);
        vShape.lineTo(0.72, 1.1);
        vShape.lineTo(0.22, -1.1);
        vShape.lineTo(-0.22, -1.1);
        vShape.closePath();

        // 2. Bold, Architectural 2D Shape for "K"
        const kShape = new THREE.Shape();
        kShape.moveTo(-0.65, -1.1);
        kShape.lineTo(-0.65, 1.1);
        kShape.lineTo(-0.22, 1.1);
        kShape.lineTo(-0.22, 0.26);
        kShape.lineTo(0.25, 1.1);
        kShape.lineTo(0.68, 1.1);
        kShape.lineTo(0.0, 0.08);
        kShape.lineTo(0.68, -1.1);
        kShape.lineTo(0.25, -1.1);
        kShape.lineTo(-0.22, -0.12);
        kShape.lineTo(-0.22, -1.1);
        kShape.closePath();

        const extrudeSettings: THREE.ExtrudeGeometryOptions = {
          depth: 0.5,
          bevelEnabled: true,
          bevelSegments: 4,
          steps: 1,
          bevelSize: 0.06,
          bevelThickness: 0.06,
        };

        const vGeom = new THREE.ExtrudeGeometry(vShape, extrudeSettings);
        const kGeom = new THREE.ExtrudeGeometry(kShape, extrudeSettings);
        vGeom.center();
        kGeom.center();

        // Shading Materials for Luxury Extruded Monogram
        const solidMat = new THREE.MeshStandardMaterial({
          color: faceColor,
          roughness: 0.2,
          metalness: isLight ? 0.35 : 0.9,
          transparent: true,
          opacity: wireframeOnly ? 0.0 : (isLight ? 0.9 : 0.85),
        });

        const edgeMat = new THREE.LineBasicMaterial({
          color: wireColor,
          transparent: true,
          opacity: wireframeOnly ? (isLight ? 0.95 : 0.9) : (isLight ? 0.9 : 0.85),
          linewidth: 1,
        });

        const pointsMat = new THREE.PointsMaterial({
          color: pointColor,
          size: 0.075,
          transparent: true,
          opacity: isLight ? 0.95 : 0.95,
        });

        // Letter "V" Assembly (Centered on left)
        const vMesh = new THREE.Mesh(vGeom, solidMat);
        const vEdges = new THREE.LineSegments(new THREE.EdgesGeometry(vGeom, 25), edgeMat);
        const vPoints = new THREE.Points(vGeom, pointsMat);
        const vLetterGroup = new THREE.Group();
        vLetterGroup.add(vMesh, vEdges, vPoints);
        vLetterGroup.position.x = -0.78;
        vkGroup.add(vLetterGroup);
        vLetterRef.current = vLetterGroup;

        // Letter "K" Assembly (Centered on right)
        const kMesh = new THREE.Mesh(kGeom, solidMat);
        const kEdges = new THREE.LineSegments(new THREE.EdgesGeometry(kGeom, 25), edgeMat);
        const kPoints = new THREE.Points(kGeom, pointsMat);
        const kLetterGroup = new THREE.Group();
        kLetterGroup.add(kMesh, kEdges, kPoints);
        kLetterGroup.position.x = 0.74;
        vkGroup.add(kLetterGroup);
        kLetterRef.current = kLetterGroup;

        mainGroup.add(vkGroup);
        return;
      }
      case 'torusKnot':
        geom = new THREE.TorusKnotGeometry(1.6, 0.42, 120, 20);
        break;
      case 'dodecahedron':
        geom = new THREE.DodecahedronGeometry(2.1, 0);
        break;
      case 'sphere': {
        const isLight = theme === 'light';
        const wireColor = isLight ? 0x222222 : 0xffffff;
        const pointColor = isLight ? 0x000000 : 0xffffff;
        const faceColor = isLight ? 0xd5d5d5 : 0x111111;

        if (particlesRef.current) {
          (particlesRef.current.material as THREE.PointsMaterial).color.setHex(isLight ? 0x444444 : 0xffffff);
        }

        const sphereGroup = new THREE.Group();

        // 1. Latitude & Longitude Geodesic Sphere Wireframe
        const sGeom = new THREE.SphereGeometry(2.1, 28, 20);
        const sWireGeom = new THREE.WireframeGeometry(sGeom);
        const sWireMat = new THREE.LineBasicMaterial({
          color: wireColor,
          transparent: true,
          opacity: wireframeOnly ? (isLight ? 0.9 : 0.8) : (isLight ? 0.55 : 0.45),
          linewidth: 1,
        });
        const sWireMesh = new THREE.LineSegments(sWireGeom, sWireMat);
        sphereGroup.add(sWireMesh);

        // 2. Vertex Glowing Points
        const sPointsMat = new THREE.PointsMaterial({
          color: pointColor,
          size: 0.07,
          transparent: true,
          opacity: isLight ? 0.95 : 0.9,
        });
        const sPointsMesh = new THREE.Points(sGeom, sPointsMat);
        sphereGroup.add(sPointsMesh);

        // 3. Equator Ring (clearly indicates horizontal/vertical roll)
        const equatorGeom = new THREE.TorusGeometry(2.12, 0.022, 16, 72);
        const equatorMat = new THREE.MeshBasicMaterial({
          color: wireColor,
          transparent: true,
          opacity: isLight ? 0.85 : 0.75,
        });
        const equatorMesh = new THREE.Mesh(equatorGeom, equatorMat);
        equatorMesh.rotation.x = Math.PI / 2;
        sphereGroup.add(equatorMesh);

        // 4. Prime Meridian Ring (perpendicular ring)
        const meridianGeom = new THREE.TorusGeometry(2.12, 0.022, 16, 72);
        const meridianMesh = new THREE.Mesh(meridianGeom, equatorMat);
        sphereGroup.add(meridianMesh);

        // 5. Translucent inner geometric core (subtle Icosahedron inside)
        const innerGeom = new THREE.IcosahedronGeometry(1.05, 1);
        const innerWire = new THREE.LineSegments(
          new THREE.WireframeGeometry(innerGeom),
          new THREE.LineBasicMaterial({
            color: wireColor,
            transparent: true,
            opacity: isLight ? 0.45 : 0.35,
          })
        );
        sphereGroup.add(innerWire);

        const innerPoints = new THREE.Points(
          innerGeom,
          new THREE.PointsMaterial({ color: pointColor, size: 0.05, transparent: true, opacity: 0.85 })
        );
        sphereGroup.add(innerPoints);

        // 6. Translucent shell faces
        if (!wireframeOnly) {
          const shellMat = new THREE.MeshStandardMaterial({
            color: faceColor,
            roughness: 0.25,
            metalness: isLight ? 0.4 : 0.8,
            transparent: true,
            opacity: isLight ? 0.3 : 0.22,
          });
          const shellMesh = new THREE.Mesh(sGeom, shellMat);
          sphereGroup.add(shellMesh);
        }

        mainGroup.add(sphereGroup);
        return;
      }
      case 'cyberRings': {
        // Multi-ring gyroscope construction
        const ringGroup = new THREE.Group();
        const r1 = new THREE.TorusGeometry(2.2, 0.03, 16, 100);
        const r2 = new THREE.TorusGeometry(1.7, 0.03, 16, 100);
        const r3 = new THREE.TorusGeometry(1.2, 0.03, 16, 100);
        const m1 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.7 });
        const m2 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.5 });
        const m3 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.8 });

        const mesh1 = new THREE.Mesh(r1, m1);
        const mesh2 = new THREE.Mesh(r2, m2);
        const mesh3 = new THREE.Mesh(r3, m3);
        mesh2.rotation.x = Math.PI / 3;
        mesh3.rotation.y = Math.PI / 3;

        ringGroup.add(mesh1, mesh2, mesh3);

        // Core points inside gyroscope
        const innerGeom = new THREE.IcosahedronGeometry(0.7, 1);
        const innerPoints = new THREE.Points(
          innerGeom,
          new THREE.PointsMaterial({ color: 0xffffff, size: 0.06, transparent: true, opacity: 0.9 })
        );
        ringGroup.add(innerPoints);

        mainGroup.add(ringGroup);
        return;
      }
      case 'icosahedron':
      default:
        geom = new THREE.IcosahedronGeometry(2.1, 1);
        break;
    }

    const isLight = theme === 'light';
    const wireColor = isLight ? 0x111111 : 0xffffff;
    const pointColor = isLight ? 0x000000 : 0xffffff;
    const faceColor = isLight ? 0xe5e5e5 : 0x111111;

    // Update background particles color according to theme
    if (particlesRef.current) {
      (particlesRef.current.material as THREE.PointsMaterial).color.setHex(isLight ? 0x333333 : 0xffffff);
    }

    // 1. Outer Wireframe
    const wireframeGeom = new THREE.WireframeGeometry(geom);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: wireColor,
      transparent: true,
      opacity: wireframeOnly ? (isLight ? 0.9 : 0.8) : (isLight ? 0.55 : 0.45),
      linewidth: 1,
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeom, wireframeMat);
    mainGroup.add(wireframeMesh);

    // 2. Vertex Glowing Points
    const pointsMat = new THREE.PointsMaterial({
      color: pointColor,
      size: 0.07,
      transparent: true,
      opacity: isLight ? 0.95 : 0.9,
    });
    const pointsMesh = new THREE.Points(geom, pointsMat);
    mainGroup.add(pointsMesh);

    // 3. Subtle translucent inner faces
    if (!wireframeOnly) {
      const faceMat = new THREE.MeshStandardMaterial({
        color: faceColor,
        roughness: 0.2,
        metalness: isLight ? 0.4 : 0.8,
        transparent: true,
        opacity: isLight ? 0.35 : 0.25,
        wireframe: false,
      });
      const faceMesh = new THREE.Mesh(geom, faceMat);
      mainGroup.add(faceMesh);
    }
  }, [activeGeometry, wireframeOnly, theme]);

  // Pointer interactions for dragging and rotating
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    setIsInteracting(true);
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    mouse.current.targetX = x;
    mouse.current.targetY = y;

    if (isDragging.current) {
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      manualRotation.current.y += deltaX * 0.008;
      manualRotation.current.x += deltaY * 0.008;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setTimeout(() => setIsInteracting(false), 500);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing touch-none ${className}`}
    >
      {/* 3D Scene Controls Dock */}
      {showControls && (
        <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-2 pointer-events-auto">
          {/* Collapsible Geometry & Mode Selector */}
          {isPanelExpanded && (
            <div className="p-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.8)] flex flex-col gap-2.5 animate-in fade-in duration-200">
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/50 px-1 border-b border-white/10 pb-1.5 flex items-center justify-between">
                <span>3D Geometry</span>
                <span className="text-white/30">• Drag to rotate</span>
              </div>

              {/* Geometry Selection Buttons */}
              <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
                {(
                  [
                    { id: 'vk', label: 'VK 3D' },
                    { id: 'sphere', label: 'Sphere' },
                    { id: 'icosahedron', label: 'Icosahedron' },
                    { id: 'torusKnot', label: 'Torus Knot' },
                    { id: 'cyberRings', label: 'Gyroscope' },
                    { id: 'dodecahedron', label: 'Dodecahedron' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveGeometry(item.id)}
                    type="button"
                    className={`px-2.5 py-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                      activeGeometry === item.id
                        ? 'border-white bg-white text-black font-semibold shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                        : 'border-white/10 text-white/70 hover:border-white/40 hover:text-white bg-white/[0.03]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Toggles: Auto Rotate & Wireframe */}
              <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                    autoRotate
                      ? 'border-white/50 text-white bg-white/10'
                      : 'border-white/10 text-white/40 hover:text-white'
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                  <span>Spin</span>
                </button>

                <button
                  onClick={() => setWireframeOnly(!wireframeOnly)}
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                    wireframeOnly
                      ? 'border-white/50 text-white bg-white/10'
                      : 'border-white/10 text-white/40 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{wireframeOnly ? 'Lines' : 'Solid'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setIsPanelExpanded(!isPanelExpanded)}
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/20 bg-black/75 hover:bg-white/15 backdrop-blur-md text-white/80 hover:text-white text-xs font-mono tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-pointer hover:border-white/50"
            aria-label="Toggle 3D Controls"
          >
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>3D Controls</span>
            <span className="text-[10px] text-white/40 font-bold ml-1">
              {isPanelExpanded ? '✕' : '+'}
            </span>
          </button>
        </div>
      )}

      {/* Floating Interactive Drag Hint */}
      {isInteracting && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-sm text-[11px] font-mono text-white/80 pointer-events-none transition-opacity">
          3D Interactive Mode • Orbit Active
        </div>
      )}
    </div>
  );
};

export default ThreeScene;
