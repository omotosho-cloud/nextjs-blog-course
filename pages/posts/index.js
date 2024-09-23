import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";
import { Fragment } from "react";



function AllPostsPage(props) {
   
    return(
        <Fragment>
            <Head>
                <title>All post</title>
                <meta 
                    name="description" 
                    content="all list of programing tutorial" />
            </Head>
            <AllPosts posts={props.posts} />
        </Fragment>
    )
}

export function getStaticProps() {
    const allPosts = getAllPosts();

    return{
        props: {
            posts: allPosts
        }
    };
}

export default AllPostsPage;