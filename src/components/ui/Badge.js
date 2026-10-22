import styles from "./Badge.module.css";

export default function Badge({ children, variant = "pill", className = "", ...props }) {
  const variantClass = styles[variant] || styles.pill;
  return (
    <span className={`${styles.badge} ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
