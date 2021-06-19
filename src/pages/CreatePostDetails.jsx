import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { postService } from '../services/postService'
import { cloudinaryService } from '../services/cloudinaryService'
import { useHistory } from "react-router"

const _CreatePostDetails = ({ loggedInUser, imgFile, blobUrl }) => {

    const txtAreaRef = useRef(null)
    const firstRenderRef = useRef(true)
    const history = useHistory(null)
    const location = history.location
    const [cloudinaryState, setCloudinaryState] = useState({
        secureUrl: '',
        isUploading: false
    })
    let geoTag = null
    let taggedUsers = []

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

    const onTxtAreaScroll = () => {
        txtAreaRef.current.className = 'scroll-visible'
        setTimeout(() => txtAreaRef.current.className = '', 1000)
    }

    const onUploadPost = async () => {
        const cloudinaryData = await cloudinaryService.uploadImg(imgFile.current)
        setCloudinaryState({
            secureUrl: cloudinaryData.secure_url,
            isUploading: true
        })
    }

    return <section className="create-post-details main-layout m-page flex a-center">
        <img className="user-img" src={loggedInUser.imgUrl} alt="User" />
        <textarea placeholder="Write a caption..." onScroll={onTxtAreaScroll}
            ref={txtAreaRef} autoCorrect="off" autoComplete="off" />
        <img className="post-img" src={blobUrl} alt="Post" />
        <button onClick={onUploadPost}>Share</button>
    </section>
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
export const CreatePostDetails = connect(mapStateToProps)(_CreatePostDetails)