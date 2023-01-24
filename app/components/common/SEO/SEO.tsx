import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

const settings = {
    meta: {
        rootUrl: "http://localhost:3000",
        title: "CMS Ambulanta Varela",
        description: "CMS",
        social: {
            graphic: "/images/logo/logo_transparent.png",
            instagram: "/ambulanta_varela",
            facebook: "/ambulanta.varela"
        },
    },
    routes: {
        authenticated: {
            pathAfterFailure: "/login",
        },
        public: {
            pathAfterFailure: "/login",
        },
    },
};

const socialTags = (page_info: any) => {
    const metaTags = [
    { name: "og:title", content: page_info.page_title },
    { name: "og:type", content: page_info.openGraphType },
    { name: "og:url", content: page_info.page_slug },
    { name: "og:image", content: page_info.image || settings.meta.social.graphic },
    { name: "og:description", content: page_info.page_description },
    {
        name: "og:site_name",
        content: settings && settings.meta && settings.meta.title,
    },
    {
        name: "og:published_time",
        content: page_info.create_at || new Date().toISOString(),
    },
    {
        name: "og:modified_time",
        content: page_info.update_at || new Date().toISOString(),
    },
    ];
    return metaTags;
};

const SEO = ({page_info}: {page_info: { page_slug: string, page_title: string, page_description:string, image: string, openGraphType: string }}) => {
    if(typeof page_info === "undefined") {
        return null;
    }
    const { page_slug, page_title, page_description, image, openGraphType } = page_info;

    return (
        <Head>
            <title>{page_title} | CMS</title>
            <meta name="description" content={page_description} />
            <meta itemProp="name" content={page_title} />
            <meta itemProp="description" content={page_description} />
            <meta itemProp="image" content={image || settings.meta.social.graphic} />
            {socialTags(page_info).map(({ name, content }) => {
                return <meta key={name} name={name} content={content} />;
            })}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "http://schema.org",
                    "@type": openGraphType,
                    name: page_title,
                    about: page_description,
                    url: page_slug,
                }),
                }}
            />
        </Head>
    );
};

SEO.defaultProps = {
    title: settings && settings.meta && settings.meta.title,
    description: settings && settings.meta && settings.meta.description,
    image:
        settings &&
        settings.meta &&
        settings.meta.social &&
        settings.meta.social.graphic,
    url: "/",
    openGraphType: "website",
    schemaType: "page",
};

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    openGraphType: PropTypes.string,
    schemaType: PropTypes.string,
};

export default SEO;