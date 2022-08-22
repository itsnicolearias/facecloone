exports.postBody = {
    content: {
        exists: { errorMessage: 'Content cannot be null' }
    },
    image: {
        isString: { errorMessage: 'image is not a string'}
    }
}