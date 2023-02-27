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
    compiler: {
      styledComponents: true,
    },
    async headers() {
      // set headers for all routes
      return [
        {
          source: '/:path*', // matches all routes
          headers: [
            {
              key: "Access-Control-Allow-Credentials",
              value: "true",
            },
            {
              key: "Access-Control-Allow-Origin",
              value: "*",
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          ],
        },
      ];
    },
  }
);