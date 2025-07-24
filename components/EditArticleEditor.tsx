"use client";

import { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";
import { toast } from "sonner";

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
          image: {
            class: ImageTool,
            config: {
              features: {
                border: false,
                caption: false,
                stretch: false,
              },
              uploader: {
                uploadByFile: async (file: File) => {
                  const MAX_SIZE_MB = 0.95;
                  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

                  if (file.size > MAX_SIZE_BYTES) {
                    toast.error(`The image size must be less than 1 MB`, {
                      style: {
                        backgroundColor: "#fff0f0",
                        borderColor: "#ffe0e1",
                        borderRadius: 0,
                        fontFamily: "Merriweather",
                        color: "#e60000",
                      },
                    });

                    const currentBlockIndex = editorRef.current?.blocks.getCurrentBlockIndex();

                    if (currentBlockIndex !== undefined) {
                      setTimeout(() => {
                        editorRef.current?.blocks.delete(currentBlockIndex);
                      }, 2250);
                    }

                    throw new Error(`The image size must be less than ${MAX_SIZE_MB}MB`);
                  }

                  return new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                      resolve({
                        success: 1,
                        file: {
                          url: reader.result as string,
                        },
                      });
                    };

                    reader.onerror = () => reject(new Error("File reading error"));

                    reader.readAsDataURL(file);
                  });
                },
              },
            },
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
