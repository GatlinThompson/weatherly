import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer
      className={`${styles.footer} border-t-1 border-foreground flex flex-row items-center align-center justify-center px-4 gap-4 w-full text-secondary-foreground shadow-t-4 inset-shadow-sm `}
    >
      <p className="text-primary">Weatherly 2025</p>
    </footer>
  );
}
