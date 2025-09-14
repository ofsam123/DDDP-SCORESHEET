import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../../api/cmsapi";
import { notification } from "antd";

const getComments = async () => await instance.get('comments');
const addComment = async (payload) => await instance.post('comments', payload);
const editComment = async ({payload, commentId}) => await instance.put(`comments/${commentId}`, payload);
const addComments = async (payload) => await instance.post('comments/bulk', payload);
const getCommentsByDistrictAndYear = async (districtId, year) => await instance.get(`comments/tables/${districtId}/${year}/DPAT`);

export function useGetByDistrictAndYear(districtId, year) {
    return useQuery(['getCommentsByDistrictAndYear', districtId, year], () => getCommentsByDistrictAndYear(districtId, year), {
        enabled: !!districtId && !!year,
      });
}

export function useGetComments() {
    return useQuery(['getComments'], getComments);
}

export function useAddComment() {
    const queryClient = useQueryClient();
    return useMutation(addComment,{
        onSuccess:()=>{
            notification.success({ message: "Comment added successfully" });
            queryClient.invalidateQueries('getCommentsByDistrictAndYear');
        }
    });
}

export function useAddComments() {
    const queryClient = useQueryClient();
    return useMutation(addComments,{
        onSuccess:()=>{
            notification.success({ message: "Comments added successfully" });
            queryClient.invalidateQueries('getCommentsByDistrictAndYear');
        }
    });
}

export function useEditComment() {
    const queryClient = useQueryClient();
    return useMutation(editComment,{
        onSuccess:()=>{
            notification.success({ message: "Comment updated successfully" });
            queryClient.invalidateQueries('getCommentsByDistrictAndYear');
        }
    });
}