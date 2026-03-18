'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function Hero() {
  return (
    <div className="container-fluid py-5 mb-5 hero-header">
      <div className="container py-5">
        <div className="row g-5 align-items-center">

          {/* Left Content */}
          <div className="col-md-12 col-lg-7">
            <h4 className="mb-3 text-secondary">
                Welcome to ShopNest
            </h4>
            <h1 className="mb-5 display-3 text-primary">
               Your one-stop destination for quality electronics
            </h1>

            {/* <div className="position-relative mx-auto">
              <input
                className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
                type="number"
                placeholder="Search"
              />
              <button
                type="submit"
                className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
                style={{ top: 0, right: '25%' }}
              >
                Submit Now
              </button>
            </div> */}
          </div>

          {/* Right Swiper Carousel */}
          <div className="col-md-12 col-lg-5">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              className="position-relative"
            >
              {/* Slide 1 */}
              <SwiperSlide>
                <div className="position-relative rounded">
                  <img
                    src="/img/im1.jpg"
                    className="img-fluid w-100 rounded"
                    alt="Fruits"
                  />
                  <a
                    href="#"
                    className="btn px-4 py-2 text-white rounded position-absolute"
                    style={{ bottom: '20px', left: '20px' }}
                  >
            
                  </a>
                </div>
              </SwiperSlide>

              {/* Slide 2 */}
              <SwiperSlide>
                <div className="position-relative rounded">
                  <img
                    src="/img/im2.jpg"
                    className="img-fluid w-100 rounded"
                    alt="Vegetables"
                  />
                  <a
                    href="#"
                    className="btn px-4 py-2 text-white rounded position-absolute"
                    style={{ bottom: '20px', left: '20px' }}
                  >
                
                  </a>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

        </div>
      </div>
    </div>
  );
}
