import Blogs from "@/components/Blog/Blogs";
import axios from "axios";
import Link from "next/link";

export default function Home({ results }) {
  return (
    <div>
      <Link href="/blog">
        <button className="btn btn-active btn-primary">All Blogs</button>
      </Link>
      <div>
        <Blogs results={results} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(
    `${process.env.ENDPOINT}/api/notion?query=blogs`
  );
  return {
    props: {
      results: data?.results,
    },
    revalidate: 5,
  };
}
