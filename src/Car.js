import { useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Car() {
    const { scene } = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + 'assets/models/corvet_c7/scene.gltf',
    )

    useEffect(() => {
        scene.scale.set(0.005, 0.005, 0.005);
        scene.position.set(0, -0.035, 0);
        scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        })
    }, [scene])

    return <primitive object={scene} />
}