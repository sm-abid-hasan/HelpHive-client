import Link from "next/link";
import { FaRegFaceSmile } from "react-icons/fa6";
import Container from "./Container";


export default function EmptyState({ title, text, actionHref, actionLabel }) {
  return (
    <Container className="py-20">
      <div className="mx-auto flex max-w-md flex-col items-center rounded-box border border-dashed border-base-300 bg-base-200/60 px-6 py-12 text-center">
        <FaRegFaceSmile className="mb-4 text-4xl text-primary" />
        <h2 className="section-heading text-2xl">{title}</h2>
        {text && <p className="mt-2 opacity-75">{text}</p>}
        {actionHref && (
          <Link href={actionHref} className="btn btn-primary mt-6">
            {actionLabel}
          </Link>
        )}
      </div>
    </Container>
  );
}
