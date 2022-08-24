exports.commentBody = {
    postId: {
      isInt: { errorMessage: 'Post ID must be a number' },
      exists: {
        errorMessage: 'postID cannot be null',
        options: { checkFalsy: true },
      },
    },
    body: {
        exists: {
            errorMessage: 'body cannot be null',
        }
    }

}