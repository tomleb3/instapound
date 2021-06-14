import { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router"
import { Link } from 'react-router-dom'
import { utilService } from '../services/utilService'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/lib/ReactCrop.scss'

export const CreatePostStyle = () => {

    const history = useHistory(null)
    const location = history.location
    const [img64, setImg64] = useState(null)
    const { getBase64, img64ToCanvasRef } = utilService
    const imgFile = useRef(location.img).current
    const blobUrl = useRef(imgFile && URL.createObjectURL(imgFile)).current
    let previewCanvasRef = useRef(null)
    const [crop, setCrop] = useState({
        unit: 'px',
        aspect: 1 / 1,
        x: 0,
        y: 0,
        width: 598,
        height: 598,
    })

    useEffect(() => {
        getBase64(imgFile, res => setImg64(res))
    }, [])

    const handleCropComplete = (crop, pixelCrop) => {
        console.log(crop,pixelCrop)
        img64ToCanvasRef(previewCanvasRef.current, img64, pixelCrop)
    }

    // if (!imgFile || !blobUrl) return <div></div>
    return <section className="create-post-style main-layout m-page">
        <ReactCrop src={img64} crop={crop} ruleOfThirds locked
            onChange={newCrop => setCrop(newCrop)} onComplete={handleCropComplete} />
        <button className="btn-continue flex">
            <Link to={{ pathname: "/create/details/", imgFile, blobUrl }}>Continue</Link>
        </button>
        <canvas
            ref={previewCanvasRef}
            style={{
                width: Math.round(crop?.width ?? 0),
                height: Math.round(crop?.height ?? 0)
            }} />
    </section>
}