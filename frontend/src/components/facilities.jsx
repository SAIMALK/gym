import React from 'react';
import { Container } from 'react-bootstrap'; // If you're using react-bootstrap
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

import dumbleImg from '../assets/dumble.jpg';
import machineImg from '../assets/machine.jpeg';
import locker from '../assets/locker.jpeg';

const Facilities = () => {
  const facilities = [
    { img: dumbleImg, desc: 'High-quality Dumbbells' },
    { img: machineImg, desc: 'Advanced Gym Machines' },
    { img: locker, desc: 'Secure Lockers' },
  ];

  return (
    <Container className="facilities my-5">
      <h2 className="text-center mb-4">Facilities</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        loop={true}
      >
        {facilities.map((facility, index) => (
          <SwiperSlide key={index}>
            <div className="facility-item text-center">
              <img
                src={facility.img}
                alt={`Facility ${index + 1}`}
                className="facility-img"
              />
              <p>{facility.desc}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Facilities;
