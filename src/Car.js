import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Car({
    speed = 1
}) {
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

    useFrame((state) => {
        const updatedX = state.clock.getElapsedTime() * 2 * speed;
        const group = scene.children[0].children[0].children[0];

        group.children[0].rotation.x = updatedX;
        group.children[2].rotation.x = updatedX;
        group.children[4].rotation.x = updatedX;
        group.children[6].rotation.x = updatedX;
    })

    return <primitive object={scene} />
}