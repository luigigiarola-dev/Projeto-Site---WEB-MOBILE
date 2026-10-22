import Card from "@/components/ui/Card";

export default function LessonArticle({ lesson }) {
  if (!lesson) {
    return (
      <Card className="lesson-content">
        <h1>Conteúdo não encontrado</h1>
        <p>A aula solicitada não foi encontrada.</p>
      </Card>
    );
  }

  return (
    <Card className="lesson-content" as="section">
      <span className="eyebrow" id="lessonPhase">
        Fase {lesson.phase} · {lesson.phaseName}
      </span>
      <h1 id="lessonTitle">{lesson.title}</h1>

      {lesson.paragraphs?.map((p, idx) => (
        <p key={idx}>{p}</p>
      ))}

      {lesson.illustration && (
        <span className="lesson-illustration" aria-hidden="true">
          {lesson.illustration}
        </span>
      )}

      {lesson.highlights && lesson.highlights.length > 0 && (
        <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
          {lesson.highlights.map((h, i) => (
            <div
              key={i}
              style={{
                background: "var(--paper, #f8f8fc)",
                padding: "14px 18px",
                borderRadius: 16,
                borderLeft: "4px solid var(--purple, #6654e8)",
              }}
            >
              <strong style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span>{h.icon}</span> {h.title}
              </strong>
              <p style={{ margin: 0, fontSize: 14, color: "var(--muted, #727891)" }}>{h.text}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
