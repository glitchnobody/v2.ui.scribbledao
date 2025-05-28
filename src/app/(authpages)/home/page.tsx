"use client";
import React, { useRef } from "react";
import styles from "./home.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

export default function HomePage() {
  // Register plugins before using them
  gsap.registerPlugin(useGSAP, Draggable);

  const container = useRef(null);

  useGSAP(
    () => {
      Draggable.create(`.dragable_card`, {
        type: "x,y",
        edgeResistance: 0.65,
        inertia: true,
        bounds: container.current,
      });
    },
    { scope: container }
  );

  return (
    <main className={styles.page_container}>
      <div className={styles.content_container}>
        <h1 className={styles.breadcrumb}>Home</h1>
        <div ref={container} className={styles.moodboard}>
          <div
            className={`${styles.card} dragable_card`}
            style={{ top: "50%", left: "2%" }}
          >
            Card 1
          </div>
          <div
            className={`${styles.card} dragable_card`}
            style={{ top: "10%", left: "40%" }}
          >
            Card 2
          </div>
          <div
            className={`${styles.card} dragable_card`}
            style={{ top: "200px", left: "150px" }}
          >
            Card 3
          </div>
        </div>
        <div className={styles.alerts_container}></div>
      </div>
    </main>
  );
}
