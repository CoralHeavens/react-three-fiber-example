import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Color } from "three";

const rings = Array(14).fill(0);

export function Rings() {
    const itemsRef = useRef([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, rings.length);
    }, [])

    useFrame(() => {
        itemsRef.current.forEach((mesh, index) => {
            const z = (index - 7) * 3.5;
            mesh.position.set(0, 0, -z);

            const dist = Math.abs(z);
            mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

            let colorScale = 1;
            if (dist > 2) {
                colorScale = 1 - (Math.min(dist, 12) - 2) / 10;
            }
            colorScale *= 0.5;

            if (index % 2 === 1) {
                mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(colorScale);
            } else {
                mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(colorScale);
            }
        })
    })

    return (
        <>
            {rings.map((v, index) => (
                <mesh
                    castShadow
                    receiveShadow
                    position={[0, 0, 0]}
                    key={index}
                    ref = {(element) => itemsRef.current[index] = element}
                >
                    <torusGeometry args={[3.35, 0.05, 16, 100]} />
                    <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
                </mesh>
            ))}
        </>
    )
}