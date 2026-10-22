"use client";

import AnswerOptionButton from "./AnswerOptionButton";

export default function AnswerGroup({
  options = [],
  correctIndex,
  selectedIndex,
  isChecked,
  onSelectOption,
}) {
  return (
    <section className="answers" id="answers" aria-label="Alternativas">
      {options.map((optionText, idx) => {
        const letter = String.fromCharCode(65 + idx); // A, B, C, D
        return (
          <AnswerOptionButton
            key={idx}
            letter={letter}
            text={optionText}
            index={idx}
            isChecked={isChecked}
            isCorrect={idx === correctIndex}
            isSelected={idx === selectedIndex}
            onSelect={onSelectOption}
          />
        );
      })}
    </section>
  );
}
