import Link from "next/link";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";
import Container from "@/components/layout/Container";
import axios from "axios";
import dateFormat from "dateformat";
import BlockRenderer from "@/components/BlockRenderer";
import { addIndexToNumberedListItems } from "@/utils/addIndex";

function blogpage({ data, blocks }) {
  const title = data?.properties?.Name?.title[0]?.plain_text;
  const des = data?.properties?.Description?.rich_text[0]?.plain_text;
  const tags = data?.properties?.Tags?.multi_select?.map((item) => item.name);
  const createdAt = data?.properties?.Created?.created_time;
  const author = data?.properties?.Author?.people[0];
  console.log(data);
  console.log(blocks);
  return (
    <>
      <Container>
        <BpgaeHeader
          description={des}
          createdAt={createdAt}
          tags={tags}
          title={title}
        />
        <div className="max-lg:flex-col bpagegrid">
          <BpageContent blocks={blocks} />
          <BpageSidebar author={author} />
        </div>
      </Container>
    </>
  );
}

const BpgaeHeader = ({ title, tags, createdAt, description }) => {
  return (
    <div className="flex flex-col py-[24px]">
      <div>
        <Link
          className="inline-flex items-center gap-3 text-[14px] text-gray-200 hover:text-white hover-500"
          href="/"
        >
          <BsArrowLeftShort className="w-[21px] h-[21px]" />{" "}
          <span>Back to Blog</span>
        </Link>
      </div>
      <div className="flex flex-col gap-7 mt-[65px]">
        <div className="flex items-center gap-3 text-[14px] font-light">
          {tags?.map((tag, i) => (
            <span
              key={i}
              className="py-[6px] px-[12px] rounded-[32px] whitespace-nowrap bg-danger-800 text-danger border-[1px] border-danger"
            >
              {tag}
            </span>
          ))}
          <span className="text-secondary-900">
            {dateFormat(createdAt, "dddd, mmmm dS yyyy")}
          </span>
        </div>
        <h1 className="text-[48px] font-semibold tracking-[-.04em] leading-[1.25]">
          {title}
        </h1>
        <p className="text-[24px] text-secondary-900 tracking-[-.04em] leading-[1.5]">
          {description}
        </p>
      </div>
    </div>
  );
};

const BpageSidebar = ({ author }) => {
  const userImage = author?.avatar_url ?? "";
  const loader = ({ src }) => userImage;
  return (
    <div className="mx-5">
      <h2>Posted by</h2>
      {/* Author Component - Start */}
      <div className="flex gap-4 items-center my-3">
        <Image
          loader={loader}
          src={userImage}
          alt="author"
          className="w-[40px] h-[40px] !rounded-full object-fill"
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <h6 className="text-[17px] font-medium">{author?.name}</h6>
          <span className="text-[14px] font-normal text-gray-200">
            Engineering Manager
          </span>
        </div>
      </div>
      {/* Author Component - End */}
    </div>
  );
};

const BpageContent = ({ blocks }) => {
  const blocksWithIndex = addIndexToNumberedListItems(blocks);
  return (
    <div className="lg:border-r-[1px] lg:border-danger-900">
      {blocksWithIndex.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
};

export default blogpage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const url = `${process.env.ENDPOINT}/api/blogs?query=blogs&slug=${slug}`;
  const { data } = await axios.get(url);
  const blockUrl = `${process.env.ENDPOINT}/api/blocks?pageId=${data?.Results[0]?.id}`;
  const { data: blocks } = await axios.get(blockUrl);
  return {
    props: {
      data: data?.Results[0],
      blocks,
    },
  };
}
