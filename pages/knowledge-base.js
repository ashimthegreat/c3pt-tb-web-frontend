import axios from "axios";

export default function KnowledgeBase({ articles }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Knowledge Base</h1>
      {articles.map((a) => (
        <div key={a.id} style={{ marginBottom: "20px" }}>
          <h3>{a.title}</h3>
          <p>{a.description}</p>
          {a.video_url && (
            <iframe
              width="560"
              height="315"
              src={a.video_url}
              title={a.title}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    "https://c3pt-tb-web.onrender.com/api/knowledge_base"
  );

  return { props: { articles: res.data } };
}

