import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Instagram, Heart, MessageCircle } from "lucide-react";

interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  timestamp: string;
}

const samplePosts: InstagramPost[] = [
  {
    id: "1",
    image: "/images/6410f68d0322f8da5803d234_DSC08260.jpg",
    likes: 127,
    comments: 12,
    caption: "Behind the scenes from our latest film production. The magic happens when creativity meets precision. 🎬✨ #FilmProduction #KNOWSStudios #LosAngeles",
    timestamp: "2 days ago"
  },
  {
    id: "2",
    image: "/images/6410f68d522d53663f34fe07_DSC08264.jpg",
    likes: 89,
    comments: 8,
    caption: "Professional headshots that capture your authentic self. Book your session today! 📸 #Headshots #ProfessionalPhotography #KNOWSStudios",
    timestamp: "4 days ago"
  },
  {
    id: "3",
    image: "/images/6410f68e36a9bb31a40f80aa_DSC08336.jpg",
    likes: 156,
    comments: 15,
    caption: "Our CYC wall setup ready for the next big project. Infinite possibilities in one space. 🌟 #CYCWall #FilmStudio #CreativeSpace",
    timestamp: "1 week ago"
  },
  {
    id: "4",
    image: "/images/6410f68e1714e4bfddcd18c3_DSC08256.jpg",
    likes: 203,
    comments: 22,
    caption: "Client work spotlight: Fashion editorial that brought this vision to life. Grateful for amazing collaborators! 👗 #FashionPhotography #Editorial #KNOWSStudios",
    timestamp: "1 week ago"
  }
];

export const InstagramFeed = () => {
  const [posts] = useState<InstagramPost[]>(samplePosts);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full text-white font-semibold mb-6">
            <Instagram className="w-5 h-5" />
            Follow Our Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-neon">@knowsstudios</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Behind-the-scenes content, client work, and creative inspiration from North Hollywood's premier studio
          </p>

          <a
            href="https://www.instagram.com/knowsstudios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl mt-8"
          >
            <Instagram className="w-5 h-5" />
            Follow on Instagram
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={post.image}
                  alt="Instagram post"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-6 text-white">
                    <div className="flex items-center gap-2">
                      <Heart className="w-6 h-6 fill-white" />
                      <span className="font-semibold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-semibold">{post.comments}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                  {post.caption}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{post.timestamp}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Want to see more behind-the-scenes content and client work?
          </p>
          <a
            href="https://www.instagram.com/knowsstudios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300"
          >
            <Instagram className="w-5 h-5" />
            View Full Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
