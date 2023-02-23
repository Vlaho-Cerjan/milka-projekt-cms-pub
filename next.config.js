import { withPlaiceholder } from "@plaiceholder/next";
export default withPlaiceholder(
  {
    redirects: async () => {
      return [
        {
          source: "/",
          destination: "/pages",
          permanent: true,
        },
      ];
    },
    reactStrictMode: true,
    images: {
      unoptimized: true,
      deviceSizes: [400, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [8, 16, 32, 48, 64, 96, 128, 256, 384],
    },
    experimental: {
      esmExternals: true,
    },
    compiler: {
      styledComponents: true,
    }
  }
);