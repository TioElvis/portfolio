interface Props {
  params: Promise<{ project_slug: string }>;
}

export default async function Page({ params }: Props) {
  const { project_slug } = await params;

  return <>Project {project_slug} page</>;
}
