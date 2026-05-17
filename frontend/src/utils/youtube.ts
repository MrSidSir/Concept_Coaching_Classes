export async function fetchLatestVideos(apiKey: string, channelId: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=3`
  );
  const data = await response.json();
  return data.items.filter((item: any) => item.id.kind === "youtube#video");
}
