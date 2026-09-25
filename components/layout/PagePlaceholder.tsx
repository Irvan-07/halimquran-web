interface PagePlaceholderProps {
  title: string;
  description?: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold text-foreground">
        {title}
      </h1>
      <p className="max-w-xl text-sm text-muted-foreground">
        {description ?? "Halaman ini masih dalam pengembangan."}
      </p>
    </div>
  );
}
