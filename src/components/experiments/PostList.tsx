import { useEffect, useState } from "react";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Post = ({ post }: { post: IPost }) => {
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.body}</div>
    </div>
  );
};

export default function PostList() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return posts.map((post) => <Post key={post.body} post={post} />);
}
