import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "../store/theme";

// 🔥 هوک تشخیص موبایل (با گوش دادن به resize)
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

export default function GalaxyBackground() {
  const mountRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isMobile = useIsMobile(); // 🔥

  // 🔥 احترام به تنظیم «کاهش حرکت» سیستم کاربر
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // 🔥 آیا اصلاً باید سه‌بعدی اجرا شود؟
  const enable3D = isDark && !isMobile && !prefersReduced;

  useEffect(() => {
    // 🔥 روی موبایل / لایت / کاهش‌حرکت اصلاً کهکشان ساخته نمی‌شود
    if (!enable3D) return;
    if (!mountRef.current) return;

    const mount = mountRef.current;
    let disposed = false;
    let cleanupGalaxy = null;

    const scheduleInit = (cb) => {
      if ("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(cb, { timeout: 700 });
        return () => window.cancelIdleCallback?.(id);
      }
      const id = setTimeout(cb, 200);
      return () => clearTimeout(id);
    };

    const cancelSchedule = scheduleInit(() => {
      if (disposed) return;
      cleanupGalaxy = initGalaxy();
    });

    function initGalaxy() {
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
          failIfMajorPerformanceCaveat: true, // 🔥 روی GPU ضعیف اصلاً نساز
        });
      } catch (e) {
        console.warn("WebGL not available, skipping galaxy background:", e);
        return null;
      }

      // 🔥 محدود کردن pixelRatio به 1.5 (بزرگ‌ترین عامل مصرف GPU)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      mount.appendChild(renderer.domElement);
      renderer.domElement.style.opacity = "0";
      renderer.domElement.style.transition = "opacity 0.8s ease";
      requestAnimationFrame(() => {
        if (!disposed) renderer.domElement.style.opacity = "1";
      });

      // 🔥 مدیریت از دست رفتن WebGL context (جلوگیری از کرش سفید)
      const handleContextLost = (e) => {
        e.preventDefault();
        console.warn("WebGL context lost — pausing galaxy.");
      };
      renderer.domElement.addEventListener("webglcontextlost", handleContextLost);

      // Mouse Parallax
      const mouse = { x: 0, y: 0 };
      const handleMouse = (e) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", handleMouse);

      // 🔥 چون فقط روی دسکتاپ اجرا می‌شود، تعداد ذرات کامل می‌ماند
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

      // Main Galaxy (طلایی)
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(mainCount * 3);
      const col = new Float32Array(mainCount * 3);

      for (let i = 0; i < mainCount; i++) {
        const i3 = i * 3;
        const { x, y, z } = spiralPoint();
        pos[i3] = x;
        pos[i3 + 1] = y;
        pos[i3 + 2] = z;

        const brightness = 0.4 + Math.random() * 0.4;
        col[i3] = brightness;
        col[i3 + 1] = brightness * (0.7 + Math.random() * 0.3);
        col[i3 + 2] = brightness * (0.2 + Math.random() * 0.3);
      }

      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.025,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        opacity: 0.55,
      });

      const galaxy = new THREE.Points(geo, mat);
      scene.add(galaxy);

      // Dust Layer
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
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const dust = new THREE.Points(dustGeo, dustMat);
      scene.add(dust);

      // Star Layer
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
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      // Shooting Stars
      const shootingStars = [];

      function resetStar(star) {
        star.position.set((Math.random() - 0.5) * 20, 6 + Math.random() * 4, -5);
        star.userData.speed = 0.1 + Math.random() * 0.2;
      }

      for (let i = 0; i < 2; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array([0, 0, 0]);
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
          color: "#ffd700",
          size: 0.1,
          blending: THREE.AdditiveBlending,
          transparent: true,
          opacity: 0.6,
        });

        const star = new THREE.Points(geometry, material);
        resetStar(star);
        scene.add(star);
        shootingStars.push(star);
      }

      // Nebula Glow
      const nebulaGeo = new THREE.SphereGeometry(4, 32, 32);
      const nebulaMat = new THREE.MeshBasicMaterial({
        color: "#D4AF37",
        transparent: true,
        opacity: 0.025,
      });
      const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
      scene.add(nebula);

      // Animation
      let t = 0;
      let frameId;
      let animDisposed = false;

      // 🔥 وقتی تب مخفی است، انیمیشن متوقف شود (صرفه‌جویی باتری/حافظه)
      const handleVisibility = () => {
        if (document.hidden) {
          if (frameId) cancelAnimationFrame(frameId);
          frameId = null;
        } else if (!animDisposed && !frameId) {
          animate();
        }
      };
      document.addEventListener("visibilitychange", handleVisibility);

      const animate = () => {
        if (animDisposed) return;

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

      // Resize
      const resize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", resize);

      // Cleanup
      return () => {
        animDisposed = true;

        window.removeEventListener("mousemove", handleMouse);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", handleVisibility); // 🔥
        renderer.domElement.removeEventListener("webglcontextlost", handleContextLost); // 🔥

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
        } catch (e) {
          // node از قبل حذف شده — نادیده بگیر
        }

        renderer.dispose();
        renderer.forceContextLoss?.();
      };
    }

    return () => {
      disposed = true;
      cancelSchedule();
      if (cleanupGalaxy) cleanupGalaxy();
    };
  }, [enable3D]); // 🔥 وابستگی به enable3D به‌جای isDark

  return (
    <>
      {/* لایه پس‌زمینه پایه — همیشه هست */}
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

      {/* 🔥 روی موبایل دارک، به‌جای Three.js یک گرادیانت سبک نشان بده */}
      {isDark && !enable3D && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -2,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.10), transparent 60%), #000000",
          }}
        />
      )}

      {/* گلوی نبولا — فقط وقتی سه‌بعدی فعال است */}
      {enable3D && (
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

      {/* کانتینر Three.js — فقط روی دسکتاپ دارک */}
      {enable3D && (
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