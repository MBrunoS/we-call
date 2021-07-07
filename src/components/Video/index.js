import { useEffect, useRef } from 'react'
import './Video.css'

export default function Video({ ref, srcObject, ...props }) {
  const refVideo = useRef(null)

  useEffect(() => {
    if (!refVideo.current) return
    refVideo.current.srcObject = srcObject
  }, [srcObject])

  return <video ref={refVideo} {...props} />
}