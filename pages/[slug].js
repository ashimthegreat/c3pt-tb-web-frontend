import axios from "axios";
import Head from "next/head";

export default function Page({ pageData }) {
  if (!pageData) {
    return <h1>Page not found</h1>;
  }

  // Use environment variable for base URL
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://c3pt-tb-web-frontend.onrender.com";
  const url = `${BASE_URL}/${pageData.slug}`;
  const title = pageData.seo_title || pageData.title;
  const description = pageData.seo_description || "";
  const image = pageData.image_url || `${BASE_URL}/default-image.png`;

  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={url} />

        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>

      <main style={{ padding: "40px" }}>
        <h1>{pageData.title}</h1>
        <p>{pageData.content?.text}</p>
        {pageData.video_url && (
          <iframe
            width="560"
            height="315"
            src={pageData.video_url}
            title={pageData.title}
          />
        )}
      </main>
    </>
  );
}

// Since we only have index + slug pages, static paths are optional
export async function getStaticPaths() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pages`);
    const pages = res.data;

    const paths = pages.map((page) => ({
      params: { slug: page.slug },
    }));

    return { paths, fallback: false };
  } catch (error) {
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/pages/${params.slug}`
    );

    return {
      props: {
        pageData: res.data,
      },
      revalidate: 60, // ISR
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

