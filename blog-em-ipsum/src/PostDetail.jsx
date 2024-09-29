import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation, updateTitle }) {
  // console.log(post);
  // replace with useQuery

  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) {
    return (
      <>
        <p>Fetching Post Details Please Wait...</p>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <h3>Can't Fetch the Post Details at the moment</h3>
      </>
    );
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        {deleteMutation.isError && (
          <p className="error">There is error in deleting the post</p>
        )}
        {deleteMutation.isPending && (
          <p className="pending">Deleting the Post</p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">Post (not) deleted</p>
        )}
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      </div>

      <div>
        {updateTitle.isPending && (
          <p className="pending">Updating the title...</p>
        )}
        {updateTitle.isSuccess && <p className="success"> the title was (not) updated</p>}
        {updateTitle.isError && (
          <p className="error">There is error while updating the title</p>
        )}
        <button onClick={() => updateTitle.mutate(post.id)}>Update title</button>
      </div>

      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
