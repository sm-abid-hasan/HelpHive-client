import EmptyState from "@/components/common/EmptyState";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <EmptyState
      title="This page does not exist"
      text="The link may be broken, or the page may have been moved."
      actionHref="/"
      actionLabel="Go to home page"
    />
  );
}
