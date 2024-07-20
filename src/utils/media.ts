import getSummary from "../lib/getAiSummary";

export const handleShareWarpCast = async (content: string, url: string) => {
  try {
    const postSummary = await getSummary(content).then((summary) => summary);
    const warptext = `${postSummary} ${url}`;
    const postPageUrl = encodeURI(warptext);
    window.open(
      `https://warpcast.com/~/compose?text=${postPageUrl}`,
      "_blank",
      "noreferrer noopener",
    );
  } catch (error) {
    console.error("Failed to share in WarpCast:", error);
  }
};
