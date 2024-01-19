"use client" 

import Attachment from "../components/Attachment";
import { COLOR_PALETTE } from "../utils/constants";
import { useRouter } from 'next/navigation'

const PostPreview = ({post}: {post: any}) => {
    const router = useRouter();
    console.log(post)
    const colorScheme = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]

    const clickPost = async () => {
        localStorage.setItem('post', JSON.stringify(post));
        router.push("/post")
    }

    return (
    
            <div className="mb-4 rounded-lg bg-white overflow-hidden hover:bg-gray-200 hover:cursor-pointer" style={{ userSelect: 'none' }}
                onMouseDown={() => {clickPost()}}>
                <h2 className="px-8 py-4"
                style={{backgroundColor: colorScheme.primary}}>{post.title}</h2>
                <div className="px-8 py-4" 
                style={{backgroundColor: colorScheme.secondary}}>
                    <p className="text-gray-600 truncate overflow-hidden">{post.body}</p>
                    <p className="text-gray-600">Due Date: {post.dueDate}</p>
                    <p className="text-gray-600">
                        File URL: {post?.fileURL ? <a href={post.fileURL} target="_blank" rel="noopener noreferrer">{post.fileURL}</a> : 'N/A'}
                    </p>
                    {
                        post.attachment != null &&
                        (() => {
                            switch (post.attachment.type) {
                                case "ASSIGNMENT":
                                    return (
                                    <Attachment
                                        src="/icons/assignment.png"
                                        alt="Assignment"
                                        fileName={post.attachment.fileName}
                                    />
                                    );
                                case "NOTE":
                                    return (
                                    <Attachment
                                        src="/icons/note.png"
                                        alt="Note"
                                        fileName={post.attachment.fileName}
                                    />
                                    );
                                default:
                                    return null; 
                                }
                        })()
                    }
                </div>
            </div>
        
    )
}

const PostsList = ({ posts }: {posts: any[]}) => {
  return (
    <div>
        <div className="bg-accent shadow-md rounded-lg p-4">

            {posts != undefined && 
                posts.map((post, index) => (
                <PostPreview post={post} key={index} />
            ))}
        </div>
    </div>
    
  );
};

export default PostsList;
