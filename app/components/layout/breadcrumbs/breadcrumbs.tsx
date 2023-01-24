import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Breadcrumbs as BreadcrumbsMUI, Link as LinkMUI, Typography } from '@mui/material';
import Link from '../../navigation/Link';
import { CustomThemeContext } from '../../../store/customThemeContext';

/**
 * Takes an URL String and removes query params and hash params
 *
 * @param url - The URL string
 * @returns The transformed URL string
 *
 */
const getPathFromUrl = (url: string): string => {
  return url.split(/[?#]/)[0];
};

/**
 * Takes a breadcrumb title (from url path) and replaces
 * special chars to more readable chars
 *
 * @param title - The breadcrumb title
 * @returns The transformed title or the result of the custom transformLabel function
 *
 */
const convertBreadcrumb = (
  title: string,
  toUpperCase: boolean | undefined,
  replaceCharacterList: Array<CharacterMap> | undefined,
  transformLabel?: ((title: string) => React.ReactNode) | undefined
): React.ReactNode => {
  let transformedTitle = getPathFromUrl(title);

  if (transformLabel) {
    return transformLabel(transformedTitle);
  }

  if (replaceCharacterList) {
    for (let i = 0; i < replaceCharacterList.length; i++) {
      transformedTitle = transformedTitle.replaceAll(
        replaceCharacterList[i].from,
        replaceCharacterList[i].to
      );
    }
  }

  // decode for utf-8 characters and return ascii. 
  return toUpperCase ? decodeURI(transformedTitle).toUpperCase() : decodeURI(transformedTitle);
};

export interface Breadcrumb {
  /** Breadcrumb title. Example: 'blog-entries' */
  breadcrumb: string;

  /** The URL which the breadcrumb points to. Example: 'blog/blog-entries' */
  href: string;
}

export interface CharacterMap {
  /** The source character or character pattern that should be replaced (e.g. 'ae') */
  from: string;

  /** The replacement into which the character should be replaced. */
  to: string;
}

export interface BreadcrumbsProps {
  /** If true, the default styles are used.
   * Make sure to import the CSS in _app.js

  /** The title for the very first breadcrumb pointing to the root directory. Example: '/' Default: 'HOME' */
  rootLabel?: string | null;

  /** Boolean indicator whether the root label should be omitted. Example: true Default: false */
  omitRootLabel?: boolean;

  /** Boolean indicator if the labels should be displayed as uppercase. Example: true Default: false */
  labelsToUppercase?: boolean | undefined;

  /** Array containing a list of specific characters that should be replaced in the label. This can be useful to convert special characters such as vowels. Example: [{ from: 'ae', to: 'ä' }, { from: '-', to: ' '}] Default: [{ from: '-', to: ' ' }] */
  replaceCharacterList?: Array<CharacterMap> | undefined;

  /** A transformation function that allows to customize the label strings. Receives the label string and has to return a string or React Component */
  transformLabel?: ((title: string) => React.ReactNode) | undefined;

  /** Array containing all the indexes of the path that should be omitted and not be rendered as labels. If we have a path like '/home/category/1' then you might want to pass '[2]' here, which omits the breadcrumb label '1'. Indexes start with 0. Example: [2] Default: undefined */
  omitIndexList?: Array<number> | undefined;

  /** An inline style object for the outer container */
  containerStyle?: any | null;
}

const defaultProps: BreadcrumbsProps = {
  rootLabel: 'Naslovnica',
  omitRootLabel: false,
  labelsToUppercase: false,
  replaceCharacterList: [{ from: '-', to: ' ' }],
  transformLabel: undefined,
  omitIndexList: undefined,
};

/**
 * A functional React component for Next.js that renders a dynamic Breadcrumb navigation
 * based on the current path within the Next.js router navigation.
 *
 * Only works in conjunction with Next.js, since it leverages the Next.js router.
 *
 * By setting useDefaultStyle to true, the default CSS will be used.
 * The component is highly customizable by either custom classes or
 * inline styles, which can be passed as props.
 *
 * @param props - object of type BreadcrumbsProps
 * @returns The breadcrumb React component.
 */
const NextBreadcrumbs = ({
  rootLabel,
  omitRootLabel,
  labelsToUppercase,
  replaceCharacterList,
  transformLabel,
  omitIndexList,
}: BreadcrumbsProps) => {
  const router = useRouter();
  const { theme } = React.useContext(CustomThemeContext);
  const [breadcrumbs, setBreadcrumbs] = useState<Array<Breadcrumb> | null>(
    null
  );

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: '/' + linkPath.slice(0, i + 1).join('/'),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <BreadcrumbsMUI sx={{ '& ol': { justifyContent: "center" }, p: (breadcrumbs[0].breadcrumb.length >= 1)?"16px 8px":0 }}  aria-label="breadcrumb">
        {!omitRootLabel && (
          <Link
            underline="hover"
            href="/"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "500 !important",
              textDecoration: "underline !important"
            }}
          >
            {convertBreadcrumb(
              rootLabel || 'Naslovnica',
              labelsToUppercase,
              replaceCharacterList,
              transformLabel
            )}
          </Link>
        )}
        {breadcrumbs.length >= 1 &&
          breadcrumbs.map((breadcrumb, i) => {
            if (
              !breadcrumb ||
              breadcrumb.breadcrumb.length === 0 ||
              (omitIndexList && omitIndexList.find((value) => value === i))
            ) {
              return;
            }
            if( breadcrumbs.length - 1 === i ){
              return (
                <Typography
                  key={i+breadcrumb.breadcrumb}
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: "700 !important",
                  }}
                >
                  {
                    convertBreadcrumb(
                      breadcrumb.breadcrumb,
                      labelsToUppercase,
                      replaceCharacterList,
                      transformLabel
                  )
                }
                </Typography>
              )
            }
            return (
                <Link
                  underline="hover"
                  key={breadcrumb.href}
                  href={breadcrumb.href}
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: "500 !important",
                    textDecoration: "underline !important"
                  }}
                >
                    {
                        convertBreadcrumb(
                            breadcrumb.breadcrumb,
                            labelsToUppercase,
                            replaceCharacterList,
                            transformLabel
                        )
                    }
                </Link>
            );
          })}
    </BreadcrumbsMUI>
  );
};

NextBreadcrumbs.defaultProps = defaultProps;

export default NextBreadcrumbs;