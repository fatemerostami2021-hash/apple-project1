import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GalaxyBackground() {

  const mountRef = useRef(null);

  useEffect(() => {
const scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
console.log(mountRef.current)


    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    mountRef.current.appendChild(renderer.domElement);

    const particles = 4000;
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(particles * 3);
    const colors = new Float32Array(particles * 3);

    const colorInside = new THREE.Color("#38bdf8");
    const colorOutside = new THREE.Color("#a855f7");

    for (let i = 0; i < particles; i++) {

      const i3 = i * 3;

      const radius = Math.random() * 6;
      const spin = radius * 1.5;
      const angle = Math.random() * Math.PI * 2;

      const randomX = (Math.random() - 0.5) * 0.4;
      const randomY = (Math.random() - 0.5) * 0.4;
      const randomZ = (Math.random() - 0.5) * 0.4;

      positions[i3] = Math.cos(angle + spin) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(angle + spin) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / 6);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const galaxy = new THREE.Points(geometry, material);

    scene.add(galaxy);

    const animate = () => {

      galaxy.rotation.y += 0.0007;
      galaxy.rotation.x += 0.0002;

      renderer.render(scene, camera);

      requestAnimationFrame(animate);

    };

    animate();

    const resize = () => {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

    };

    window.addEventListener("resize", resize);

    return () => {

      window.removeEventListener("resize", resize);

      mountRef.current.removeChild(renderer.domElement);

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
        zIndex: -1
      }}
    />
  );
}
