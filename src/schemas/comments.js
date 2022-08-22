exports.commentBody = {
    postId: {
      isInt: { errorMessage: 'ID must be a number' },
      exists: {
        errorMessage: 'postID cannot be null',
        options: { checkFalsy: true },
      },
    },
    body: {
        exists: {
            errorMessage: 'body cannot be null',
        }
    },
    image: {
        isString: { errorMessage: 'image is not a string'}
    }

}