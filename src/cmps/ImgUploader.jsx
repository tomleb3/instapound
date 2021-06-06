import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'

export const ImgUploader = ({ isPostMode }) => {

    const [img, setImg] = useState('')
    const firstRenderRef = useRef(true)
    const history = useHistory(null)

    useEffect(() => {
        if (firstRenderRef.current) return firstRenderRef.current = false
        isPostMode ? onPostUpload() : onUserImgUpload()
    }, [img])

    const onUploadImg = async ev =>
        setImg(ev.target.files[0])

    const onPostUpload = () => history.push({ pathname: '/create/style/', img })

    const onUserImgUpload = () => {

    }

    return <div>
        <input onChange={onUploadImg} hidden type="file" accept="image/*" id="uploader-input" />
    </div>
}
