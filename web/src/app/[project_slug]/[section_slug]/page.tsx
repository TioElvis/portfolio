interface Props {
  params: Promise<{ section_slug: string }>;
}

export default async function Page({ params }: Props) {
  const { section_slug } = await params;

  return <>Section {section_slug} page</>;
}
