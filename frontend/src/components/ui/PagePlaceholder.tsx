type PagePlaceholderProps = {
  title: string;
  text: string;
};

export function PagePlaceholder({ title, text }: PagePlaceholderProps) {
  return (
    <section className="page-placeholder">
      <div className="page-placeholder__card">
        <h1 className="page-placeholder__title">{title}</h1>
        <p className="page-placeholder__text">{text}</p>
      </div>
    </section>
  );
}