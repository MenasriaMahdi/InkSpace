import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { createPost } from '../../api/post.api'
import { useThemeStore } from '../../api/themeStore'
import {
  ArrowLeft,
  Feather,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
  Tag,
  BookOpen,
} from 'lucide-react'

export default function CreatePostPage() {
  const navigate = useNavigate()
  const { theme } = useThemeStore()
  const darkMode = theme === 'dark'

  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class:
          'prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[350px] p-6 sm:p-8 font-serif text-lg leading-relaxed text-slate-900 dark:text-slate-100',
      },
    },
  })

  // Parse and deduplicate tags from input string (supports commas and spaces)
  const parsedTags = Array.from(
    new Set(
      tags
        .split(/[, \s]+/)
        .map((t) => t.replace(/[^a-zA-Z0-9-_]/g, '').trim().toLowerCase())
        .filter(Boolean)
    )
  )

  const mutation = useMutation({
    mutationFn: () =>
      createPost({
        title,
        content: editor?.getHTML() ?? '',
        tags: parsedTags,
      }),
    onSuccess: (res) => {
      navigate(`/posts/${res.data.slug}`)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !editor || editor.isEmpty) return
    mutation.mutate()
  }

  // ─── Toolbar button with focus preservation ────────────────────
  const ToolbarBtn = ({
    active,
    label,
    icon,
    command,
  }: {
    active: boolean
    label: string
    icon: React.ReactNode
    command?: () => void
  }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault() // Prevents toolbar button from stealing text selection focus
        command?.()
        editor?.commands.focus()
      }}
      className={`p-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center ${
        active
          ? 'bg-[#1a62ea] text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-200/70 dark:text-slate-300 dark:hover:bg-slate-800'
      }`}
      title={label}
    >
      {icon}
    </button>
  )

  const Divider = () => (
    <div className="w-px h-5 mx-1 self-center bg-slate-300 dark:bg-slate-700" />
  )

  // ─── Editor commands ───────────────────────────────────
  const toggleBold = () => editor?.chain().focus().toggleBold().run()
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run()
  const toggleH2 = () => editor?.chain().focus().toggleHeading({ level: 2 }).run()
  const toggleH3 = () => editor?.chain().focus().toggleHeading({ level: 3 }).run()
  const toggleBullet = () => editor?.chain().focus().toggleBulletList().run()
  const toggleOrdered = () => editor?.chain().focus().toggleOrderedList().run()
  const toggleBlockquote = () => editor?.chain().focus().toggleBlockquote().run()
  const setHRule = () => editor?.chain().focus().setHorizontalRule().run()
  const undo = () => editor?.chain().focus().undo().run()
  const redo = () => editor?.chain().focus().redo().run()

  // Calculate word count
  const wordCount = editor?.getText().trim() ? editor.getText().trim().split(/\s+/).length : 0

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Top Studio Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-300/60 dark:border-slate-800">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#1a62ea]" />
          Back to feed
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Studio Ready · {wordCount} words
          </div>

          <button
            onClick={handleSubmit}
            disabled={mutation.isPending || !title.trim() || !editor || editor.isEmpty}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#1a62ea] hover:bg-[#1553c9] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Feather className="w-4 h-4" />
            )}
            Publish Story
          </button>
        </div>
      </div>

      {/* Manuscript Floating Card Container */}
      <div className="bg-white/95 dark:bg-[#0d1017]/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Editor Title Block */}
        <div className="p-8 sm:p-10 border-b border-slate-100 dark:border-slate-800/80 space-y-4">
          <input
            type="text"
            placeholder="Title of your story..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="w-full font-serif text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 bg-transparent focus:outline-none leading-tight"
          />

          {/* Tags Input */}
          <div className="flex items-center gap-3 pt-2">
            <Tag className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Add tags separated by comma or space (e.g. engineering design thoughts)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="flex-1 text-xs font-mono text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-600 bg-transparent focus:outline-none"
            />
          </div>

          {/* Live Tag Badges Preview */}
          {parsedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {parsedTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono font-semibold px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/50 text-[#1a62ea] dark:text-blue-400 rounded-md border border-blue-200 dark:border-blue-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* TipTap Rich Editor Toolbar */}
        {editor && (
          <div className="sticky top-16 z-20 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-1">
            <ToolbarBtn command={toggleBold} active={editor.isActive('bold')} label="Bold" icon={<Bold className="w-4 h-4" />} />
            <ToolbarBtn command={toggleItalic} active={editor.isActive('italic')} label="Italic" icon={<Italic className="w-4 h-4" />} />
            <Divider />
            <ToolbarBtn command={toggleH2} active={editor.isActive('heading', { level: 2 })} label="Heading 2" icon={<Heading2 className="w-4 h-4" />} />
            <ToolbarBtn command={toggleH3} active={editor.isActive('heading', { level: 3 })} label="Heading 3" icon={<Heading3 className="w-4 h-4" />} />
            <Divider />
            <ToolbarBtn command={toggleBullet} active={editor.isActive('bulletList')} label="Bullet List" icon={<List className="w-4 h-4" />} />
            <ToolbarBtn command={toggleOrdered} active={editor.isActive('orderedList')} label="Numbered List" icon={<ListOrdered className="w-4 h-4" />} />
            <ToolbarBtn command={toggleBlockquote} active={editor.isActive('blockquote')} label="Blockquote" icon={<Quote className="w-4 h-4" />} />
            <ToolbarBtn command={setHRule} active={false} label="Horizontal Rule" icon={<Minus className="w-4 h-4" />} />
            <Divider />
            <ToolbarBtn command={undo} active={false} label="Undo" icon={<Undo className="w-4 h-4" />} />
            <ToolbarBtn command={redo} active={false} label="Redo" icon={<Redo className="w-4 h-4" />} />
          </div>
        )}

        {/* TipTap Editor Body */}
        <div
          onClick={() => editor?.commands.focus()}
          className="min-h-[400px] cursor-text"
        >
          <EditorContent editor={editor} />
        </div>

        {/* Editor Bottom Bar */}
        <div className="px-8 py-4 bg-slate-50/60 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
          <div>InkSpace TipTap Engine</div>
          <div className="font-serif italic text-slate-400">Write freely · No paywalls</div>
        </div>

      </div>

      {/* Writer's Guidelines Box */}
      <div className="bg-white/60 dark:bg-[#0d1017]/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#1a62ea] flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white mb-1">
            Writing for InkSpace
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Craft stories that last. Focus on high clarity, thoughtful structure, and genuine insights. Your stories are distributed to your followers without paywalls or algorithmic noise.
          </p>
        </div>
      </div>

    </div>
  )
}