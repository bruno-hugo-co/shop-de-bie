import { Eyebrow } from "./Eyebrow";

type SectionHeaderProps = { eyebrow: string; title: string; lead: string; id: string };

export function SectionHeader({ eyebrow, title, lead, id }: SectionHeaderProps) {
  return (
    <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-16 gap-y-6">
      <div>
        <Eyebrow className="mb-[18px]">{eyebrow}</Eyebrow>
        <h2 id={id} className="display-h2">{title}</h2>
      </div>
      <p className="max-w-[30em] text-lg leading-[1.55] text-pretty text-muted">{lead}</p>
    </div>
  );
}
