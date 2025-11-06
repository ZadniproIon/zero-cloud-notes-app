// src/components/QuillEditor.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import Quill from "quill";
import DOMPurify from "dompurify";
import { get, set } from "idb-keyval";

export default function QuillEditor({
  noteId,
  initialHTML = "",
  onChangeHTML,
  className = "",
}) {
  const STORAGE_KEY_HTML  = useMemo(() => `zc:quill:html:${noteId}`,  [noteId]);
  const STORAGE_KEY_DELTA = useMemo(() => `zc:quill:delta:${noteId}`, [noteId]);

  const editorRef   = useRef(null);
  const quillRef    = useRef(null);
  const saveTimer   = useRef(null);
  const onChangeRef = useRef(onChangeHTML);
  const [ready, setReady] = useState(false);

  // keep callback stable
  useEffect(() => { onChangeRef.current = onChangeHTML; }, [onChangeHTML]);

  useEffect(() => {
    // Clean leftovers (StrictMode/HMR)
    if (editorRef.current) editorRef.current.innerHTML = "";

    // Init Quill with bubble theme + built-in inline toolbar
    const q = new Quill(editorRef.current, {
      theme: "bubble",
      placeholder: "Write your note...",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          ["link", "image"],
          ["clean"],
        ],
        // keep clipboard sane
        clipboard: { matchVisual: false },
      },
    });
    quillRef.current = q;

    // inside useEffect, right after `const q = new Quill(...)`
    q.root.setAttribute("spellcheck", "false");
    q.root.setAttribute("autocorrect", "off");
    q.root.setAttribute("autocapitalize", "off");
    // (optional) tell Grammarly-like extensions to ignore
    q.root.setAttribute("data-gramm", "false");


    // Load saved content (Delta > HTML > initialHTML)
    (async () => {
      try {
        const delta = await get(STORAGE_KEY_DELTA);
        if (delta?.ops?.length) q.setContents(delta);
        else {
          const savedHtml = (await get(STORAGE_KEY_HTML)) ?? initialHTML ?? "";
          if (savedHtml) q.clipboard.dangerouslyPasteHTML(savedHtml);
        }
      } finally {
        setReady(true);
      }
    })();

    // Debounced save
    const handleChange = () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(async () => {
        const clean = DOMPurify.sanitize(q.root.innerHTML, { USE_PROFILES: { html: true } });
        await set(STORAGE_KEY_DELTA, q.getContents());
        await set(STORAGE_KEY_HTML, clean);
        onChangeRef.current && onChangeRef.current(clean);
      }, 250);
    };
    q.on("text-change", handleChange);

    return () => {
      q.off("text-change", handleChange);
      if (saveTimer.current) clearTimeout(saveTimer.current);
      if (editorRef.current) editorRef.current.innerHTML = "";
      quillRef.current = null;
    };
  }, [noteId, STORAGE_KEY_DELTA, STORAGE_KEY_HTML, initialHTML]);

  return (
    <div className={className}>
      {!ready && (
        <div className="rounded-xl border p-3 text-neutral-500">
          {/*Loading editor…*/}
        </div>
      )}
      <div ref={editorRef} />
    </div>
  );
}
