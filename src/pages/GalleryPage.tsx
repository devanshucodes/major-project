import React from 'react';

const GalleryPage = () => {
  const images = [
    {
      src: '/images/1.png',
      caption: 'Children enjoying their nutritious lunch'
    },
    {
      src: '/images/2.png',
      caption: 'Smiling faces during mealtime'
    },
    {
      src: '/images/3.png',
      caption: 'Community meal distribution'
    },
    {
      src: '/images/4.png',
      caption: 'Happy children after their meal'
    },
    {
      src: '/images/5.png',
      caption: 'Volunteers serving food'
    },
    {
      src: '/images/6.png',
      caption: 'Food preparation by our team'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Impact Gallery</h1>
        <p className="text-xl text-gray-600">
          See how your donations are making a difference in children's lives
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src={image.src}
              alt={image.caption}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-600 text-center">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage; 