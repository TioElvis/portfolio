"use client";
import { useParams, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const params = useParams<{ project_slug: string }>();

  const slug = searchParams.get("slug");
  const parent = searchParams.get("parent");

  return (
    <>
      Section {slug} {parent} {params.project_slug} page
    </>
  );
}
