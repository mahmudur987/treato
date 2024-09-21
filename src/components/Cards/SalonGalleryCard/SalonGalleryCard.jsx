import styles from './SalonGalleryCard.module.css'

export default function SalonGalleryCard({image,setLightBox}) {
  return (
    <div className={styles.salonGalleryCard} onClick={()=>setLightBox({open:true,index:0,src:image})}>
        <img loading="lazy" src={image} alt="" />
    </div>
  )
}
