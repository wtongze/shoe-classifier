import { Carousel } from 'antd';
import ArrowButton from './ArrowButton';
import { images } from './config';
import { CarouselRef } from 'antd/es/carousel';
import './ImageCarousel.css';

interface Props {
  imgRef: React.Ref<HTMLImageElement>;
  carouselRef: React.Ref<CarouselRef>;
  customImgURL?: string;
  onCarouselAfterChange?: (curr: number) => void;
}

function ImageCarousel(props: Props) {
  return (
    <div style={{ position: 'relative' }}>
      <img ref={props.imgRef} style={{ display: 'none' }} alt="for TF.js" />
      <Carousel
        ref={props.carouselRef}
        swipeToSlide
        arrows
        prevArrow={<ArrowButton direction="left" />}
        nextArrow={<ArrowButton direction="right" />}
        afterChange={props.onCarouselAfterChange}
      >
        {images.map((i) => (
          <div key={i.label} className="item">
            <img src={i.url} alt={i.label} />
          </div>
        ))}

        {props.customImgURL ? (
          <div className="item">
            <img src={props.customImgURL} alt="custom" />
          </div>
        ) : null}
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
