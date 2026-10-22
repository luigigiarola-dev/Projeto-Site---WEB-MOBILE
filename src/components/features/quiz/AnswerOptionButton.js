"use client";

export default function AnswerOptionButton({
  letter,
  text,
  index,
  isChecked,
  isCorrect,
  isSelected,
  onSelect,
}) {
  let statusClass = "";
  if (isChecked) {
    if (isCorrect) statusClass = "correct";
    else if (isSelected) statusClass = "wrong";
  }

  return (
    <button
      type="button"
      className={statusClass}
      disabled={isChecked}
      onClick={() => onSelect(index)}
    >
      <b>{letter}.</b> {text}
    </button>
  );
}
