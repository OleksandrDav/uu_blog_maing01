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
   id: id().isRequired()
});