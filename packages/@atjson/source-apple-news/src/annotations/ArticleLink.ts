// ⚠️ Generated via script; modifications may be overridden
import { BlockAnnotation } from "@atjson/document";
import {
  Anchor,
  Behavior,
  CollectionDisplay,
  ComponentAnimation,
  ComponentLayout,
  ComponentLink,
  ComponentStyle,
  ConditionalContainer,
  HorizontalStackDisplay
} from "../apple-news-format";

export class ArticleLink extends BlockAnnotation<{
  articleIdentifier: string;
  role: "article_link";
  additions?: ComponentLink[];
  anchor?: Anchor;
  animation?: ComponentAnimation | "none";
  behavior?: Behavior | "none";
  conditional?: ConditionalContainer | ConditionalContainer[];
  contentDisplay?: CollectionDisplay | HorizontalStackDisplay | "none";
  hidden?: boolean;
  identifier?: string;
  layout?: ComponentLayout | string;
  style?: ComponentStyle | string | "none";
}> {
  static vendorPrefix = "apple-news";
  static type = "ArticleLink";
}