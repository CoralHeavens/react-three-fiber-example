import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";

export function FloatingGrid({
    speed = 1
}) {
    const diffuse = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + 'assets/textures/grid-texture.png'
    )

    useEffect(() => {
        diffuse.wrapS = RepeatWrapping;
        diffuse.wrapT = RepeatWrapping;
        diffuse.anisotropy = 4;
        diffuse.repeat.set(30, 30);
        diffuse.offset.set(0, 0);
    }, [diffuse])

    useFrame((state) => {
        const updatedY = -state.clock.getElapsedTime() * 0.68 * speed;
        diffuse.offset.set(0, updatedY);
    })

    return (
        <mesh rotation-x={-Math.PI * 0.5} position={[0, 0.425, 0]}>
            <planeGeometry args={[35, 35]} />
            <meshBasicMaterial
                color={[1, 1, 1]}
                opacity={0.15}
                map={diffuse}
                alphaMap={diffuse}
                transparent={true}
            />
        </mesh>
    )
}