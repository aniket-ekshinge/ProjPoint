import React, { useEffect, useState, useContext } from "react";
import { getFeedbacks, submitFeedback } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import "./Feedback.css";

const FeedbackSection = ({ projectId }) => {
  const { user, token } = useContext(AuthContext); // ✅ Use user and token from context

  const [feedbacks, setFeedbacks] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await getFeedbacks(projectId, token); // ✅ pass token if required
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };

    if (token) fetchFeedbacks(); // ✅ fetch only if logged in
  }, [projectId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setLoading(true);
      await submitFeedback({ project: projectId, comment, rating }, token); // ✅ Secure with token
      setComment("");
      setRating(5);
      const data = await getFeedbacks(projectId, token); // refresh
      setFeedbacks(data);
    } catch (err) {
      console.error("Error submitting feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderReplies = (replies) => {
    return replies.map((reply) => (
      <div key={reply.id} className="reply">
        <strong>{reply.user}</strong> → {reply.comment}
        {reply.replies?.length > 0 && renderReplies(reply.replies)}
      </div>
    ));
  };

  if (!token) {
    return <p>You must be logged in to view and submit feedback.</p>;
  }

  return (
    <div className="feedback-container">
      <h3>Feedback</h3>

      <p>Logged in as <strong>{user?.name || user?.email}</strong></p>

      <form onSubmit={handleSubmit} className="feedback-form">
        <label>
          Rating:{" "}
          <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num} ⭐</option>
            ))}
          </select>
        </label>
        <textarea
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>

      <div className="feedback-list">
        {feedbacks.length > 0 ? (
          feedbacks.map((fb) => (
            <div key={fb.id} className="feedback-item">
              <div>
                <strong>{fb.user}</strong> rated {fb.rating} ⭐
                <p>{fb.comment}</p>
                {fb.replies?.length > 0 && renderReplies(fb.replies)}
              </div>
            </div>
          ))
        ) : (
          <p>No feedback yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackSection;
