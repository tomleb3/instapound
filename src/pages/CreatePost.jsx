import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import { postService } from '../services/postService'
import { cloudinaryService } from '../services/cloudinaryService'
import { ImgCropper } from "../cmps/ImgCropper"

const _CreatePost = ({ loggedInUser }) => {

    const { currTab } = useParams(null)
    const txtAreaRef = useRef(null)
    const firstRenderRef = useRef(true)
    const history = useHistory(null)
    const location = history.location
    const imgFile = location.img
    const imgFileForView = URL.createObjectURL(imgFile)
    const [cloudinaryState, setCloudinaryState] = useState({
        secureUrl: '',
        isUploading: false
    })
    let geoTag = null
    let taggedUsers = []

    const onTxtAreaScroll = () => {
        txtAreaRef.current.className = 'scroll-visible'
        setTimeout(() => txtAreaRef.current.className = '', 1000)
    }

    useEffect(() => {
        if (firstRenderRef.current) return firstRenderRef.current = false;
        (async () => {
            setCloudinaryState({ ...cloudinaryState, isUploading: false })
            await postService.add({
                imgUrl: cloudinaryState.secureUrl,
                txt: txtAreaRef.current.value,
                geoTag,
                taggedUsers
            })
            history.push('/')
        })()
    }, [cloudinaryState.secureUrl])

    const onUploadPost = async () => {
        const cloudinaryData = await cloudinaryService.uploadImg(imgFile)
        setCloudinaryState({
            secureUrl: cloudinaryData.secure_url,
            isUploading: true
        })
    }

    if (!location.img) return <Link to="/" />
    let styleTab = (
        <div className="style-container">
            {/* TODO - create cropping mechanism */}
            <ImgCropper img={imgFileForView} />
        </div>
    )
    let detailsTab = (
        <div className="details-container flex a-center">
            <img className="user-img" src={loggedInUser.imgUrl} alt="User" />
            <textarea placeholder="Write a caption..." onScroll={onTxtAreaScroll}
                ref={txtAreaRef} autoCorrect="off" autoComplete="off" />
            <img className="post-img" src={imgFileForView} alt="Post" />
            <button onClick={onUploadPost}>Share</button>
        </div>
    )

    return <section className="create-post main-layout m-page">
        {currTab === 'style' ? styleTab : detailsTab}
    </section>

}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
export const CreatePost = connect(mapStateToProps)(_CreatePost)