import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
    points: number;
  } | null;
  content: string;
  minutes: number;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const shownMins = post.minutes? post.minutes: "0";

  post.author.points = Math.floor(post.minutes/30);
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>{authorName} worked out for <b>{shownMins} minutes</b></small>
      <ReactMarkdown children={post.content} />
      {post.published && ( <small><b>{post.author.points} point(s)</b> earned from this exercise</small>)}
      {!post.published && ( <small> You can earn <b>{post.author.points} point(s)</b> from posting this exercise</small>)}
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
