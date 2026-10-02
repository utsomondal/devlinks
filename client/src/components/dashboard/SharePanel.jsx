import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, Link as LinkIcon } from "lucide-react";
import toast from "react-hot-toast";

const SharePanel = ({ username }) => {
  const [copied, setCopied] = useState(false);

  if (!username) return null;

  const shareUrl = `${window.location.origin}/u/${username}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div className="rounded-3xl border border-base-300/60 bg-base-100/60 p-5 shadow-sm backdrop-blur-md">
      <h2 className="mb-4 text-lg font-bold">Share</h2>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="rounded-xl border border-black bg-white p-4 shadow-sm shrink-0">
          <QRCodeSVG
            value={shareUrl}
            size={120}
            level="H"
            bgColor="#FFFFFF"
            fgColor="#000000"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <p className="text-xs text-base-content/50">
            Anyone can open your public profile with this link
          </p>

          <div className="flex items-center gap-2 rounded-xl border border-base-300/50 bg-base-200/40 px-3 py-2">
            <LinkIcon className="h-4 w-4 shrink-0 text-base-content/40" />
            <span className="truncate text-xs font-medium">{shareUrl}</span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="btn btn-primary btn-sm w-full gap-2 rounded-xl"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy link
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePanel;
