import BookletBody from "@/components/ui/BookletBody";
import WalletBase from "@/components/wallet/walletBase";
import MoodBoard from "@/components/ui/MoodBoardBackup";
import styles from "./dashboard.module.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.dashboard}>
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
        {children}
      </div>
    </div>
  );
}
