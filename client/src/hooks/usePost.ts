import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost, getPostBySlug,  searchPost } from '../api/post.api';
import { useNavigate } from "react-router-dom";

export const usePost = (slug:string)=>{
    return useQuery({
        queryKey: ['post',slug] ,
        queryFn: ()=>getPostBySlug(slug).then((res)=>res.data),
        enabled:!!slug
    })
} 

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate('/')
    },
  })
}

export const useSearch = (query: string, page = 1) => {
  return useQuery({
    queryKey: ["search", query, page],
    queryFn: () =>
      searchPost(query, page).then((res) => res.data),
    enabled: !!query,
  })
}
