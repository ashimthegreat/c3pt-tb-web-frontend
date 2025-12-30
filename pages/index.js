import axios from "axios";
import Head from "next/head";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// ===== Header =====
const Header = () => (
  <header className="bg-white shadow-md fixed w-full z-50">
    <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:p-6">
      <div className="text-2xl font-bold text-orange-600">Techbuket</div>
      <nav className="space-x-6 hidden md:flex font-medium">
        <a href="#services" className="hover:text-orange-600 transition">Services</a>
        <a href="#products" className="hover:text-orange-600 transition">Products</a>
        <a href="#partners" className="hover:text-orange-600 transition">Partners</a>
        <a href="#contact" className="hover:text-orange-600 transition">Contact</a>
      </nav>
    </div>
  </header>
);

// ===== Footer =====
const Footer = () => (
  <footer className="bg-gray-900 text-white py-10 text-center mt-20">
    <p>© 2026 Techbuket Pvt Ltd. All rights reserved.</p>
  </footer>
);

// ===== Hero Section =====
const HeroSection = () => (
  <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white h-screen flex flex-col justify-center items-center text-center px-4">
    <motion.h1
      className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Futuristic Tech Solutions
    </motion.h1>
    <motion.p
      className="text-lg md:text-2xl mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      Innovating Businesses with Cutting-Edge Technology
    </motion.p>
    <motion.button
      className="bg-white text-orange-600 font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
      whileHover={{ scale: 1.1, backgroundColor: "#F97316", color: "white" }}
    >
      Get Started
    </motion.button>
  </section>
);

// ===== Scroll-Animated Section Wrapper =====
const AnimatedSection = ({ children, className, id }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      }}
      className={`py-20 px-4 md:px-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};

// ===== Gradient Card =====
const Card = ({ title, description }) => (
  <motion.div
    className="bg-gradient-to-br from-orange-50 to-white shadow-lg rounded-xl p-6 hover:shadow-2xl cursor-pointer transition-transform"
    whileHover={{ scale: 1.05 }}
  >
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

// ===== Main Home Page =====
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

      <Header />
      <main className="font-sans text-gray-900 pt-20">
        <HeroSection />

        <AnimatedSection id="services" className="bg-gray-50 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <Card key={s.id} title={s.name} description={s.description} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="products">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p) => (
              <Card key={p.id} title={p.name} description={p.description} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="partners" className="bg-gray-50 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">Our Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {partners.map((p) => (
              <motion.img
                key={p.id}
                src={p.logo || "https://via.placeholder.com/150x80?text=Partner"}
                alt={p.name}
                className="h-20 object-contain grayscale hover:grayscale-0 transition duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" className="bg-orange-500 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Innovate?</h2>
          <p className="mb-6">Reach out to us today and transform your business.</p>
          <motion.button
            className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full shadow-lg"
            whileHover={{ scale: 1.1, backgroundColor: "#F97316", color: "white" }}
          >
            Contact Us
          </motion.button>
        </AnimatedSection>
      </main>

      <Footer />
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

