import Head from "next/head";

import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";
import { Fragment } from "react";

function PostDetailPage(props) {
    return(
        <Fragment>
            <Head>
                <title>{props.post.title}</title>
                <meta name="description" content={props.post.excerpt} />
            </Head>
            <PostContent post={props.post} />
        </Fragment>
)}

export function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;

    // Assign the post data to a variable
    const postData = getPostData(slug);

    return {
        props: {
            post: postData,  // Pass postData to props
        },
        revalidate: 600,  // Page will be regenerated every 600 seconds
    };
}

export function getStaticPaths() {
    const postFilenames = getPostsFiles();  // Get all post filenames

    // Map filenames to slug by removing '.md'
    const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''));

    return {
        paths: slugs.map((slug) => ({ params: { slug: slug } })),  // Use slugs instead of sortUserPlugins
        fallback: false,  // No fallback pages
    };
}

export default PostDetailPage;
