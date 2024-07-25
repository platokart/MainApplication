import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import image3 from "../Assests/image3.png";
const Article = () => {
  //article id
  const { id } = useParams();
  console.log(id);
  const [initialComment, setNewComment] = useState("");
  //comments are stored from api response
  const [commentsList, setCommentsList] = useState([]);
  const onChangeComment = (event) => {
    setNewComment(event.target.value);
  };
  const [articleData, setArticleData] = useState({});
  const [addCommentData, setAddCommentData] = useState("");
  //reply is used
  const [replyClicked, setReplyClicked] = useState(false);
  const [replyData, setReplyData] = useState("");
  const [commentId,setCommentId] = useState("");
  console.log("comment id :",commentId);

  const getArticle = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/customer/home/about/articles/${id}`
      );
      const data = await response.json();
      setArticleData(data.article);
      setCommentsList(data.article.comments);
      console.log("article data: ", data.article);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  //for posting comment
  const onAddComment = async (event) => {
    event.preventDefault();
    try {
      const userId = localStorage.getItem("id");
      const reqBody = {
        articleId: id,
        userId,
        content: addCommentData,
      };
      const response = await fetch(
        `http://localhost:5000/customer/home/about/articles/${id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );
      if (response.ok === true) {
        getArticle();
        setAddCommentData("");
      }
    } catch (e) {
      console.log(e);
    }
    // const newComment = {
    //   id: uuidv4(),
    //   initialComment,
    // };
    // setCommentsList((prevCommentsList) => [...prevCommentsList, newComment]);
    // setNewComment("");
  };

  // for posting reply
  const handlePostReply = async(e) =>{
    e.preventDefault();
    try {
      const userId = localStorage.getItem("id");
      const requestBody = {
        articleId: id,
        userId,
        content: replyData,
        commentId,
      };
      const response = await fetch(
        `http://localhost:5000/customer/home/about/articles/${id}/${commentId}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (response.ok === true) {
        const data = await response.json();
        console.log(data.message);
        // getArticle();
        setReplyClicked(false);
        
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="main-container">
      <div className="left-side-container">
        {/*Add Background Image and matter upon it */}
        {/** title of article */}
        <h1>{articleData?.title}</h1>
        {/** article content */}
        <p>{articleData?.content}</p>
        {/* <p>
          Sociis consequat adipiscing sit curabitur donec sem luctus cras
          natoque vulputate dolor eget dapibus. Nec vitae eros ullamcorper
          laoreet dapibus mus ac ante viverra. A aenean sit augue curabitur et
          parturient nisi sed enim. Nulla nec quis sit quisque sem commodo
          ultricies neque. Lorem eget venenatis dui ante luctus ultricies tellus
          montes. Quis in sapien tempus.
        </p>
        <p>
          Sociis consequat adipiscing sit curabitur donec sem luctus cras
          natoque vulputate dolor eget dapibus. Nec vitae eros ullamcorper
          laoreet dapibus mus ac ante viverra. A aenean sit augue curabitur et
          parturient nisi sed enim. Nulla nec quis sit quisque sem commodo
          ultricies neque. Lorem eget venenatis dui ante luctus ultricies tellus
          montes. Quis in sapien tempus.
        </p> */}
        <img src={articleData?.imageUrl} alt="img-2" />
        {/* <p>
          Sociis consequat adipiscing sit curabitur donec sem luctus cras
          natoque vulputate dolor eget dapibus. Nec vitae eros ullamcorper
          laoreet dapibus mus ac ante viverra. A aenean sit augue curabitur et
          parturient nisi sed enim. Nulla nec quis sit quisque sem commodo
          ultricies neque. Lorem eget venenatis dui ante luctus ultricies tellus
          montes. Quis in sapien tempus.
        </p>
        <p>
          Sociis consequat adipiscing sit curabitur donec sem luctus cras
          natoque vulputate dolor eget dapibus. Nec vitae eros ullamcorper
          laoreet dapibus mus ac ante viverra. A aenean sit augue curabitur et
          parturient nisi sed enim. Nulla nec quis sit quisque sem commodo
          ultricies neque. Lorem eget venenatis dui ante luctus ultricies tellus
          montes. Quis in sapien tempus.
        </p> */}
        <div className="noof-comments-container">
          <p>16 comments</p>
          <div className="sorting-container">
            <p>Sort by</p>
            <select>
              <option>oldest</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
        <hr />
        <form onSubmit={onAddComment}>
          <textarea
            cols="40"
            rows="5"
            placeholder="Add a Comment"
            onChange={(e) => setAddCommentData(e.target.value)}
            value={addCommentData}
          />
          <div className="post-btn-container">
            <button type="submit">Post</button>
          </div>
          {articleData?.comments?.length > 0 ? (
            commentsList.map((e) => (
              <>
                <div className="article-page-comment-item">
                  <h3 className="article-page-comment-heading">{e.author}</h3>
                  <p className="article-page-comment-content">{e.content}</p>
                  <div className="article-page-comment-item-date-con">
                    <span className="article-page-comment-item-reply-span" onClick={()=>{setReplyClicked(!replyClicked);setCommentId(e._id)}}>
                      Reply
                    </span>
                    <p className="article-page-comment-item-date">
                      {e.createdAt}
                    </p>
                  </div>
                </div>
                {replyClicked === true && commentId === e._id && (
                  <div>
                    <form onSubmit={handlePostReply}>
                    <textarea
                      cols="40"
                      rows="5"
                      placeholder="Post Reply"
                      onChange={(e) => setReplyData(e.target.value)}
                      value={replyData}
                    />
                    <div className="post-btn-container">
                      <button type="submit">Post</button>
                    </div>
                    </form>
                  </div>                  
                )}
              </>
            ))
          ) : (
            <h3>No comments yet</h3>
          )}
          <button className="btn-load-comments">Load 13 more comments</button>
        </form>
        {/** comments item */}
      </div>

      <div className="right-side-container">
        <div>
          <p>Share the article</p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M19.953 10.9823C19.953 5.97557 15.8895 1.91211 10.8827 1.91211C5.87596 1.91211 1.8125 5.97557 1.8125 10.9823C1.8125 15.3723 4.93266 19.0276 9.06868 19.8712V13.7034H7.25464V10.9823H9.06868V8.71478C9.06868 6.96423 10.4927 5.5402 12.2433 5.5402H14.5108V8.26127H12.6968C12.1979 8.26127 11.7898 8.66943 11.7898 9.16829V10.9823H14.5108V13.7034H11.7898V20.0072C16.3702 19.5537 19.953 15.6898 19.953 10.9823Z"
                fill="#16163F"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
            >
              <path
                d="M19.3361 1.91224H3.97013C3.7974 1.90984 3.62589 1.94149 3.4654 2.00538C3.3049 2.06927 3.15857 2.16415 3.03474 2.2846C2.91092 2.40506 2.81204 2.54872 2.74375 2.70739C2.67545 2.86607 2.63908 3.03664 2.63672 3.20937V18.7568C2.63908 18.9295 2.67545 19.1001 2.74375 19.2587C2.81204 19.4174 2.91092 19.5611 3.03474 19.6815C3.15857 19.802 3.3049 19.8969 3.4654 19.9608C3.62589 20.0247 3.7974 20.0563 3.97013 20.0539H19.3361C19.5089 20.0563 19.6804 20.0247 19.8409 19.9608C20.0014 19.8969 20.1477 19.802 20.2715 19.6815C20.3953 19.5611 20.4942 19.4174 20.5625 19.2587C20.6308 19.1001 20.6672 18.9295 20.6695 18.7568V3.20937C20.6672 3.03664 20.6308 2.86607 20.5625 2.70739C20.4942 2.54872 20.3953 2.40506 20.2715 2.2846C20.1477 2.16415 20.0014 2.06927 19.8409 2.00538C19.6804 1.94149 19.5089 1.90984 19.3361 1.91224ZM8.10643 17.0968H5.38518V8.93306H8.10643V17.0968ZM6.74581 7.79014C6.37051 7.79014 6.01059 7.64105 5.74521 7.37568C5.47984 7.1103 5.33076 6.75038 5.33076 6.37509C5.33076 5.99979 5.47984 5.63987 5.74521 5.3745C6.01059 5.10912 6.37051 4.96004 6.74581 4.96004C6.94509 4.93744 7.1469 4.95718 7.33802 5.01798C7.52914 5.07878 7.70526 5.17927 7.85486 5.31286C8.00445 5.44644 8.12414 5.61012 8.20609 5.79318C8.28804 5.97623 8.33041 6.17453 8.33041 6.37509C8.33041 6.57565 8.28804 6.77394 8.20609 6.957C8.12414 7.14005 8.00445 7.30373 7.85486 7.43732C7.70526 7.5709 7.52914 7.67139 7.33802 7.73219C7.1469 7.79299 6.94509 7.81274 6.74581 7.79014ZM17.9211 17.0968H15.1998V12.7156C15.1998 11.618 14.8098 10.9014 13.8211 10.9014C13.5151 10.9037 13.2171 10.9997 12.9673 11.1764C12.7176 11.3532 12.528 11.6023 12.4241 11.8902C12.3532 12.1034 12.3224 12.3279 12.3334 12.5523V17.0877H9.61219C9.61219 17.0877 9.61219 9.6678 9.61219 8.92399H12.3334V10.076C12.5806 9.64703 12.9402 9.29364 13.3734 9.05389C13.8065 8.81413 14.2969 8.69709 14.7916 8.71536C16.6058 8.71536 17.9211 9.8855 17.9211 12.3981V17.0968Z"
                fill="#16163F"
              />
            </svg>
            {/*<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
  <g clip-path="url(#clip0_269_7485)">
    <mask id="mask0_269_7485" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="18">
      <path d="M18.4409 0H0.539062V17.9019H18.4409V0Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_269_7485)">
      <path d="M16.343 0H2.63694C1.47831 0 0.539062 0.93925 0.539062 2.09787V15.804C0.539062 16.9626 1.47831 17.9019 2.63694 17.9019H16.343C17.5017 17.9019 18.4409 16.9626 18.4409 15.804V2.09787C18.4409 0.93925 17.5017 0 16.343 0Z" fill="#16163F"/>
      <path d="M12.9813 3.49609H14.8319L10.7889 8.11701L15.5452 14.405H11.821L8.90416 10.5914L5.56659 14.405H3.71488L8.03928 9.46245L3.47656 3.49609H7.29523L9.93184 6.98192L12.9813 3.49609ZM12.3318 13.2974H13.3573L6.73804 4.54559H5.63763L12.3318 13.2974Z" fill="white"/>
    </g>
  </g>
  <defs>
    <clipPath id="clip0_269_7485">
      <rect width="17.9019" height="17.9019" fill="white" transform="translate(0.539062)"/>
    </clipPath>
  </defs>
</svg>*/}
          </div>
        </div>
        <p>
          Subscription Subscribe to our newsletter and receive a selection of
          cool articles every weeks
        </p>
        <input type="text" placeholder="Enter your Email" />
        <button>Subscribe</button>
        <div className="checkbox-container">
          <input type="checkbox" id="checkbox-1" />
          <label htmlFor="checkbox-1">
            By checking this box, you confirm that you have read and are
            agreeing to our terms of use regarding the storage of the data
            submitted through this form.
          </label>
        </div>
        <div>
          <p>The Latest </p>
          {/*Add Background Image and matter upon it */}
          <div>
            <p>
              10 Habits That Will Change Your Live for the Better If envy and
              jealousy are impacting your friendships
            </p>
            <div className="latest-article-time">
              <p>June 21,2023</p>
              <div className="time-symbol-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="time-symbol"
                >
                  <path
                    d="M9.83276 15.4512C12.8384 15.4512 15.2749 13.0146 15.2749 10.009C15.2749 7.00342 12.8384 4.56689 9.83276 4.56689C6.82715 4.56689 4.39062 7.00342 4.39062 10.009C4.39062 13.0146 6.82715 15.4512 9.83276 15.4512Z"
                    stroke="#121416"
                    stroke-opacity="0.81"
                    stroke-width="0.777448"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.83358 10.0088L8.01953 11.2181M9.83358 6.98535V10.0088"
                    stroke="#121416"
                    stroke-opacity="0.81"
                    stroke-width="0.777448"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>2 mins read</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
