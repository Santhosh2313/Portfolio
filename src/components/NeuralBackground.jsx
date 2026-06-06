import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * NeuralBackground component renders an interactive Three.js neural network background.
 * This component was extracted from the Hero component to enable lazy loading and improve initial load performance.
 */
export default function NeuralBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Nodes and Edges
    const numNodes = 120;
    const nodes = [];
    const geometry = new THREE.SphereGeometry(1.5, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x3b82f6 }); // tailwind blue-500

    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    for (let i = 0; i < numNodes; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      // Random positions in a sphere-like volume
      mesh.position.x = (Math.random() - 0.5) * 400;
      mesh.position.y = (Math.random() - 0.5) * 400;
      mesh.position.z = (Math.random() - 0.5) * 200;

      // Save base positions for spring effect
      mesh.userData = {
        baseX: mesh.position.x,
        baseY: mesh.position.y,
        baseZ: mesh.position.z,
      };

      nodes.push(mesh);
      nodeGroup.add(mesh);
    }

    // Lines connecting nearby nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x1d4ed8, // tailwind blue-700
      transparent: true,
      opacity: 0.3,
    });

    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 60) {
          linePositions.push(
            nodes[i].position.x,
            nodes[i].position.y,
            nodes[i].position.z,
            nodes[j].position.x,
            nodes[j].position.y,
            nodes[j].position.z
          );
        }
      }
    }
    lineGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lines = new THREE.LineSegments(lineGeo, lineMaterial);
    nodeGroup.add(lines);

    // Mouse interaction
    const mouse = new THREE.Vector2(-9999, -9999);
    const targetMouse = new THREE.Vector2(-9999, -9999);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersectPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersectPoint);
      targetMouse.copy(intersectPoint);
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      nodeGroup.rotation.y += 0.0005;
      nodeGroup.rotation.x += 0.0002;

      // Update node positions based on mouse proximity
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const worldPos = node.position.clone().applyMatrix4(nodeGroup.matrixWorld);
        const distToMouse = worldPos.distanceTo(
          new THREE.Vector3(targetMouse.x, targetMouse.y, 0)
        );
        if (distToMouse < 100) {
          const attractVec = new THREE.Vector3(
            targetMouse.x,
            targetMouse.y,
            0
          )
            .sub(worldPos)
            .normalize()
            .multiplyScalar(20);
          const targetPos = new THREE.Vector3(
            node.userData.baseX + attractVec.x,
            node.userData.baseY + attractVec.y,
            node.userData.baseZ
          );
          node.position.lerp(targetPos, 0.05);
        } else {
          const targetPos = new THREE.Vector3(
            node.userData.baseX,
            node.userData.baseY,
            node.userData.baseZ
          );
          node.position.lerp(targetPos, 0.02);
        }
      }

      // Update line geometry vertices for current connections
      const positions = lines.geometry.attributes.position.array;
      let lineIndex = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const baseDist = new THREE.Vector3(
            nodes[i].userData.baseX,
            nodes[i].userData.baseY,
            nodes[i].userData.baseZ
          ).distanceTo(
            new THREE.Vector3(
              nodes[j].userData.baseX,
              nodes[j].userData.baseY,
              nodes[j].userData.baseZ
            )
          );
          if (baseDist < 60) {
            positions[lineIndex++] = nodes[i].position.x;
            positions[lineIndex++] = nodes[i].position.y;
            positions[lineIndex++] = nodes[i].position.z;
            positions[lineIndex++] = nodes[j].position.x;
            positions[lineIndex++] = nodes[j].position.y;
            positions[lineIndex++] = nodes[j].position.z;
          }
        }
      }
      lines.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeo.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
}
