"use client";

import { Box } from "@chakra-ui/react";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Plugin } from "@tiptap/pm/state";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  RichTextEditor,
} from "@/components/ui/rich-text-editor";
import {  useState } from "react";
import { CharacterCount } from "@tiptap/extensions/character-count"

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const HeadingWithSlug = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("id"),
        renderHTML: (attributes) => ({
          id: attributes.id,
        }),
      },
      // Добавляем поддержку textAlign
      textAlign: {
        default: null,
        parseHTML: (element) => element.style.textAlign || null,
        renderHTML: (attributes) => {
          if (!attributes.textAlign) return {};
          return { style: `text-align: ${attributes.textAlign}` };
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        appendTransaction: (_transactions, _oldState, newState) => {
          const tr = newState.tr;
          let modified = false;

          newState.doc.descendants((node, pos) => {
            if (node.type.name === "heading") {
              const text = node.textContent;
              const slug = slugify(text);
              if (node.attrs.id !== slug) {
                const textAlign = node.attrs.textAlign;
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  id: slug,
                  textAlign: textAlign,
                });
                modified = true;
              }
            }
          });

          return modified ? tr : null;
        },
      }),
    ];
  },
});

const ReviewCommentaryPreview = ({ initialCommentary }: { initialCommentary: string }) => {
  const [content, setContent] = useState(initialCommentary || "<p></p>");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      HeadingWithSlug.configure({ levels: [1, 2, 3] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,

      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
      Link.configure({ openOnClick: false }),
      Image,
      TaskList,
      TaskItem.configure({ nested: true }),

       CharacterCount.configure({
        limit: 1000,
        mode: "textSize",
      }),
    ],
    editable: false,
    content: content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
  });

  if (!editor) return null;


  return (
    <RichTextEditor.Root
      editor={editor}
      shadow="sm"
      h="40vh"
      display="flex"
      flexDirection="column"
      css={{
        "--content-padding-x": "spacing.16",
        "--content-padding-y": "spacing.12",
      }}
    >
        <Box flex="1" overflowY="auto" position="relative">
          <RichTextEditor.Content />
        </Box>
    </RichTextEditor.Root>
  );
};

export default ReviewCommentaryPreview;