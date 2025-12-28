import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Snowflake } from 'lucide-react';
import CloudinaryGallery from '../components/CloudinaryGallery';

interface CloudinaryImage {
  id: string;
  url: string;
  fullUrl: string;
  alt: string;
  created_at: string;
}

const GalleryPage = () => {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  const handleImagesLoaded = (images: CloudinaryImage[]) => {
    if (images.length > 0) {
      setHeroImage(images[0].fullUrl);
    }
  };

  return (
    <div>
      

      {/* Hero Section */}
      <section 
        className="relative py-20"
        style={{
          backgroundImage: heroImage ? `url(${heroImage})` : 'linear-gradient(to right, #0284c7, #075985)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white relative z-10"
          >
          

            <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[1.1] mb-6">
  Captured In Motion
</h1>

<p className="text-lg md:text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed font-normal">
  An intimate look into the moments that define our passion for the mountains.
</p>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Gallery Component */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <CloudinaryGallery onImagesLoaded={handleImagesLoaded} />
            </div>
          </motion.div>
        </div>
      </section>

      
    </div>
  );
};

export default GalleryPage;