import styles from "./ProgressBar.module.css";

export default function ProgressBar({ value = 0, className = "" }) {
  const clamped = Math.min(100, Math.max(0, Number(value) || 0));

  return (
    <span
      className={`${styles.meter} ${className}`.trim()}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <i className={styles.fill} style={{ width: `${clamped}%` }} />
    </span>
  );
}
