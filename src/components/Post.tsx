/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import Moment from "react-moment";

import "github-markdown-css/github-markdown.css";
import colours from "../colours";

export interface PostData {
    title: string,
    content: string,
    author: { full_name: string },
    id: number,
    group: { name: string, organisation: { name: string } },
    inserted_at: string
}

const postListingStyle = css`
margin: 30px;
border-radius: 20px;
background-color: ${colours.lightGrey};
padding: 30px;
`;

export default function Post({ post }: { post: PostData }) {
    return <div css={postListingStyle}>
        <h2 css={{margin: 0}}>{post.title}</h2>
        <p><i>By {post.author.full_name}</i></p>
        <ReactMarkdown className="markdown-body" plugins={[gfm]}>{post.content}</ReactMarkdown>
        <p><i>Posted in {post.group.organisation.name} – {post.group.name} • <Moment local date={post.inserted_at} fromNow unit="day"/></i></p>
    </div>
}
