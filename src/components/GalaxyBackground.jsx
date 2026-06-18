import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../store/theme";

export default function GalaxyBackground() {
  const mountRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;

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

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

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
    // Particle Counts
    // ===============================

    const mainCount = isDark ? 7000 : 3000;
    const dustCount = isDark ? 9000 : 3000;
    const starCount = isDark ? 2000 : 800;

    // ===============================
    // Helper Spiral Function
    // ===============================

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
    // Main Galaxy
    // ===============================

    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(mainCount * 3);
    const col = new Float32Array(mainCount * 3);

    for (let i = 0; i < mainCount; i++) {
      const i3 = i * 3;

      const { x, y, z, radius } = spiralPoint();

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      const brightness = 0.7 + Math.random() * 0.6;

      col[i3] = brightness;
      col[i3 + 1] = brightness * 0.85;
      col[i3 + 2] = brightness * 0.45;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });

    const galaxy = new THREE.Points(geo, mat);
    scene.add(galaxy);

    // ===============================
    // Dust Layer
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
      size: 0.015,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // ===============================
    // Star Layer
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
      size: 0.05,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ===============================
    // Shooting Stars
    // ===============================

    const shootingStars = [];

    for (let i = 0; i < 4; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([0, 0, 0]);

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const material = new THREE.PointsMaterial({
        color: "#ffd700",
        size: 0.12,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });

      const star = new THREE.Points(geometry, material);

      resetStar(star);

      scene.add(star);

      shootingStars.push(star);
    }

    function resetStar(star) {
      star.position.set(
        (Math.random() - 0.5) * 20,
        6 + Math.random() * 4,
        -5
      );

      star.userData.speed = 0.1 + Math.random() * 0.2;
    }

    // ===============================
    // Nebula Glow
    // ===============================

    const nebulaGeo = new THREE.SphereGeometry(4, 32, 32);

    const nebulaMat = new THREE.MeshBasicMaterial({
      color: "#D4AF37",
      transparent: true,
      opacity: 0.05,
    });

    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    scene.add(nebula);

    // ===============================
    // Animation
    // ===============================

    let t = 0;
    let id;

    const animate = () => {
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

      id = requestAnimationFrame(animate);
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
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", resize);

      cancelAnimationFrame(id);

      geo.dispose();
      dustGeo.dispose();
      starGeo.dispose();

      mat.dispose();
      dustMat.dispose();
      starMat.dispose();

      renderer.dispose();

      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [isDark]);

  return (
    <>
      {/* Metallic Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -3,
          pointerEvents: "none",
          backgroundImage: isDark
            ? `url("/assets/textures/metallic-bg.jpg")`
            : "linear-gradient(135deg,#F8FBFF,#E8F5FF)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Golden Ambient Light */}
      {isDark && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -2,
            pointerEvents: "none",
            background: `
              radial-gradient(circle at 20% 20%, rgba(212,175,55,0.15), transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(212,175,55,0.1), transparent 40%)
            `,
            filter: "blur(80px)",
          }}
        />
      )}

      {/* Canvas */}
      <div
        ref={mountRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
