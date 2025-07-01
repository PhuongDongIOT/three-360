import CarouselWithEffect from './carousel'

const thumbnailImages = ['/7.jpg', '/8.jpg', '/9.jpg', '/10.jpg']

export default function GalleryWithPreview({ list, setList, imagesAnother }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="flex md:flex-col gap-1 md:gap-2">
        {thumbnailImages.map((img, index) => (
          <div key={index} className="h-24 w-full">
            <img
              src={img}
              className="w-full h-full object-cover rounded-xl cursor-pointer"
              onClick={() => {
                if (index === 0 && setList) {
                  setList(imagesAnother)
                }
              }}
            />
          </div>
        ))}
      </div>
      <div className="col-span-3">
        <CarouselWithEffect images={list} />
      </div>
    </div>
  )
}
