import { ImageGallery } from '@/components/gallery/ImageGallery';
import { SectionHeading } from '@/components/common/SectionHeading';
import { localGallery, remoteGallery } from '@/data/images';

export function GalleryPage() {
  const items = [...localGallery, ...remoteGallery];

  return (
    <div className="container-salon py-14 sm:py-20">
      <SectionHeading
        kicker="Gallery"
        title="Salon photography"
        subtitle="Blowouts, colour, nails, beauty treatments and the space that hosts them."
      />
      <div className="mt-10">
        <ImageGallery items={items} />
      </div>
    </div>
  );
}
