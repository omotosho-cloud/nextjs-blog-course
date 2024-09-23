import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles() {
    return fs.readdirSync(postsDirectory);

}

export function getPostData(postIdentifier) {
    const postSlug = postIdentifier.replace(/\.md$/, ''); // Removing the '.md' extension

    const filePath = path.join(postsDirectory, `${postSlug}.md`);
    
    // Corrected this line to read the file content instead of reading a directory
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    const { data, content } = matter(fileContent);

    const postData = {
        slug: postSlug,
        ...data,
        content,
    };

    return postData;
}

export function getAllPosts() {
    const postFiles = getPostsFiles();
    const allPosts = postFiles.map(fileName => {
        return getPostData(fileName);
    });

    const sortedPosts = allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

    return sortedPosts;
}

export function getFeaturedPost() {
    const allPosts = getAllPosts();
    
    const featuredPosts = allPosts.filter(post => post.isFeatured);  // Filter based on isFeatured flag

    return featuredPosts;
}

