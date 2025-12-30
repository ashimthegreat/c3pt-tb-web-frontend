import axios from "axios";

export default function Events({ events }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Events</h1>
      {events.map((e) => (
        <div key={e.id} style={{ marginBottom: "20px" }}>
          <h3>{e.title}</h3>
          <p>{e.description}</p>
          <p><strong>Date:</strong> {new Date(e.date).toLocaleDateString()}</p>
          <p><strong>Location:</strong> {e.location}</p>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    "https://c3pt-tb-web.onrender.com/api/events"
  );

  return { props: { events: res.data } };
}

