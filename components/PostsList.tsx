"use client" 

import Attachment from "@/app/components/Attachment";
import { COLOR_PALETTE } from "@/utils/constants";
import { useRouter } from 'next/navigation'

const PostPreview = ({post}: {post: any}) => {
    const router = useRouter();
    
    const colorScheme = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]

    return (
    
            <div className="mb-4 rounded-lg bg-white overflow-hidden hover:bg-gray-200 hover:cursor-pointer" style={{ userSelect: 'none' }}
                onMouseDown={() => router.push("/post")}>
                <h2 className="px-8 py-4"
                style={{backgroundColor: colorScheme.primary}}>{post.title}</h2>
                <div className="px-8 py-4" 
                style={{backgroundColor: colorScheme.secondary}}>
                    <p className="text-gray-600 truncate overflow-hidden">{post.description}</p>
                    <p className="text-gray-600">Due Date: {post.dueDate}</p>
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
            {posts.map((post, index) => (
                <PostPreview post={post} key={index} />
            ))}
        </div>
    </div>
    
  );
};

export default PostsList;
