import styles from "./Card.module.css";

export default function Card({ children, className = "", as: Component = "article", ...props }) {
  return (
    <Component className={`${styles.card} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
