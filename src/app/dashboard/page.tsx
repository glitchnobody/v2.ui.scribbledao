"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import styles from "./dashboard.module.css";
import Logo from "../Logo";
import Link from "next/link";
import BookletBody from "@/components/ui/BookletBody";
import { Icon } from "@iconify/react";
import WalletBase from "@/components/wallet/walletBase";

export default function page() {
  return (
    <main className={styles.dashboard}>
      <div className={styles.dashboard_panel_container}>
        <div className={styles.dashboard_side_panel}>
          <div className={styles.booklet_tab_container}>
            <BookletBody
              holeColor="var(--purple-950)"
              ringColor="var(--stone-950)"
            >
              helo
            </BookletBody>
          </div>
          <div className={styles.wallet_tab_container}>
            <WalletBase />
          </div>
        </div>
        <div className={styles.dashboard_main_panel}></div>
      </div>
    </main>
  );
}
