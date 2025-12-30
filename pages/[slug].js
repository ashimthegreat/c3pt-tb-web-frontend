import axios from 'axios';

export default function Page({ pageData }) {
  if (!pageData) {
    return <h1>Page not found</h1>;
  }

  return (
    <main style={{ padding: '40px' }}>
      <h1>{pageData.title}</h1>
      <p>{pageData.content?.text}</p>

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

export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    const res = await axios.get(
      `https://c3pt-tb-web.onrender.com/api/pages/${slug}`
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

