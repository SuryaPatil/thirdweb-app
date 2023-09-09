"use client"

const Attachment = ({src, alt, fileName}: {src: string, alt: string, fileName: string}) => {
    return (
        <div className="flex flex-row items-center">
            <img
                src={src}
                alt={alt}
                style={{ maxWidth: '32px', maxHeight: '32px', marginRight: '4px'}}
            />
            <p className="text-blue-600 hover:text-black"
                onMouseDown={(e) => {
                    e.stopPropagation(); // Prevent parent link from navigating
                    console.log("link clicked")
                }}>{fileName}</p>
        </div>
    )
}

export default Attachment;