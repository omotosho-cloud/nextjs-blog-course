import { Fragment } from "react";
import Head from "next/head";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPost } from "../lib/posts-util";



function HomePage(props) {
    return(
        <Fragment>
            <Head>
                <title>Temitope Blog</title>
                <meta 
                    name="description" 
                    content="I post about programing and web development"
                />
            </Head>
            <Hero/>
            <FeaturedPosts posts={props.posts} />
        </Fragment>
    )
}

export function getStaticProps () {
    const featuredPosts = getFeaturedPost();

    return{
        props: {
            posts: featuredPosts
        },
    }
}

export default HomePage;