const configuredTag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG?.trim() ?? "";

export const AMAZON_ASSOCIATE_TAG = /^[a-z0-9-]{3,30}-20$/i.test(configuredTag)
  ? configuredTag
  : null;

export function amazonSearchUrl(query: string): string {
  const params = new URLSearchParams({ k: query });
  if (AMAZON_ASSOCIATE_TAG) params.set("tag", AMAZON_ASSOCIATE_TAG);
  return `https://www.amazon.com/s?${params.toString()}`;
}
