export const replaceS3WithCloudFront = (url) => {
  if (!url) return url;
  const s3Pattern = /^https:\/\/kids-bags\.s3\.eu-north-1\.amazonaws\.com/;
  const cloudFrontDomain =
    process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN ||
    "https://d229x2i5qj11ya.cloudfront.net";

  let newUrl = url.replace(s3Pattern, cloudFrontDomain);

  const domainEndIndex = newUrl.indexOf("/", 8); // Start after 'https://'
  if (domainEndIndex !== -1) {
    const protocolAndDomain = newUrl.slice(0, domainEndIndex);
    const path = newUrl.slice(domainEndIndex).replace(/\/+/, "/");
    newUrl = protocolAndDomain + path;
  }

  return newUrl;
};
