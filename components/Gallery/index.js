import useSWR from 'swr'
import fetcher from 'utils/fetch'
import styles from 'Gallery.module.css'
import UImage from 'components/UImage'

const Gallery = ({ q, vendor, onImageSelect }) => {
  const { data, error } = useSWR(
    `/api/integrations/${vendor}/search?q=`+encodeURI(q),
    fetcher
  );

  if (error) return <div>failed to load</div>

  if (!data) return <div>loading...</div>

  return (
    <section className={styles.gallery_container}>
      {data.results.map(({ id, imageUrl, alt_description, description }) => (
        <UImage
          id={id}
          imageUrl={imageUrl}
          altDescription={alt_description ? alt_description : description}
          key={`${id}_uimage_component`}
          vendor={vendor}
          onClick={() => onImageSelect(imageUrl)}
        />
      ))}
    </section>
  )
};

export default Gallery
