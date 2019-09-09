// ⚠️ Generated via script; modifications may be overridden
import { BlockAnnotation } from "@atjson/document";
import {
  Addition,
  Anchor,
  Behavior,
  ComponentAnimation,
  ComponentLayout,
  ComponentStyle,
  ComponentTextStyle,
  ConditionalText,
  InlineTextStyle
} from "../apple-news-format";

export class Title extends BlockAnnotation<{
  role: "title";
  additions?: Addition[];
  anchor?: Anchor;
  animation?: ComponentAnimation | "none";
  behavior?: Behavior | "none";
  conditional?: ConditionalText | ConditionalText[];
  format?: "markdown" | "html" | "none";
  hidden?: boolean;
  identifier?: string;
  inlineTextStyles?: InlineTextStyle[] | "none";
  layout?: ComponentLayout | string;
  style?: ComponentStyle | string | "none";
  textStyle?: ComponentTextStyle | string;
}> {
  static vendorPrefix = "apple-news";
  static type = "Title";
}