import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { cloudinaryService } from '../services/cloudinaryService'

export const CloudinaryUploader = ({ isPostMode }) => {

    const [uploaded, toggleUploaded] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    const history = useHistory(null)

    useEffect(() => {
        if (!uploaded) return
        isPostMode ? onPostUpload() : onUserImgUpload()
    }, [uploaded])

    useEffect(() => {
        return () => toggleUploaded(false)
    }, [])

    const onUploadImg = async ev => {
        setImgUrl(await cloudinaryService.uploadImg(ev.target.files[0]))
        toggleUploaded(true)
    }

    const onPostUpload = () => history.push({ pathname: '/create/details/', imgUrl })

    const onUserImgUpload = () => {

    }

    return <div className="cloudinary-uploader">
        <input onChange={onUploadImg} hidden type="file" accept="image/*" id="uploader-input" />
    </div>
}
