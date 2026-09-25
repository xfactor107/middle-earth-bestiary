import "./HostingNotice.css";

// Explains the cold-start delay of Render's free tier to first-time visitors
export default function HostingNotice() {
  return (
    <p className="hosting-notice" role="note">
      Note: The backend runs on Render’s free tier, so after a period of inactivity the first
      visit may take 30–60 seconds to wake it. Once awake, pages load normally.
    </p>
  );
}
