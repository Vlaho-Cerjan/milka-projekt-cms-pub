export const getLastWordFromHref = (href: string) => {
    const hrefArray = href.split('/');
    return hrefArray[hrefArray.length - 1];
}