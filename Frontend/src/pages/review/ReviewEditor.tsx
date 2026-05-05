"use client";

import { Box, HStack, IconButton, Separator } from "@chakra-ui/react";
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
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Control,
  RichTextEditor,
} from "@/components/ui/rich-text-editor";
import { Tooltip } from "@/components/ui/tooltip";
import { forwardRef, useEffect, useState } from "react";
import {
  LuLink,
} from "react-icons/lu";
import { useRichTextEditorContext } from "@/components/ui/rich-text-editor-context";
import Placeholder from "@tiptap/extension-placeholder"
import { CharacterCount } from "@tiptap/extensions/character-count"
import { useReviewStore } from "@/stores/ReviewStore";

// Slugify функция
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Исправленный HeadingWithSlug с поддержкой textAlign
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

const ReviewEditor = ({ initialCommentary }: { initialCommentary: string }) => {
  const { preSave, updateReview, review, endCheck } = useReviewStore()
  const [content, setContent] = useState(initialCommentary || "<p></p>");

  useEffect(() => {
    const loadProgram = async () => {
      if (preSave)
      { 
        await updateReview({
          reviewId: review?.id || "",
          isSuccess: false,
          isFinished: false,
          commentary: content
        })
      }
    };
    loadProgram();
  }, [preSave]);


  useEffect(() => {
    const loadProgram = async () => {
      if (endCheck)
      { 
        await updateReview({
          reviewId: review?.id || "",
          isSuccess: false,
          isFinished: true,
          commentary: content
        })
      }
    };
    loadProgram();
  }, [endCheck]);


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

      Placeholder.configure({
        placeholder: "Введите текст...",
      }),

       CharacterCount.configure({
        limit: 1000,
        mode: "textSize",
      }),
    ],
    content: content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
  });

  if (!editor) return null;

  const charCount = editor.storage.characterCount.characters()
  const wordCount = editor.storage.characterCount.words()

  return (
    <RichTextEditor.Root
      editor={editor}
      shadow="sm"
      h="60vh"
      display="flex"
      flexDirection="column"
      css={{
        "--content-padding-x": "spacing.16",
        "--content-padding-y": "spacing.12",
      }}
    >
      <Toolbar />
      <HStack
        borderTop="1px solid"
        borderColor="border"
        flex="1"
        mt="4"
        alignItems="stretch"
        gap={0}
        overflow="hidden"
      >
        <Box flex="1" overflowY="auto" position="relative">
          <RichTextEditor.Content />
        </Box>
      </HStack>

      <RichTextEditor.Footer justify="flex-end" textStyle="xs">
        <Box fontVariantNumeric="tabular-nums">Символов: {charCount}</Box>
        <Separator orientation="vertical" height={6} ml="2"/>
        <Box fontVariantNumeric="tabular-nums" ml="2">Слов: {wordCount}</Box>
      </RichTextEditor.Footer>

    </RichTextEditor.Root>
  );
};

const Toolbar = () => {
  return (
    <Box px={4}>
      <HStack
        bg="bg.muted"
        p={2}
        gap={1}
        rounded="50px"
        mt="4"
        overflowX="auto"
      >

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>

        <Separator orientation="vertical" height={6} />

        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
          <Control.Strikethrough />
        </RichTextEditor.ControlGroup>

        <Separator orientation="vertical" height={6} />

        <RichTextEditor.ControlGroup>
          <Control.AlignLeft />
          <Control.AlignCenter />
          <Control.AlignRight />
        </RichTextEditor.ControlGroup>

        <Separator orientation="vertical" height={6} />

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
        </RichTextEditor.ControlGroup>
        
         <Separator orientation="vertical" height={6} />
        
        <RichTextEditor.ControlGroup>
          <Control.TextStyle />
        </RichTextEditor.ControlGroup>

        <Separator orientation="vertical" height={6} />

        <RichTextEditor.ControlGroup>
          <LinkControl />
        </RichTextEditor.ControlGroup>
      </HStack>
    </Box>
  );
};

const LinkControl = forwardRef<
  HTMLButtonElement,
  Omit<Control.ButtonControlProps, "icon" | "label">
>(function LinkControl(props, ref) {
  const { editor } = useRichTextEditorContext();
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  if (!editor) return null;

  const handleApply = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      editor.chain().focus().unsetLink().run();
    } else {
      const isValid = /^https?:\/\//i.test(trimmed);
      const finalUrl = isValid ? trimmed : `https://${trimmed}`;
      editor.chain().focus().setLink({ href: finalUrl }).run();
    }
    setOpen(false);
    setUrl("");
  };

  return (
    <>
      <Tooltip content="Вставить ссылку">
        <IconButton
          ref={ref}
          size="2xs"
          aria-label="Вставить ссылку"
          onClick={() => setOpen(true)}
          variant={editor.isActive("link") ? "subtle" : "ghost"}
          {...props}
        >
          <LuLink />
        </IconButton>
      </Tooltip>

      {open && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="white"
          p={4}
          shadow="lg"
          borderRadius="md"
          zIndex={1000}
        >
          <input
            placeholder="Ссылка"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            style={{
              width: "250px",
              padding: "8px",
              marginBottom: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            autoFocus
          />
          <HStack gap={2}>
            <button onClick={handleApply}>Применить</button>
            <button onClick={() => setOpen(false)}>Отмена</button>
          </HStack>
        </Box>
      )}
    </>
  );
});

export default ReviewEditor;