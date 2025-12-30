import React from "react";
import axios from "axios";

export default function Page({ pageData }) {
  if (!pageData) {
    return <h1>Page not found</h1>;
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>{pageData.title}</h1>
      {pageData.content?.text && <p>{pageData.content.text}</p>}
      {pageData.video_url && (
        <iframe
          width="560"
          height="315"
          src={pageData.video_url}
          title="Video"
        />
      )}
    </main>
  );
}

// List all slugs you want to pre-render
export async function getStaticPaths() {
  const slugs = [
    "home",
    "about-us",
    "products",
    "services",
    "contact",
    "events",
    "support",
    "knowledge-base",
  ];

  const paths = slugs.map((slug) => ({ params: { slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(
      `https://c3pt-tb-web.onrender.com/api/pages/${params.slug}`
    );

    return {
      props: {
        pageData: res.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

