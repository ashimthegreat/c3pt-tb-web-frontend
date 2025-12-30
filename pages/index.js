import axios from "axios";
import Head from "next/head";
import { motion } from "framer-motion";

// ===== Hero Section =====
const HeroSection = () => (
  <section className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-400 text-white h-screen flex flex-col justify-center items-center text-center px-6 md:px-20">
    <motion.h1
      className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Welcome to Techbuket
    </motion.h1>
    <motion.p
      className="text-lg md:text-2xl mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      Innovative Tech Solutions for Modern Businesses
    </motion.p>
    <motion.button
      className="bg-white text-orange-600 font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-orange-500 hover:text-white transition-all duration-300"
      whileHover={{ scale: 1.1 }}
    >
      Get Started
    </motion.button>
  </section>
);

// ===== Card Component =====
const Card = ({ title, description }) => (
  <motion.div
    className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300"
    whileHover={{ scale: 1.05 }}
  >
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </motion.div>
);

// ===== Partners Logo Component =====
const PartnerLogo = ({ logo, name }) => (
  <motion.img
    src={logo || "https://via.placeholder.com/150x80?text=Partner"}
    alt={name}
    className="h-20 object-contain grayscale hover:grayscale-0 transition duration-300 cursor-pointer"
    whileHover={{ scale: 1.05 }}
  />
);

// ===== Section Wrapper =====
const Section = ({ children, className }) => (
  <section className={`py-20 px-6 md:px-20 ${className}`}>{children}</section>
);

export default function Home({ products, services, partners }) {
  return (
    <>
      <Head>
        <title>Techbuket - Futuristic Tech Solutions</title>
        <meta
          name="description"
          content="Techbuket provides cutting-edge tech solutions for modern businesses."
        />
      </Head>

      <main className="font-sans text-gray-900">
        {/* Hero */}
        <HeroSection />

        {/* Services */}
        <Section className="bg-gray-50 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <Card key={s.id} title={s.name} description={s.description} />
            ))}
          </div>
        </Section>

        {/* Products */}
        <Section className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p) => (
              <Card key={p.id} title={p.name} description={p.description} />
            ))}
          </div>
        </Section>

        {/* Partners */}
        <Section className="bg-gray-50 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">Our Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {partners.map((p) => (
              <PartnerLogo key={p.id} logo={p.logo} name={p.name} />
            ))}
          </div>
        </Section>

        {/* Contact CTA */}
        <Section className="bg-orange-500 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Innovate?</h2>
          <p className="mb-6">
            Contact us today and transform your business with futuristic solutions.
          </p>
          <motion.button
            className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-orange-400 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Contact Us
          </motion.button>
        </Section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-6 text-center">
          &copy; {new Date().getFullYear()} Techbuket. All rights reserved.
        </footer>
      </main>
    </>
  );
}

// ===== Fetch Data =====
export async function getStaticProps() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://c3pt-tb-web.onrender.com";

  const [productsRes, servicesRes, partnersRes] = await Promise.all([
    axios.get(`${baseUrl}/api/products`),
    axios.get(`${baseUrl}/api/services`),
    axios.get(`${baseUrl}/api/partners`).catch(() => ({ data: [] })),
  ]);

  return {
    props: {
      products: productsRes.data || [],
      services: servicesRes.data || [],
      partners: partnersRes.data || [],
    },
  };
}

