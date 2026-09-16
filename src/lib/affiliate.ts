/**
 * Amazon Associates–ready link builder.
 * Swap NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG once your Associates account is approved.
 * Do not claim an approved Associates account until the tag is real.
 */
export const AMAZON_ASSOCIATE_TAG =
  process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG ?? "YOURTAG-20";

export function amazonSearchUrl(query: string): string {
  const params = new URLSearchParams({
    k: query,
    tag: AMAZON_ASSOCIATE_TAG,
  });
  return `https://www.amazon.com/s?${params.toString()}`;
}
