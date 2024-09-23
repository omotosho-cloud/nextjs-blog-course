import ReactMarkDown from 'react-markdown';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import PostHeader from './post-header';
import classes from './post-content.module.css';

function PostContent(props) {
    const { post } = props;
    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const customRenderers = {
        paragraph(paragraph) {
            const { node } = paragraph;
            if (node.children[0]?.tagName === 'img') {
                const image = node.children[0];
                const imageSrc = `/images/posts/${post.slug}/${image.properties.src}`;
                return (
                    <div className={classes.image}>
                        <Image
                            src={imageSrc}
                            alt={image.properties.alt}
                            width={600}
                            height={400}
                        />
                    </div>
                );
            }
            return <p>{paragraph.children}</p>;
        },

        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }
    };

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkDown components={customRenderers}>
                {post.content}
            </ReactMarkDown>
        </article>
    );
}

export default PostContent;
