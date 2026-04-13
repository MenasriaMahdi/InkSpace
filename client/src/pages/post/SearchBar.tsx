import { useSearchStore } from "../../store/search.store"
import { useNavigate } from "react-router-dom"

export default function SearchBar() {
  const { query, setQuery } = useSearchStore()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate("/search")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full px-4 py-2 border rounded"
      />
    </form>
  )
}