"use client";

import { useApp } from "@/context/AppContext";

export default function ToastNotification() {
  const { toastMessage, isToastVisible } = useApp();

  return (
    <output
      id="toast"
      aria-live="polite"
      className={isToastVisible ? "show" : ""}
    >
      {toastMessage}
    </output>
  );
}
