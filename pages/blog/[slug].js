import Link from "next/link";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";
import Container from "@/components/layout/Container";
import axios from "axios";
import dateFormat from "dateformat";

function blogpage({ data }) {
  const title = data?.properties?.Name?.title[0]?.plain_text;
  const content = data?.properties?.Description?.rich_text[0]?.plain_text;
  const tags = data?.properties?.Tags?.multi_select?.map((item) => item.name);
  const createdAt = data?.properties?.Created?.created_time;
  const author = data?.properties?.Author?.people[0];
  /*
  {
    "Updated": {
        "id": "CY%3Cm",
        "type": "last_edited_time",
        "last_edited_time": "2023-05-29T13:42:00.000Z"
    },
    "Published": {
        "id": "FYbH",
        "type": "checkbox",
        "checkbox": true
    },
    "Tags": {
        "id": "Ii%60D",
        "type": "multi_select",
        "multi_select": [
            {
                "id": "5d780d70-3a2f-4ab6-9907-ba8c5c7c394c",
                "name": "Company News",
                "color": "blue"
            },
            {
                "id": "148703ad-481e-40db-9592-11adf959770d",
                "name": "Engineering",
                "color": "default"
            }
        ]
    },
    "Created": {
        "id": "N%7DAn",
        "type": "created_time",
        "created_time": "2023-05-29T13:42:00.000Z"
    },
    "Cover": {
        "id": "YN_a",
        "type": "files",
        "files": [
            {
                "name": "fabrizio-conti-kXVogATbFgA-unsplash.jpg",
                "type": "file",
                "file": {
                    "url": "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9f8be005-119d-46ea-8a76-252966949122/fabrizio-conti-kXVogATbFgA-unsplash.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230529%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230529T151021Z&X-Amz-Expires=3600&X-Amz-Signature=6607f2161134b48a56ab1b400a67b3a0408335e333800761c13418f932e0cc89&X-Amz-SignedHeaders=host&x-id=GetObject",
                    "expiry_time": "2023-05-29T16:10:21.905Z"
                }
            }
        ]
    },
    "Slug": {
        "id": "Ytq%3C",
        "type": "formula",
        "formula": {
            "type": "string",
            "string": "Visual-Editing:-Click-to-edit-content-for-headless-CMSes-2c7086ffb4d64e729fb2b6ba9eeb6f4d"
        }
    },
    "Author": {
        "id": "%5C%7CLS",
        "type": "people",
        "people": [
            {
                "object": "user",
                "id": "8fd22066-9f4b-4285-b634-03bda4f21bc7"
            }
        ]
    },
    "Description": {
        "id": "%5C%7Cdb",
        "type": "rich_text",
        "rich_text": [
            {
                "type": "text",
                "text": {
                    "content": "The next step in faster collaboration is here for Vercel's frontend cloud.",
                    "link": null
                },
                "annotations": {
                    "bold": false,
                    "italic": false,
                    "strikethrough": false,
                    "underline": false,
                    "code": false,
                    "color": "default"
                },
                "plain_text": "The next step in faster collaboration is here for Vercel's frontend cloud.",
                "href": null
            }
        ]
    },
    "No": {
        "id": "zDpw",
        "type": "number",
        "number": null
    },
    "Name": {
        "id": "title",
        "type": "title",
        "title": [
            {
                "type": "text",
                "text": {
                    "content": "Visual Editing: Click-to-edit content for headless CMSes",
                    "link": null
                },
                "annotations": {
                    "bold": true,
                    "italic": false,
                    "strikethrough": false,
                    "underline": false,
                    "code": false,
                    "color": "default"
                },
                "plain_text": "Visual Editing: Click-to-edit content for headless CMSes",
                "href": null
            }
        ]
    }
}
  
  */
  return (
    <>
      <Container>
        <BpgaeHeader createdAt={createdAt} tags={tags} title={title} />
        <div className="max-lg:flex-col bpagegrid">
          <BpageContent content={content} />
          <BpageSidebar author={author} />
        </div>
      </Container>
    </>
  );
}

const BpgaeHeader = ({ title, tags, createdAt }) => {
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
        {/* <p className="text-[24px] text-secondary-900 tracking-[-.04em] leading-[1.5]">
          Get detailed, first-party page views, traffic analytics, and now
          custom events with Vercel Web Analytics
        </p> */}
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
            Engineering Manager{" "}
          </span>
        </div>
      </div>
      {/* Author Component - End */}
    </div>
  );
};

const BpageContent = ({ content }) => {
  return (
    <div className="lg:border-r-[1px] lg:border-danger-900">
      <h2>{content}</h2>
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
  return {
    props: {
      data: data?.Results[0],
    },
  };
}
