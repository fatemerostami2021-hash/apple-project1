import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../store/theme";

export default function GalaxyBackground() {
  const mountRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // ✅ در تم لایت، کهکشان اصلاً ساخته نمی‌شه
    if (!isDark) return;
    if (!mountRef.current) return;

    const mount = mountRef.current;
    let disposed = false;

    // ===============================
    // Scene / Camera / Renderer
    // ===============================
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL not available, skipping galaxy background:", e);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    mount.appendChild(renderer.domElement);

    // ===============================
    // Mouse Parallax
    // ===============================
    const mouse = { x: 0, y: 0 };
    const handleMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);

    // ===============================
    // ✅ Particle Counts — به‌شدت کاهش یافته برای خوانایی متن
    // قبلی: main 7000 / dust 9000 / star 2000
    // الان:  main 1800 / dust 2200 / star 700
    // ===============================
    const mainCount = 1800;
    const dustCount = 2200;
    const starCount = 700;

    const spiralPoint = () => {
      const radius = Math.random() * 5;
      const angle = Math.random() * Math.PI * 2;
      const spiral = radius * 1.2;
      const x = Math.cos(angle + spiral) * radius;
      const z = Math.sin(angle + spiral) * radius;
      const y = (Math.random() - 0.5) * 0.3;
      return { x, y, z, radius };
    };

    // ===============================
    // Main Galaxy (طلایی) — کم‌نورتر
    // ===============================
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(mainCount * 3);
    const col = new Float32Array(mainCount * 3);

    for (let i = 0; i < mainCount; i++) {
      const i3 = i * 3;
      const { x, y, z } = spiralPoint();
      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      // ✅ brightness کاهش یافته (قبلی 0.7-1.3 → الان 0.4-0.8)
      const brightness = 0.4 + Math.random() * 0.4;
      col[i3] = brightness;
      col[i3 + 1] = brightness * (0.7 + Math.random() * 0.3);
      col[i3 + 2] = brightness * (0.2 + Math.random() * 0.3);
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.025, // کمی کوچک‌تر هم شد
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      opacity: 0.55, // ✅ قبلی 1 بود — الان نیمه‌شفاف
    });

    const galaxy = new THREE.Points(geo, mat);
    scene.add(galaxy);

    // ===============================
    // Dust Layer — خفیف‌تر
    // ===============================
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 6;
      const angle = Math.random() * Math.PI * 2;
      dustPos[i3] = Math.cos(angle) * radius;
      dustPos[i3 + 1] = (Math.random() - 0.5) * 0.5;
      dustPos[i3 + 2] = Math.sin(angle) * radius;
    }

    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));

    const dustMat = new THREE.PointsMaterial({
      color: "#c8a84a",
      size: 0.012,
      transparent: true,
      opacity: 0.28, // ✅ قبلی 0.6 بود
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // ===============================
    // Star Layer — خفیف‌تر
    // ===============================
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPos[i3] = (Math.random() - 0.5) * 30;
      starPos[i3 + 1] = (Math.random() - 0.5) * 30;
      starPos[i3 + 2] = -Math.random() * 30;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));

    const starMat = new THREE.PointsMaterial({
      color: "#ffffff",
      size: 0.04,
      transparent: true,
      opacity: 0.45, // ✅ قبلی 0.9 بود
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ===============================
    // Shooting Stars — تعداد کمتر و کم‌نورتر
    // ===============================
    const shootingStars = [];

    function resetStar(star) {
      star.position.set((Math.random() - 0.5) * 20, 6 + Math.random() * 4, -5);
      star.userData.speed = 0.1 + Math.random() * 0.2;
    }

    for (let i = 0; i < 2; i++) { // ✅ قبلی 4 بود
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([0, 0, 0]);
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: "#ffd700",
        size: 0.1,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.6, // ✅ قبلی 1 بود
      });

      const star = new THREE.Points(geometry, material);
      resetStar(star);
      scene.add(star);
      shootingStars.push(star);
    }

    // ===============================
    // Nebula Glow — خیلی کم‌نورتر
    // ===============================
    const nebulaGeo = new THREE.SphereGeometry(4, 32, 32);
    const nebulaMat = new THREE.MeshBasicMaterial({
      color: "#D4AF37",
      transparent: true,
      opacity: 0.025, // ✅ قبلی 0.05 بود
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    scene.add(nebula);

    // ===============================
    // Animation
    // ===============================
    let t = 0;
    let frameId;

    const animate = () => {
      if (disposed) return;

      t += 0.002;
      galaxy.rotation.y += 0.0008;
      dust.rotation.y += 0.0005;
      stars.rotation.y += 0.0002;
      nebula.scale.setScalar(1 + Math.sin(t * 2) * 0.03);

      camera.position.x += (mouse.x * 0.3 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 0.3 - camera.position.y) * 0.02;

      shootingStars.forEach((s) => {
        s.position.x += s.userData.speed * 2;
        s.position.y -= s.userData.speed;
        if (s.position.y < -6) resetStar(s);
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // ===============================
    // Resize
    // ===============================
    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", resize);

    // ===============================
    // Cleanup
    // ===============================
    return () => {
      disposed = true;

      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", resize);

      if (frameId) cancelAnimationFrame(frameId);

      geo.dispose();
      dustGeo.dispose();
      starGeo.dispose();
      nebulaGeo.dispose();

      mat.dispose();
      dustMat.dispose();
      starMat.dispose();
      nebulaMat.dispose();

      shootingStars.forEach((s) => {
        s.geometry?.dispose();
        s.material?.dispose();
      });

      try {
        if (mount && renderer.domElement && renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      } catch (e) {}

      renderer.dispose();
      renderer.forceContextLoss?.();
    };
  }, [isDark]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -3,
          pointerEvents: "none",
          backgroundColor: isDark ? "#000000" : "#e8f5ff",
          transition: "background-color 0.5s ease",
        }}
      />

      {isDark && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -2,
            pointerEvents: "none",
            background: `
              radial-gradient(circle at 20% 20%, rgba(212,175,55,0.05), transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(212,175,55,0.03), transparent 50%)
            `,
            filter: "blur(80px)",
            transition: "opacity 0.5s ease",
          }}
        />
      )}

      {isDark && (
        <div
          ref={mountRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
}