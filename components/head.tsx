import Head from "next/head";

export default function MyHead(props: { title?: string }) {
  const formattedTitle = `${props.title && `${props.title} - `}Social Media`;
  return (
    <Head>
      <title>{formattedTitle}</title>
      <meta name="description" content="Social Media by NextJS" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}