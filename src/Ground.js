import { MeshReflectorMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

const Ground = ({
    speed = 1
}) => {
    const [roughness, normal] = useLoader(TextureLoader, [
        process.env.PUBLIC_URL + 'assets/textures/terrain-normal.jpg',
        process.env.PUBLIC_URL + 'assets/textures/terrain-roughness.jpg',
    ]);

    useEffect(() => {
        [normal, roughness].forEach((t) => {
            t.wrapS = RepeatWrapping;
            t.wrapT = RepeatWrapping;
            t.repeat.set(5, 5);
        });

        normal.encoding = LinearEncoding;
    }, [normal, roughness])

    useFrame((state) => {
        const updatedY = -state.clock.getElapsedTime() * 0.128 * speed;
        roughness.offset.set(0, updatedY);
        normal.offset.set(0, updatedY);
    })

    return (
        <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
            <planeGeometry args={[30, 30]} />
            <MeshReflectorMaterial
                envMapIntensity={0}
                normalMap={normal}
                normalScale={[0.15, 0.15]}
                roughnessMap={roughness}
                dithering={true}
                color={[0.015, 0.015, 0.015]}
                roughness={0.7}
                blur={[1000, 400]}
                mixBlur={30}
                mixStrength={80}
                mixContrast={1}
                resolution={1024}
                mirror={0}
                depthScale={0.01}
                minDepthThreshold={0.9}
                maxDepthThreshold={1}
                depthToBlurRatioBias={0.25}
                debug={0}
                reflectorOffset={0.2}
            />
        </mesh>
    )
}

export default Ground;