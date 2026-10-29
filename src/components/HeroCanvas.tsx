import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene, Camera, and WebGL Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 280;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch {
      // WebGL not supported fallback
      return;
    }

    // 2. Central Wireframe Globe (Refining Node)
    const globeGeometry = new THREE.IcosahedronGeometry(48, 2);
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x2e87c6,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Inner Core Sphere
    const coreGeometry = new THREE.SphereGeometry(32, 16, 16);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x0f2840,
      transparent: true,
      opacity: 0.65,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // 3. Orbital 3R Particle Rings (Recycle = Cyan, Recovery = Orange, Refine = Teal)
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color('#38BDF8');
    const orangeColor = new THREE.Color('#EE7B2B');
    const tealColor = new THREE.Color('#10B981');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Assign into 3 orbital groups
      const group = i % 3;
      const angle = (i / (particleCount / 3)) * Math.PI * 2 + Math.random() * 0.1;
      const radius = 95 + (Math.random() - 0.5) * 22;

      let x = 0, y = 0, z = 0;
      let col = cyanColor;

      if (group === 0) {
        // Orbital Ring 1: Cyan (Recycle) - Tilted ~35 deg
        x = Math.cos(angle) * radius;
        y = Math.sin(angle) * (radius * 0.85);
        z = Math.sin(angle) * 45 + (Math.random() - 0.5) * 15;
        col = cyanColor;
      } else if (group === 1) {
        // Orbital Ring 2: Orange (Recovery) - Counter Tilted ~-40 deg
        x = Math.cos(angle) * (radius * 1.05);
        y = Math.sin(angle) * 35 + (Math.random() - 0.5) * 15;
        z = Math.sin(angle) * (radius * 0.9);
        col = orangeColor;
      } else {
        // Orbital Ring 3: Teal (Refine) - Horizontal Equator
        x = Math.cos(angle) * (radius * 0.95);
        y = (Math.random() - 0.5) * 18;
        z = Math.sin(angle) * (radius * 0.95);
        col = tealColor;
      }

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 4. GSAP Entrance Animation
    gsap.fromTo(
      globe.scale,
      { x: 0.4, y: 0.4, z: 0.4 },
      { x: 1, y: 1, z: 1, duration: 2.2, ease: 'power2.out' }
    );
    gsap.fromTo(
      particleMaterial,
      { opacity: 0 },
      { opacity: 0.75, duration: 2.5, ease: 'power2.out', delay: 0.3 }
    );

    // 5. Mouse Parallax Reaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left - rect.width / 2;
      const clientY = e.clientY - rect.top - rect.height / 2;
      targetX = (clientX / rect.width) * 0.35;
      targetY = (clientY / rect.height) * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotation
      globe.rotation.y = elapsedTime * 0.12 + mouseX;
      globe.rotation.x = elapsedTime * 0.06 + mouseY;

      particles.rotation.y = elapsedTime * 0.16 + mouseX * 0.5;
      particles.rotation.x = Math.sin(elapsedTime * 0.08) * 0.15 + mouseY * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Responsive Resize Observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      globeGeometry.dispose();
      globeMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Three.js 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-[340px] sm:w-[480px] md:w-[600px] lg:w-[680px] h-[340px] sm:h-[480px] md:h-[600px] lg:h-[680px] opacity-75 sm:opacity-85 transition-opacity duration-1000"
      />
    </div>
  );
}
