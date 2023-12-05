/* eslint-disable */

const PostCreateDtoInType = shape({
   title: string(3, 150).isRequired(),
   postText: string(3, 5000).isRequired(),
   image: binary()
})

const PostGetDtoInType = shape({
   id: id().isRequired(),
});

const PostDeleteDtoInType = shape({
   id: id().isRequired(),
});

const PostUpdateDtoInType = shape({
   id: id().isRequired(),
   title: string(3, 150),
   postText: string(3, 5000),
   image: binary(),
   deleteImage: boolean(),
});

const PostListDtoInType = shape({
   pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer(),
   }),
   searchQuery: string(),
   sortQuery: shape({
      sortBy: string(),
      order: string(),
   }),
});