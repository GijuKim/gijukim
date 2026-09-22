import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create 3D starfield with orbital motion
    const starCount = 1600;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starVelocities = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starPhases = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // Circular distribution on XY plane
      const angle = (i / starCount) * Math.PI * 2;
      const circleRadius = 30 + Math.random() * 15;
      const depthVariation = (Math.random() - 0.5) * 20;

      starPositions[i3] = Math.cos(angle) * circleRadius;
      starPositions[i3 + 1] = Math.sin(angle) * circleRadius;
      starPositions[i3 + 2] = depthVariation;

      // Random velocity directions for orbital motion
      starVelocities[i3] = (Math.random() - 0.5) * 0.3;
      starVelocities[i3 + 1] = (Math.random() - 0.5) * 0.3;
      starVelocities[i3 + 2] = (Math.random() - 0.5) * 0.3;

      // Phase for wave-like motion
      starPhases[i] = Math.random() * Math.PI * 2;

      // Dark blue stars for white background
      const colorVariation = Math.random();
      starColors[i3] = 0.1 + colorVariation * 0.1;
      starColors[i3 + 1] = 0.3 + colorVariation * 0.2;
      starColors[i3 + 2] = 0.7 + colorVariation * 0.3;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('velocity', new THREE.BufferAttribute(starVelocities, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('phase', new THREE.BufferAttribute(starPhases, 1));

    // Create circular star texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
    const texture = new THREE.CanvasTexture(canvas);

    const starMaterial = new THREE.PointsMaterial({
      size: 2,
      sizeAttenuation: true,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      alphaTest: 0.5,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Minimal lighting for starfield
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const scrollSpeed = scrollY * 0.001;

      const positions = starField.geometry.attributes.position.array;
      const velocities = starField.geometry.attributes.velocity.array;
      const phases = starField.geometry.attributes.phase.array;

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        const phase = phases[i];
        
        // Orbital rotation around center
        const rotationSpeed = 0.0005 + scrollSpeed * 0.002;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        // Rotate around Y axis (horizontal spin)
        const cosTheta = Math.cos(rotationSpeed);
        const sinTheta = Math.sin(rotationSpeed);
        positions[i3] = x * cosTheta - z * sinTheta;
        positions[i3 + 2] = x * sinTheta + z * cosTheta;
        
        // Wave motion based on scroll
        const waveAmplitude = scrollSpeed * 10;
        positions[i3] += Math.sin(elapsed + phase) * waveAmplitude * 0.1;
        positions[i3 + 1] += Math.cos(elapsed * 0.7 + phase) * waveAmplitude * 0.1;
        positions[i3 + 2] += Math.sin(elapsed * 0.5 + phase) * waveAmplitude * 0.1;
        
        // Organic drift using velocities
        positions[i3] += velocities[i3] * (1 + scrollSpeed * 2);
        positions[i3 + 1] += velocities[i3 + 1] * (1 + scrollSpeed * 2);
        positions[i3 + 2] += velocities[i3 + 2] * (1 + scrollSpeed * 2);
        
        // Keep stars in circular pattern
        const distance = Math.sqrt(x * x + y * y);
        if (distance > 60) {
          const angle = (i / starCount) * Math.PI * 2;
          const circleRadius = 30 + Math.random() * 15;
          const depthVariation = (Math.random() - 0.5) * 20;
          
          positions[i3] = Math.cos(angle) * circleRadius;
          positions[i3 + 1] = Math.sin(angle) * circleRadius;
          positions[i3 + 2] = depthVariation;
        }
      }

      starField.geometry.attributes.position.needsUpdate = true;

      // Fade out stars at the end of hero section
      const heroHeight = window.innerHeight;
      const fadeStart = heroHeight * 0.5;
      const fadeEnd = heroHeight;
      const fadeProgress = Math.min(1, Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart)));
      starMaterial.opacity = 0.5 * (1 - fadeProgress);

      // Camera movement
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
      camera.rotation.z = mouseX * 0.03;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mountRef.current?.clientWidth || window.innerWidth;
      const h = mountRef.current?.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}