import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { Vector3 } from "three";

function Box({ color }) {
    const box = useRef();
    const [xRotSpeed] = useState(() => Math.random());
    const [yRotSpeed] = useState(() => Math.random());
    const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);
    const [position] = useState(resetPosition());

    function resetPosition() {
        const vector = new Vector3( (Math.random() * 2 - 1) * 3, (Math.random() * 2.5 + 0.1), (Math.random() * 2 - 1) * 15 );
        if (vector.x !== 0) vector.x += vector.x > 0 ? 1.75 : -1.75;

        return vector;
    }

    useFrame((_, delta) => {
        box.current.position.set(position.x, position.y, position.z);
        box.current.rotation.x += delta * xRotSpeed;
        box.current.rotation.y += delta * yRotSpeed;
    }, [xRotSpeed, yRotSpeed, position])

    return (
        <mesh ref={box} scale={scale} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} envMapIntensity={0.15} />
        </mesh>
    )
}

export function Boxes() {
    return (
        <>
            {Array(100).fill(0).map((_, index) => (
                <Box key={index} color={index % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]} />
            ))}
        </>
    )
}