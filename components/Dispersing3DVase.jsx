'use client'

import React, { useEffect, useRef } from 'react';

const Dispersing3DVase = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 550;
    canvas.height = 550;

    let time = 0;
    let nodes = [];
    let animationFrameId = null;

    const vaseHeightPoints = 60;
    const vaseRadialPoints = 50;

    for (let i = 0; i < vaseHeightPoints; i++) {
      const t = i / vaseHeightPoints;
      const y = (t - 0.5) * 400;

      let radius = 50;

      if (t < 0.05) {
        radius = 80 * (1 + (0.05 - t) * 4);
      } else if (t < 0.15) {
        radius = 80 - (t - 0.05) * 300;
      } else if (t < 0.4) {
        radius = 50 + Math.sin((t - 0.15) * Math.PI / 0.25) * 60;
      } else if (t < 0.75) {
        radius = 110 - Math.cos((t - 0.4) * Math.PI / 0.35) * 30;
      } else if (t < 0.9) {
        radius = 80 - (t - 0.75) * 200;
      } else {
        radius = 50 + (t - 0.9) * 100;
      }

      for (let j = 0; j < vaseRadialPoints; j++) {
        const angle = (j / vaseRadialPoints) * Math.PI * 2;
        nodes.push({
          originalX: Math.cos(angle) * radius,
          originalY: y,
          originalZ: Math.sin(angle) * radius,
          x: Math.cos(angle) * radius,
          y: y,
          z: Math.sin(angle) * radius,
          vx: 0, vy: 0, vz: 0,
          dispersing: false,
          disperseTime: 0
        });
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    function project3DPoint(x, y, z, rotationX) {
      const rotatedY = y * Math.cos(rotationX) - z * Math.sin(rotationX);
      const rotatedZ = y * Math.sin(rotationX) + z * Math.cos(rotationX);
      const scale = 400 / (400 + rotatedZ);
      return {
        x: x * scale + canvas.width / 2,
        y: rotatedY * scale + canvas.height / 2,
        z: rotatedZ,
        scale: scale
      };
    }

    function animate() {
      ctx.fillStyle = '#faf8f5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.005;
      const rotationX = time * 0.15;

      const candidateNodes = [];

      nodes.forEach(node => {
        const projected = project3DPoint(node.x, node.y, node.z, rotationX);
        const distanceToMouse = Math.hypot(projected.x - mouseRef.current.x, projected.y - mouseRef.current.y);

        if (distanceToMouse < 120 && !node.dispersing) {
          candidateNodes.push({ node, distance: distanceToMouse });
        }
      });

      candidateNodes.sort((a, b) => a.distance - b.distance);
      candidateNodes.slice(0, 5).forEach(({ node }) => {
        node.dispersing = true;
        node.disperseTime = 0;
        const disperseAngle = Math.atan2(node.z, node.x);
        const disperseY = node.y / 200;
        node.vx = Math.cos(disperseAngle) * 1.5;
        node.vy = disperseY * 1;
        node.vz = Math.sin(disperseAngle) * 1.5;
      });

      nodes.forEach(node => {
        if (node.dispersing) {
          node.disperseTime += 0.01;
          node.x += node.vx;
          node.y += node.vy;
          node.z += node.vz;
          node.vy += 0.04;
          node.vx *= 0.96;
          node.vy *= 0.96;
          node.vz *= 0.96;

          if (node.disperseTime > 4 || Math.abs(node.x) > 300 || Math.abs(node.z) > 300) {
            node.dispersing = false;
            node.x = node.originalX;
            node.y = node.originalY;
            node.z = node.originalZ;
            node.vx = 0; node.vy = 0; node.vz = 0;
          }
        }
      });

      const sortedNodes = [...nodes].sort((a, b) => {
        const projectedA = project3DPoint(a.x, a.y, a.z, rotationX);
        const projectedB = project3DPoint(b.x, b.y, b.z, rotationX);
        return projectedB.z - projectedA.z;
      });

      sortedNodes.forEach(node => {
        const projected = project3DPoint(node.x, node.y, node.z, rotationX);
        const alpha = node.dispersing ?
          0.3 * projected.scale * (1 - node.disperseTime / 5) :
          0.6 * projected.scale;
        const size = 0.5 + 0.25 * projected.scale;

        ctx.fillStyle = `rgba(68, 68, 68, ${alpha})`;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      const centerY = canvas.height / 2;
      const voidGradient = ctx.createRadialGradient(
        canvas.width / 2, centerY, 0,
        canvas.width / 2, centerY, 80
      );
      voidGradient.addColorStop(0, 'rgba(250, 248, 245, 0.8)');
      voidGradient.addColorStop(1, 'rgba(250, 248, 245, 0)');

      ctx.fillStyle = voidGradient;
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2, centerY, 80, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.length = 0;
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-[300px] aspect-square">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-pointer"
          style={{ borderRadius: 8 }}
        />
      </div>
    </div>
  );
};

export default Dispersing3DVase;
