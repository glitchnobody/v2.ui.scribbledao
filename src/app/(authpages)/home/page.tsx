"use client";
import React from "react";
import styles from "./home.module.css";
import MoodBoard from "@/components/ui/MoodBoard";

export default function HomePage() {
  return (
    <main className={styles.page_container}>
      <MoodBoard />
    </main>
  );
}
