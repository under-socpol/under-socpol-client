"use client";

import { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";

interface EditArticleEditorProps {
  editorRef: React.RefObject<EditorJS | null>;
  content: any;
  setContent: React.Dispatch<any>;
}

export default function EditArticleEditor({ editorRef, content, setContent }: EditArticleEditorProps) {
  useEffect(() => {
    let editor: EditorJS;

    const initializeEditor = () => {
      const holder = document.getElementById("editorjs");

      if (!holder) return;

      editor = new EditorJS({
        data: content,
        holder: holder,
        autofocus: true,
        placeholder: "Start writing your article here...",
        tools: {
          header: {
            class: Header as any,
            inlineToolbar: true,
            config: {
              placeholder: "Enter a header",
              levels: [2, 3, 4],
              defaultLevel: 2,
            },
          },
          list: {
            class: List as any,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
          table: {
            class: Table as any,
            inlineToolbar: true,
          },
        },
        onReady() {
          editorRef.current = editor;
        },
        onChange: async () => {
          const content = await editor.save();

          setContent(content);
        },
      });
    };

    const raf = requestAnimationFrame(() => {
      initializeEditor();
    });

    return () => {
      cancelAnimationFrame(raf);

      if (editor && editor.destroy) {
        editor.destroy();

        editorRef.current = null;
      }
    };
  }, []);

  return <div id="editorjs" className="p-4 border border-gray-200 min-h-[calc((100vh-(4.25rem+3.35rem))/2)] md:min-h-[calc((100vh-(4.25rem+3.1rem))/2)]" />;
}
