// Libs
import React from "react";

// Utils
import { getDictionary } from "../../../static/js/utils/getContent";

// Resources

// Components
import FancyImageBlock from "../../FancyImageBlock/FancyImageBlock";
import Socials from "../../Socials/Socials";

// Interface
interface IProps {
  children?: JSX.Element[] | JSX.Element | string | number;
  title: string;
  copy?: string;
  showGenericSiteHeader?: boolean;
  src: string;
  alt: string;
  useFancyImageBlock?: boolean;
}

// Component
const SiteHeader = ({
  children,
  title,
  copy,
  src,
  alt,
  showGenericSiteHeader,
  useFancyImageBlock = true,
  ...attributes
}: IProps) => {
  return (
    <header
      className="site-header grid"
      {...attributes}
      data-has-generic-site-header={showGenericSiteHeader}
    >
      <div className="site-header__content g2">
        {showGenericSiteHeader && (
          <div className="site-header__heading-wrapper" data-reveal-in-view>
            <div>
              {title && (
                <h1 className="site-header__heading" data-reveal-in-view>
                  {title}
                </h1>
              )}

              {copy && (
                <p className="copy copy--jumbo" data-reveal-in-view>
                  {copy}
                </p>
              )}

              <Socials theme="light" />
            </div>

            {useFancyImageBlock ? (
              <FancyImageBlock src={src} alt={alt} />
            ) : (
              <img className="site-header__image" src={src} alt={alt} />
            )}
          </div>
        )}
        {children}
      </div>
    </header>
  );
};

// Props
const dictionary = getDictionary();

SiteHeader.defaultProps = {
  src: "/img/dave.png",
  alt: dictionary.daveBitter,
  showGenericSiteHeader: true,
};

export default SiteHeader;
