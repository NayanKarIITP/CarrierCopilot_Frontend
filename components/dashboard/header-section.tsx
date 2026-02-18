
"use client";

export default function HeaderSection({ fullName }: { fullName: string }) {
  return (
    <div className="space-y-2 border-b border-border pb-6">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Welcome back, {fullName} 👋
      </h1>
      <p className="text-muted-foreground flex items-center gap-2">
        Your AI mentor is ready to guide your next career step.
      </p>
    </div>
  );
}
