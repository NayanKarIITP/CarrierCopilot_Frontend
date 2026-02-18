

"use client";

export default function AITipsFeed({ tips = [] }: any) {
  return (
    <div className="glass rounded-2xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        AI Career Suggestions
      </h3>

      {tips.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No suggestions yet. Upload your resume to receive AI feedback 📄
        </p>
      )}

      <div className="space-y-3">
        {tips.map((tip: string, i: number) => (
          <div
            key={i}
            className="bg-card/40 border border-accent/30 rounded-lg p-4"
          >
            <p className="text-sm font-medium text-primary">Suggestion #{i + 1}</p>
            <p className="text-sm text-foreground mt-1">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
