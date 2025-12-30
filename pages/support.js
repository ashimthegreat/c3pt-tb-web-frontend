import axios from "axios";

export default function Support({ tickets }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Support Tickets</h1>
      {tickets.map((t) => (
        <div key={t.id} style={{ marginBottom: "20px" }}>
          <h3>{t.subject}</h3>
          <p><strong>Name:</strong> {t.name}</p>
          <p><strong>Email:</strong> {t.email}</p>
          <p>{t.message}</p>
          <p><strong>Status:</strong> {t.status}</p>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    "https://c3pt-tb-web.onrender.com/api/support"
  );

  return { props: { tickets: res.data } };
}

