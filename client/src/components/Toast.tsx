import { useEffect, useState } from "react";

interface ToastProps {
  type: "success" | "error";
  message: string;
  subMessage: string;
  onClose: () => void;
}

export default function Toast({ type, message, subMessage, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      className="toast-wrapper"
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        left: "auto",
        transform: "none",
        zIndex: 9999,
        width: "100%",
        maxWidth: "360px",
        animation: visible
          ? "slideInRight 0.3s ease forwards"
          : "slideOutRight 0.3s ease forwards",
      }}
    >
      <div
        style={{
          background: "#111827",
          borderRadius: "12px",
          borderLeft: `3px solid ${isSuccess ? "#22c55e" : "#ef4444"}`,
          border: `0.5px solid ${isSuccess ? "#22c55e" : "#ef4444"}`,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Content */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "16px 16px 14px",
        }}>

          {/* Icon */}
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: isSuccess ? "#dcfce7" : "#fee2e2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            {isSuccess ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#16a34a" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#dc2626" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            <p style={{
              margin: "0 0 3px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#ffffff",
            }}>
              {message}
            </p>
            <p style={{
              margin: 0,
              fontSize: "12px",
              color: "#9ca3af",
              lineHeight: 1.5,
            }}>
              {subMessage}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              setVisible(false);
              setTimeout(onClose, 300);
            }}
            style={{
              background: "none",
              border: "none",
              color: "#9ca3af",
              cursor: "pointer",
              fontSize: "14px",
              padding: "0",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: "3px", background: "#1f2937" }}>
          <div style={{
            height: "100%",
            background: isSuccess ? "#22c55e" : "#ef4444",
            animation: "shrink 4s linear forwards",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(60px); }
        }
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }

        @media (max-width: 480px) {
          .toast-wrapper {
            right: 12px !important;
            left: 12px !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
