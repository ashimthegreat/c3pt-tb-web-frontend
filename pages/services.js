import axios from "axios";

export default function Products({ products }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Products</h1>
      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: "20px" }}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    "https://c3pt-tb-web.onrender.com/api/products"
  );

  return { props: { products: res.data } };
}

