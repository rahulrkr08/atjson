import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Annotation } from "@atjson/document";
import * as CK from "../src/ckeditor";
import CKEditorSource from "./source-ckeditor-build-classic";

function compareAnnotations(a: Annotation, b: Annotation) {
  if (a.start !== b.start) {
    return a.start - b.start;
  }

  if (a.end !== b.end) {
    return b.end - a.end;
  }

  return a.type > b.type ? 1 : a.type < b.type ? -1 : 0;
}

describe("@atjson/source-ckeditor classic build", () => {
  let editor: CK.Editor;
  let div: HTMLElement;

  beforeEach(async () => {
    div = document.createElement("div");
    document.body.appendChild(div);

    editor = await (ClassicEditor as typeof CK.Editor).create(div);
  });

  afterEach(async () => {
    await editor.destroy();
    document.body.removeChild(div);
  });

  test("single paragraph", () => {
    editor.setData("<p>Here is a paragraph</p>");
    let doc = CKEditorSource.fromRaw(editor.model);

    expect(doc.content).toBe("Here is a paragraph");
    expect(doc.annotations.sort(compareAnnotations)).toMatchObject([
      {
        type: "$root",
        start: 0,
        end: 19
      },
      {
        type: "$text",
        start: 0,
        end: 19
      },
      {
        type: "paragraph",
        start: 0,
        end: 19
      }
    ]);
  });

  test("multiple paragraphs", () => {
    editor.setData(
      "<p>Here is a paragraph</p>\n\n<p>Here is another paragraph</p>"
    );
    let doc = CKEditorSource.fromRaw(editor.model);

    expect(doc.content).toBe("Here is a paragraphHere is another paragraph");
    expect(doc.annotations.sort(compareAnnotations)).toMatchObject([
      {
        type: "$root",
        start: 0,
        end: 44
      },
      {
        type: "$text",
        start: 0,
        end: 19
      },
      {
        type: "paragraph",
        start: 0,
        end: 19
      },
      {
        type: "$text",
        start: 19,
        end: 44
      },
      {
        type: "paragraph",
        start: 19,
        end: 44
      }
    ]);
  });

  test("autoparagraph", () => {
    editor.setData("autoparagraph");
    let doc = CKEditorSource.fromRaw(editor.model);

    expect(doc.content).toBe("autoparagraph");
    expect(doc.annotations.sort(compareAnnotations)).toMatchObject([
      {
        type: "$root",
        start: 0,
        end: 13
      },
      {
        type: "$text",
        start: 0,
        end: 13
      },
      {
        type: "paragraph",
        start: 0,
        end: 13
      }
    ]);
  });

  test("single text styles", () => {
    editor.setData(
      "<strong>Bold</strong> <em>italic</em> <a href='https://www.condenast.com'>link</a>"
    );
    let doc = CKEditorSource.fromRaw(editor.model);

    expect(doc.content).toBe("Bold italic link");
    expect(doc.annotations.sort(compareAnnotations)).toMatchObject([
      {
        type: "$root",
        start: 0,
        end: 16
      },
      {
        type: "paragraph",
        start: 0,
        end: 16
      },
      {
        type: "$text",
        start: 0,
        end: 4,
        attributes: { bold: true }
      },
      {
        type: "$text",
        start: 4,
        end: 5,
        attributes: {}
      },
      {
        type: "$text",
        start: 5,
        end: 11,
        attributes: { italic: true }
      },
      {
        type: "$text",
        start: 11,
        end: 12,
        attributes: {}
      },
      {
        type: "$text",
        start: 12,
        end: 16,
        attributes: { linkHref: "https://www.condenast.com" }
      }
    ]);
  });

  test("nested text styles", () => {
    editor.setData(
      "<strong><em>Bold and italic</em></strong> <strong><a href='https://www.condenast.com'>bold link</a> just bold</strong>"
    );
    let doc = CKEditorSource.fromRaw(editor.model);

    expect(doc.content).toBe("Bold and italic bold link just bold");
    expect(doc.annotations.sort(compareAnnotations)).toMatchObject([
      {
        type: "$root",
        start: 0,
        end: 35
      },
      {
        type: "paragraph",
        start: 0,
        end: 35
      },
      {
        type: "$text",
        start: 0,
        end: 15,
        attributes: {
          bold: true,
          italic: true
        }
      },
      {
        type: "$text",
        start: 15,
        end: 16,
        attributes: {}
      },
      {
        type: "$text",
        start: 16,
        end: 25,
        attributes: {
          bold: true,
          linkHref: "https://www.condenast.com"
        }
      },
      {
        type: "$text",
        start: 25,
        end: 35,
        attributes: { bold: true }
      }
    ]);
  });
});