/* eslint-disable */
const CommentCreateDtoInType = shape({
   postId: string().isRequired(),
   text: string(3, 500).isRequired(),
})

const CommentDeleteDtoInType = shape({
   id: id().isRequired(),
});

const CommentGetDtoInType = shape({
   id: id().isRequired(),
});

const CommentListDtoInType = shape({
   pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer(),
   }),
   postId: string().isRequired(),
});