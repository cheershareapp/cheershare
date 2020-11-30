import styles from './UImage.module.css'
import UIcon from '../UIcon'

const Uimage = ({ id, imageUrl, altDescription, onClick }) => {
  return (
    <div key={`uimg_container_${id}`} onClick={onClick}>
      <img className={styles.img} src={imageUrl} alt={altDescription} />
      {/*
      <div className={styles.actions}>
        <UIcon url={`/api/integrations/${vendor}/${id}`} name="download" />
      </div>
      */}
    </div>
  )
}

export default Uimage
