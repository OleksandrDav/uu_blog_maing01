/* eslint-disable */

const PostCreateDtoInType = shape({
   title: string(3, 150).isRequired(),
   postText: string(3, 5000).isRequired(),
   imageUrl: string()
})

const PostGetDtoInType = shape({
   id: id().isRequired(),
});

const PostDeleteDtoInType = shape({
   id: id().isRequired()
});