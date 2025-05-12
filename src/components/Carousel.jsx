import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

// Import images
import allpurpose13 from "../images/allpurpose/allpurpose13.jpg";
import babyFD8 from "../images/babyFD/babyFD8.jpg";
import bakery16 from "../images/bakery/bakery16.jpg";
import beer2 from "../images/beer/beer2.jpg";
import bodycare2 from "../images/bodycare/bodycare2.png";
import butchery11 from "../images/butchery/butchery11.jpg";
import coldbeverage1 from "../images/coldbeverage/coldbeverage1.jpeg";
import cookingoils11 from "../images/cookingoils/cookingoils11.jpg";
import TV9 from "../images/TVS/TV9.jpg";
import Wmachine16 from "../images/washingmachine/Wmachine16.jpg";

// Component for individual image plane
const ImagePlane = ({ texture, position, rotation }) => {
  return (
    <mesh position={position} rotation={rotation}>
      {/* Uniform size for each image */}
      <planeGeometry args={[3, 3]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

// Group of all image planes arranged in a circle
const CarouselGroup = () => {
  const groupRef = useRef();
  const textures = useTexture([
    allpurpose13,
    babyFD8,
    bakery16,
    beer2,
    bodycare2,
    butchery11,
    coldbeverage1,
    cookingoils11,
    TV9,
    Wmachine16
]);
  const radius = 8; // Radius of the cylinder where images will be positioned
  const count = textures.length;

  // Rotation speed adjusted for smooth and continuous rotation
  const rotationSpeed = 0.01; // Slower rotation to ensure visibility for each image

  useFrame(() => {
    if (groupRef.current) {
      // Smooth and continuous rotation along the Y-axis
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      {textures.map((texture, idx) => {
        // Angle to position images evenly around the cylinder's circumference
        const angle = (idx / count) * Math.PI * 2; // Distribute images evenly around the circle
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        // Set the 'y' value to raise the images higher (adjust this value as needed)
        const y = 2; // Raise images by 2 units along the Y-axis

        // **Rotation Update**: Set Z and Y rotation to 0, only rotating along Y axis for proper positioning
        const rotation = [0, angle, 0]; // Rotation along Y-axis only, keeping images facing the center

        return (
          <ImagePlane
            key={idx}
            texture={texture}
            position={[x, y, z]} // Set 'y' position to move images upwards
            rotation={rotation} // Rotation keeps images facing the center
          />
        );
      })}
    </group>
  );
};

// Main Carousel component
const Carousel = () => {
  return (
    <div
      className="carousel carousel-container w-full max-w-3xl mx-auto mb-2"
      style={{ height: "400px", width: "100%", marginBottom: "1rem" }}
    >
      <Canvas camera={{ position: [0, 5, 14], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} />
        <OrbitControls enableZoom={false} />
        <CarouselGroup />
      </Canvas>
    </div>
  );
};

export default Carousel;