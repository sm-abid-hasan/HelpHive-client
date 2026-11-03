
export default function SectionTitle({ title, subtitle, center = false, as: Tag = "h2" }) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <Tag className="section-heading text-3xl md:text-4xl">{title}</Tag>
      {subtitle && <p className="mt-3 text-base leading-relaxed opacity-75">{subtitle}</p>}
    </div>
  );
}
