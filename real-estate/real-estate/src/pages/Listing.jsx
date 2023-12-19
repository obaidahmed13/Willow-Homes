import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'

export default function Listing() {
    SwiperCore.use([Navigation])
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [error, setError] = useState(false)
    useEffect(()=> {
        const fetchListing = async () => {
            try {
                const res = await fetch (`/api/listing/get/${params.listingId}`)
                const data = await res.json();
                if (data.success === false) {
                    setError(true)
                    return;
                }
                setListing(data)
                setError(false)
            } catch (error) {
                setError(true)
            }
            
        }
        fetchListing()
    }, [params.listingId])
  return (
    <main>
        {error && <p className='text-3xl my-5 text-center'>Something went wrong!</p>}
        {listing && !error && (
        <div>
            <Swiper navigation>
                {listing.imageUrls.map((url)=>(
                    <SwiperSlide key={url}>
                        <div 
                            className='h-[550px]' 
                            style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
        )}
    </main>
  )
}
