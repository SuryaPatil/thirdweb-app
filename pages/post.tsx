import Link from "next/link";
import Attachment from "../components/Attachment";

const Post = () => {
    try{
            const item = localStorage.getItem('post')!;
    console.log(item)
    const post = JSON.parse(item);
    // const post = {
    //     title: 'Math Homework 1',
    //     description: 'Complete exercises 1-5 on page 25. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE. THERE IS A LOT OF WORK TO BE DONE',
    //     dueDate: 'September 15, 2023',
    //     attachment: {
    //         type: "ASSIGNMENT",
    //         fileName: "THE_PRESENTATION_NOTES.pptx",
    //     }
    //   }  
    

  
    return (
      <div className="bg-gray-100 min-h-screen p-4 flex flex-col items-center">
          <div className="max-w-4xl w-[80%]">
  
              {/* back to dashboard */ }
              <Link href="/login" className="flex flex-row mb-8 items-center w-auto group hover:cursor-pointer">
                  <img src="/icons/left-arrow.png" alt="Back Icon" 
                      style={{ maxWidth: '20px', maxHeight: '20px' }}/>
                  <p className="mx-4 group-hover:bg-gray-400">Back to Dashboard</p>
              </Link>

              <div className="mb-4 rounded-lg bg-white py-4 px-8" style={{ userSelect: 'none' }}>
                        <h3 className="text-xl font-medium">{post.name}</h3>
                        <p className="text-gray-600">{post.body}</p>
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
        
      </div>
    );

                    }catch(e){
        console.log(e)
    }
  };

export default Post;