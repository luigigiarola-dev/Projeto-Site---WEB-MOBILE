"use client";

import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  href,
  className = "",
  title,
  ariaLabel,
  ...props
}) {
  const variantClass = styles[variant] || styles.primary;
  const combinedClassName = `${styles.button} ${variantClass} ${className}`.trim();

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClassName}
        title={title}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}
