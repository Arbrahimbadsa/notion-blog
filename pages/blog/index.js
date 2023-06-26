import Blogs from "@/components/Blog/Blogs";
import React from "react";
import axios from "axios";

function blog({ results }) {
  return (
    <div className="py-[50px]">
      <Blogs results={results} blogPage />
    </div>
  );
}

export default blog;

export async function getStaticProps() {
  try {
    const { data } = await axios.get(
      `${process.env.ENDPOINT}/api/notion?query=blogs`
    );
    return {
      props: {
        results: data?.results,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
