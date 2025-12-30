import axios from "axios";
import Head from "next/head";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// ===== Scroll-Animated Section Wrapper =====
const AnimatedSection = ({ children, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
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

// ===== Main Page Component =====
export default function Page({ pageData }) {
  if (!pageData) return <h1 className="text-center text-3xl mt-20">Page not found</h1>;

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://c3pt-tb-web-frontend.onrender.com";
  const url = `${BASE_URL}/${pageData.slug}`;
  const title = pageData.seo_title || pageData.title;
  const description = pageData.seo_description || "";
  const image = pageData.image_url || `${BASE_URL}/default-image.png`;

  return (
    <>
      <Head>
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

      <main className="font-sans text-gray-900">
        <AnimatedSection className="bg-gradient-to-r from-orange-100 to-white text-center rounded-xl shadow-lg">
          <motion.h1 className="text-5xl md:text-6xl font-extrabold mb-6">{pageData.title}</motion.h1>
          <motion.p className="text-lg md:text-xl text-gray-700">{pageData.content?.text}</motion.p>
        </AnimatedSection>

        {pageData.video_url && (
          <AnimatedSection className="text-center">
            <iframe
              width="100%"
              height="500"
              src={pageData.video_url}
              title={pageData.title}
              className="rounded-xl shadow-lg"
            />
          </AnimatedSection>
        )}
      </main>
    </>
  );
}

// ===== Static Paths =====
export async function getStaticPaths() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pages`);
    const pages = res.data;

    const paths = pages.map((page) => ({ params: { slug: page.slug } }));
    return { paths, fallback: false };
  } catch (error) {
    return { paths: [], fallback: false };
  }
}

// ===== Static Props =====
export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pages/${params.slug}`);
    return { props: { pageData: res.data } };
  } catch (error) {
    return { notFound: true };
  }
}

