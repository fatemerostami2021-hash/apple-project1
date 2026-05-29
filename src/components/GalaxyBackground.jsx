// src/components/GalaxyBackground.jsx - کهکشان طلایی با ذرات ریز
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GalaxyBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    // صحنه با بک‌گراند مشکی شفاف
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");

    // دوربین
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7;

    // رندرر با شفافیت
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // شفاف برای compatibility با تم سایت
    mountRef.current.appendChild(renderer.domElement);

    // ==================== لایه اول: ذرات ریز طلایی اصلی ====================
    const mainParticles = 6000;
    const mainGeometry = new THREE.BufferGeometry();
    const mainPositions = new Float32Array(mainParticles * 3);
    const mainColors = new Float32Array(mainParticles * 3);

    const goldCore = new THREE.Color("#ffd700");    // طلایی روشن
    const goldMid = new THREE.Color("#ffaa33");     // طلایی متوسط
    const goldOuter = new THREE.Color("#cc8800");   // طلایی تیره

    for (let i = 0; i < mainParticles; i++) {
      const i3 = i * 3;
      
      // توزیع مارپیچی
      const radius = Math.pow(Math.random(), 1.2) * 5.5;
      const angle = Math.random() * Math.PI * 2;
      const spiral = radius * 1.2;
      const armOffset = Math.sin(radius * 3) * 0.3;
      
      const x = Math.cos(angle + spiral + armOffset) * radius;
      const z = Math.sin(angle + spiral + armOffset) * radius;
      const y = Math.sin(radius * 2.5) * 0.1 + (Math.random() - 0.5) * 0.15;
      
      mainPositions[i3] = x;
      mainPositions[i3 + 1] = y;
      mainPositions[i3 + 2] = z;
      
      // رنگ طلایی بر اساس فاصله از مرکز
      let color;
      if (radius < 1.5) color = goldCore.clone();
      else if (radius < 3.5) color = goldMid.clone();
      else color = goldOuter.clone();
      
      // اضافه کردن تنوع تصادفی به رنگ
      color.multiplyScalar(0.7 + Math.random() * 0.5);
      
      mainColors[i3] = color.r;
      mainColors[i3 + 1] = color.g;
      mainColors[i3 + 2] = color.b;
    }
    
    mainGeometry.setAttribute("position", new THREE.BufferAttribute(mainPositions, 3));
    mainGeometry.setAttribute("color", new THREE.BufferAttribute(mainColors, 3));
    
    const mainMaterial = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.9
    });
    
    const galaxy = new THREE.Points(mainGeometry, mainMaterial);
    scene.add(galaxy);

    // ==================== لایه دوم: ذرات بسیار ریز طلایی (غبار کیهانی) ====================
    const dustParticles = 8000;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustParticles * 3);
    const dustColors = new Float32Array(dustParticles * 3);
    
    for (let i = 0; i < dustParticles; i++) {
      const i3 = i * 3;
      
      const radius = Math.random() * 6.5;
      const angle = Math.random() * Math.PI * 2;
      const spiral = radius * 1.1;
      
      const x = Math.cos(angle + spiral) * radius + (Math.random() - 0.5) * 0.5;
      const z = Math.sin(angle + spiral) * radius + (Math.random() - 0.5) * 0.5;
      const y = (Math.random() - 0.5) * 0.4;
      
      dustPositions[i3] = x;
      dustPositions[i3 + 1] = y;
      dustPositions[i3 + 2] = z;
      
      // رنگ طلایی کمرنگ برای غبار
      const intensity = 0.3 + Math.random() * 0.5;
      dustColors[i3] = 0.9 * intensity;
      dustColors[i3 + 1] = 0.7 * intensity;
      dustColors[i3 + 2] = 0.3 * intensity;
    }
    
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));
    
    const dustMaterial = new THREE.PointsMaterial({
      size: 0.012,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.5
    });
    
    const dustLayer = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustLayer);

    // ==================== لایه سوم: ستارگان درخشان طلایی ====================
    const starParticles = 1500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starParticles * 3);
    const starColors = new Float32Array(starParticles * 3);
    
    for (let i = 0; i < starParticles; i++) {
      const i3 = i * 3;
      
      const radius = Math.random() * 5;
      const angle = Math.random() * Math.PI * 2;
      const spiral = radius * 1.3;
      
      const x = Math.cos(angle + spiral) * radius;
      const z = Math.sin(angle + spiral) * radius;
      const y = (Math.random() - 0.5) * 0.2;
      
      starPositions[i3] = x;
      starPositions[i3 + 1] = y;
      starPositions[i3 + 2] = z;
      
      // ستارگان طلایی درخشان
      const brightness = 0.8 + Math.random() * 0.5;
      starColors[i3] = brightness;
      starColors[i3 + 1] = brightness * 0.85;
      starColors[i3 + 2] = brightness * 0.5;
    }
    
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 1
    });
    
    const starLayer = new THREE.Points(starGeometry, starMaterial);
    scene.add(starLayer);

    // ==================== لایه چهارم: هاله بیرونی ====================
    const haloParticles = 4000;
    const haloGeometry = new THREE.BufferGeometry();
    const haloPositions = new Float32Array(haloParticles * 3);
    const haloColors = new Float32Array(haloParticles * 3);
    
    for (let i = 0; i < haloParticles; i++) {
      const i3 = i * 3;
      
      const radius = 5 + Math.random() * 2;
      const angle = Math.random() * Math.PI * 2;
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 0.8;
      
      haloPositions[i3] = x;
      haloPositions[i3 + 1] = y;
      haloPositions[i3 + 2] = z;
      
      // هاله طلایی کمرنگ
      const intensity = 0.15 + Math.random() * 0.25;
      haloColors[i3] = 0.9 * intensity;
      haloColors[i3 + 1] = 0.7 * intensity;
      haloColors[i3 + 2] = 0.3 * intensity;
    }
    
    haloGeometry.setAttribute("position", new THREE.BufferAttribute(haloPositions, 3));
    haloGeometry.setAttribute("color", new THREE.BufferAttribute(haloColors, 3));
    
    const haloMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.3
    });
    
    const haloLayer = new THREE.Points(haloGeometry, haloMaterial);
    scene.add(haloLayer);

    // ==================== لایه پنجم: ستارگان پس‌زمینه ====================
    const bgParticles = 3000;
    const bgGeometry = new THREE.BufferGeometry();
    const bgPositions = new Float32Array(bgParticles * 3);
    const bgColors = new Float32Array(bgParticles * 3);
    
    for (let i = 0; i < bgParticles; i++) {
      const i3 = i * 3;
      
      const radius = 12 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      bgPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      bgPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.3;
      bgPositions[i3 + 2] = radius * Math.cos(phi);
      
      const intensity = 0.1 + Math.random() * 0.3;
      bgColors[i3] = intensity;
      bgColors[i3 + 1] = intensity * 0.8;
      bgColors[i3 + 2] = intensity * 0.5;
    }
    
    bgGeometry.setAttribute("position", new THREE.BufferAttribute(bgPositions, 3));
    bgGeometry.setAttribute("color", new THREE.BufferAttribute(bgColors, 3));
    
    const bgMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.4
    });
    
    const bgLayer = new THREE.Points(bgGeometry, bgMaterial);
    scene.add(bgLayer);

    // ==================== هسته مرکزی درخشان ====================
    const coreParticles = 500;
    const coreGeometry = new THREE.BufferGeometry();
    const corePositions = new Float32Array(coreParticles * 3);
    const coreColors = new Float32Array(coreParticles * 3);
    
    for (let i = 0; i < coreParticles; i++) {
      const i3 = i * 3;
      
      const radius = Math.pow(Math.random(), 2) * 0.8;
      const angle = Math.random() * Math.PI * 2;
      
      corePositions[i3] = Math.cos(angle) * radius;
      corePositions[i3 + 1] = (Math.random() - 0.5) * 0.2;
      corePositions[i3 + 2] = Math.sin(angle) * radius;
      
      // هسته بسیار درخشان طلایی-سفید
      const brightness = 0.9 + Math.random() * 0.5;
      coreColors[i3] = brightness;
      coreColors[i3 + 1] = brightness * 0.9;
      coreColors[i3 + 2] = brightness * 0.5;
    }
    
    coreGeometry.setAttribute("position", new THREE.BufferAttribute(corePositions, 3));
    coreGeometry.setAttribute("color", new THREE.BufferAttribute(coreColors, 3));
    
    const coreMaterial = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 1
    });
    
    const coreLayer = new THREE.Points(coreGeometry, coreMaterial);
    scene.add(coreLayer);

    // انیمیشن
    let time = 0;
    const animate = () => {
      time += 0.003;
      
      // چرخش آرام کهکشان
      galaxy.rotation.y = time * 0.6;
      galaxy.rotation.x = Math.sin(time * 0.2) * 0.05;
      
      dustLayer.rotation.y = time * 0.55;
      dustLayer.rotation.x = Math.sin(time * 0.18) * 0.03;
      
      starLayer.rotation.y = time * 0.65;
      
      haloLayer.rotation.y = time * 0.4;
      haloLayer.rotation.x = time * 0.1;
      
      coreLayer.rotation.y = time * 0.8;
      
      // ستارگان پس‌زمینه بسیار آرام
      bgLayer.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();

    // ریسپانسیو
    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}