import React, { FC } from "react";
import { CmsContent } from "@lib/cms/CmsContent";
import clsx from "clsx";
import Image from "../../cms-modern/Image";
import _ from "lodash";
import { nanoid } from "nanoid";

type Props = {} & CmsContent;

const BlogCard: FC<Props> = ({
  snippet,
  id,
  viewType,
  title,
  blogdate,
  description,
  author,
  image,
  category = [],
  keywords = [],
  _meta,
}) => {
  return (
    <div
      className={clsx("amp-dc-blog-card", "amp-dc-snippet", "js_dc_snippet")}
    >
      <a href={`/blog/post/${_meta?.deliveryKey}/${_.camelCase(title)}`}>
        {image ? (
          <div className="amp-dc-image">
            <Image alt={title} {...image} />
          </div>
        ) : null}

        <div className="amp-dc-category-container">
          {category.map((item: any) => {
            return (
              <div key={nanoid()}>
                <div className="amp-dc-category">{item}</div>
                <span className="line"></span>
              </div>
            );
          })}
        </div>
        <div className="amp-dc-blog-card-text-wrap">
          {title && <div className="amp-dc-title">{title}</div>}
          {blogdate && <div className="amp-dc-blogdate">{blogdate}</div>}
          {description && (
            <div className="amp-dc-description">{description}</div>
          )}
          {viewType !== "list" ? (
            <>
              {author && <div className="amp-dc-author">@{author}</div>}

              <div className="amp-dc-keywords-container">
                {keywords.map((keyword: any) => (
                  <div key={keyword} className="amp-dc-keyword">
                    {keyword}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="amp-dc-card-link">Read More??!?!</div>
            </>
          )}
        </div>
      </a>
    </div>
  );
};

export default BlogCard;
