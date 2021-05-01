export const getPostList = async () => {
    try {
        const responseStream = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const response = await responseStream.json();
        return response;
    } catch (e) {
        throw e;
    }
}

export const getUserList = async () => {
    try {
        const responseStream = await fetch(`https://jsonplaceholder.typicode.com/users`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const response = await responseStream.json();
        return response;
    } catch (e) {
        throw e;
    }
}

export const getPostComments = async (postId) => {
    try {
        const responseStream = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const response = await responseStream.json();
        return response;
    } catch (e) {
        throw e;
    }
}