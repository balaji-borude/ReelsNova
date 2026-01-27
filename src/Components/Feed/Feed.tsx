
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

// Import ReelCard component
import { ReelCard } from '../shared/ReelCard';

// Sample reel data -- HERE we want to fetch data from backend
const reels = [
  {
    username: "dance_queen",
    thumbnail: "/dance-video-content-creator.jpg",
    likes: "234K",
    comments: "1.2K",
    caption: "New choreo alert! 💃 #dance #viral",
  },
  {
    username: "foodie_chef",
    thumbnail: "/cooking-food-video-chef.jpg",
    likes: "89K",
    comments: "456",
    caption: "5-minute pasta recipe 🍝 #cooking",
  },
  {
    username: "travel_vibes",
    thumbnail: "/mountain-adventure-sunset.png",
    likes: "567K",
    comments: "2.3K",
    caption: "Sunset in Bali 🌅 #travel #paradise",
  },
  {
    username: "fitness_pro",
    thumbnail: "/fitness-workout-gym-motivation.jpg",
    likes: "123K",
    comments: "890",
    caption: "Morning workout routine 💪 #fitness",
  },
  {
    username: "comedy_king",
    thumbnail: "/comedy-funny-video-entertainer.jpg",
    likes: "890K",
    comments: "5.6K",
    caption: "When Monday hits different 😂 #funny",
  },
  {
    username: "art_studio",
    thumbnail: "/art-painting-creative-studio.jpg",
    likes: "45K",
    comments: "234",
    caption: "Painting process ✨ #art #creative",
  },
];

const Feed = () => {
  return (
    <div className='h-screen w-full  bg-neutral-950 overflow-hidden'>
      <Swiper
        direction='vertical'
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        keyboard={{
          enabled: true,
        }}
        modules={[Mousewheel, Keyboard]}
        className='h-full w-full'
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {reels.map((reel, index) => (
          <SwiperSlide key={index} className='flex items-center justify-center bg-neutral-950 w-full h-full'>
            <div className='w-[400px] h-[85vh]'>
              <ReelCard {...reel} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Feed
