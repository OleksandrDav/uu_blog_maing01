/* eslint-disable */
const CommentCreateDtoInType = shape({
   postId: string().isRequired(),
   text: string(3, 500).isRequired(),
})