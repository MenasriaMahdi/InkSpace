import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { createPost } from '../../api/post.api'
import { useThemeStore } from '../../api/themeStore'

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
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[300px] p-4 dark:prose-invert max-w-none',
      },
    },
  })

  const mutation = useMutation({
    mutationFn: () =>
      createPost({
        title,
        content: editor?.getHTML() ?? '',
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
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

  // ─── Toolbar button ────────────────────────────────────
  const ToolbarBtn = ({
    active,
    label,
    icon,
    command,
  }: {
    active: boolean
    label: string
    icon?: React.ReactNode
    command?: () => void
  }) => (
    <button
      type="button"
      onClick={() => command?.()}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${
        active
          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
      }`}
      title={label}
    >
      {icon || label}
    </button>
  )

  const Divider = () => (
    <div className={`w-px h-6 mx-1 self-center ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />
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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 py-8 px-4 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 to-gray-800'
          : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => navigate(-1)}
              className={`flex items-center transition-colors ${
                darkMode
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </div>

          <div className="text-center">
            <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Write a story
            </h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Share your thoughts with the world
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div
          className={`rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <form onSubmit={handleSubmit} className="p-6 md:p-8">

            {/* Title */}
            <div className="mb-6">
              <label
                htmlFor="title"
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="What's your story about?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                className={`w-full px-4 py-3 text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            {/* Toolbar */}
            {editor && (
              <div className="mb-4">
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Formatting
                </label>
                <div
                  className={`flex flex-wrap gap-1 p-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <ToolbarBtn command={toggleBold} active={editor.isActive('bold')} label="Bold" icon={<span className="font-bold">B</span>} />
                  <ToolbarBtn command={toggleItalic} active={editor.isActive('italic')} label="Italic" icon={<span className="italic">I</span>} />
                  <Divider />
                  <ToolbarBtn command={toggleH2} active={editor.isActive('heading', { level: 2 })} label="Heading 2" icon={<span className="font-semibold">H2</span>} />
                  <ToolbarBtn command={toggleH3} active={editor.isActive('heading', { level: 3 })} label="Heading 3" icon={<span className="font-semibold">H3</span>} />
                  <Divider />
                  <ToolbarBtn
                    command={toggleBullet}
                    active={editor.isActive('bulletList')}
                    label="Bullet List"
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    }
                  />
                  <ToolbarBtn
                    command={toggleOrdered}
                    active={editor.isActive('orderedList')}
                    label="Numbered List"
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20h14M5 4h14M5 8h14M5 12h14M5 16h14" />
                      </svg>
                    }
                  />
                  <Divider />
                  <ToolbarBtn
                    command={toggleBlockquote}
                    active={editor.isActive('blockquote')}
                    label="Quote"
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    }
                  />
                  <ToolbarBtn
                    command={setHRule}
                    active={false}
                    label="Divider"
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                      </svg>
                    }
                  />
                  <Divider />
                  <ToolbarBtn
                    command={undo}
                    active={false}
                    label="Undo"
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                    }
                  />
                  <ToolbarBtn
                    command={redo}
                    active={false}
                    label="Redo"
                    icon={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
                      </svg>
                    }
                  />
                </div>
              </div>
            )}

            {/* Editor */}
            <div className="mb-6">
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Content
              </label>
              <div
                className={`border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition duration-150 ${
                  darkMode ? 'border-gray-600' : 'border-gray-300'
                }`}
              >
                <div className={`min-h-[400px] ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <EditorContent editor={editor} />
                </div>
                {editor?.isEmpty && (
                  <div
                    className={`text-sm p-4 border-t ${
                      darkMode ? 'text-gray-500 border-gray-700' : 'text-gray-400 border-gray-100'
                    }`}
                  >
                    ✍️ Start writing your story...
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label
                htmlFor="tags"
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Tags
              </label>
              <input
                id="tags"
                type="text"
                placeholder="react, webdev, programming (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
              <p className="text-xs mt-1 text-gray-500">
                Separate tags with commas. This helps others find your post.
              </p>
            </div>

            {/* Error */}
            {mutation.isError && (
              <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Failed to publish. Please try again.
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div
              className={`flex gap-3 pt-4 border-t ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <button
                type="submit"
                disabled={mutation.isPending || !title.trim() || !editor || editor.isEmpty}
                className="flex-1 bg-indigo-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
              >
                {mutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Publishing...
                  </div>
                ) : (
                  'Publish Story'
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className={`px-6 py-2.5 border rounded-lg font-medium transition duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
                  darkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div
          className={`mt-6 rounded-lg p-4 ${
            darkMode
              ? 'bg-blue-900/20 border border-blue-800'
              : 'bg-blue-50 border border-blue-200'
          }`}
        >
          <div className="flex items-start">
            <svg
              className={`h-5 w-5 mt-0.5 mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-900'}`}>
                Writing Tips
              </h3>
              <ul className={`text-xs space-y-1 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                <li>• Use a clear, engaging title to grab attention</li>
                <li>• Break up long paragraphs for better readability</li>
                <li>• Add relevant tags to help others discover your post</li>
                <li>• Preview your post before publishing to check formatting</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}