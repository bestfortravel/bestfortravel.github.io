'use client';

import React from 'react';
import './Monuments.scss';
import Button from '@/components/Button/Button';

interface Monument {
  id: number;
  name: string;
  rating: string;
  backgroundColor: string;
  image: string;
}

export default function Monuments() {
  const monuments: Monument[] = [
    {
      id: 1,
      name: 'La Sagrada Familia',
      rating: '5.0',
      backgroundColor: '#F5F3FF',
      image: '/icons/LaSagradaFamilia.svg',
    },
    {
      id: 2,
      name: 'Louvre Museum',
      rating: '5.0',
      backgroundColor: '#ECFEFF',
      image: '/icons/LouvreMuseum.svg',
    },
    {
      id: 3,
      name: 'Duomo di Milano',
      rating: '4.9',
      backgroundColor: '#ECFDF5',
      image: '/icons/DuomoDiMilano.svg',
    },
    {
      id: 4,
      name: 'La Tour Eiffel',
      rating: '4.9',
      backgroundColor: '#FEFCE8',
      image: '/icons/LaTourEiffel.svg',
    },
    {
      id: 5,
      name: 'Colosseo di Roma',
      rating: '4.8',
      backgroundColor: '#FDF2F8',
      image: '/icons/ColosseoDiRoma.svg',
    },
  ];

  const StarIcon = () => (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='star-icon'
    >
      <path
        d='M18.3039 8.97274L14.7882 12.0063L15.8593 16.5431C15.9184 16.7893 15.9032 17.0476 15.8156 17.2852C15.728 17.5229 15.5719 17.7292 15.3671 17.8782C15.1623 18.0272 14.9179 18.1121 14.6648 18.1222C14.4118 18.1324 14.1614 18.0673 13.9453 17.9352L9.99995 15.5071L6.0523 17.9352C5.83622 18.0666 5.58613 18.131 5.3335 18.1205C5.08087 18.11 4.837 18.0249 4.63261 17.8761C4.42822 17.7272 4.27243 17.5212 4.18488 17.284C4.09732 17.0468 4.08191 16.789 4.14058 16.5431L5.21558 12.0063L1.69995 8.97274C1.50878 8.80752 1.37052 8.58963 1.30244 8.34629C1.23436 8.10296 1.23947 7.84496 1.31715 7.60452C1.39483 7.36407 1.54162 7.15184 1.73919 6.99432C1.93677 6.83681 2.17637 6.74099 2.42808 6.71884L7.03745 6.34696L8.81558 2.04384C8.91182 1.80932 9.07563 1.60872 9.28618 1.46754C9.49673 1.32636 9.7445 1.25098 9.998 1.25098C10.2515 1.25098 10.4993 1.32636 10.7098 1.46754C10.9204 1.60872 11.0842 1.80932 11.1804 2.04384L12.9578 6.34696L17.5671 6.71884C17.8193 6.74017 18.0596 6.83545 18.2579 6.99275C18.4562 7.15005 18.6037 7.36236 18.6819 7.6031C18.76 7.84383 18.7654 8.10228 18.6973 8.34606C18.6292 8.58984 18.4907 8.80811 18.2992 8.97352L18.3039 8.97274Z'
        fill='#EAB308'
      />
    </svg>
  );

  return (
    <div className='wrapper monuments-wrapper'>
      <div className='monuments-container'>
        <h2 className='monuments-title'>
          Top 5 rated historical monuments worth visiting
        </h2>

        <div className='monuments-grid'>
          {monuments.map((monument) => (
            <div key={monument.id} className='monument-item'>
              <div
                className='monument-icon-container'
                style={{ backgroundColor: monument.backgroundColor }}
              >
                <img
                  src={monument.image}
                  alt={monument.name}
                  className='monument-icon'
                />
              </div>

              <div className='monument-info'>
                <div className='monument-name'>{monument.name}</div>
                <div className='monument-rating'>
                  <StarIcon />
                  <span className='rating-value'>{monument.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button color='secondary'>Discover more</Button>
      </div>
    </div>
  );
}
