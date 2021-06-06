export const ImgCropper = ({ img }) => {

    return <div className="img-cropper">
        <div className="post-img" style={{ backgroundImage: `url(${img})` }}></div>
        <div className="cropper-container">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
}