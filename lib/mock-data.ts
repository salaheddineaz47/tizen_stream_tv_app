import type { VideoContent, TVChannel } from "@/types/content";

export const mockMovies: VideoContent[] = [
  {
    id: "movie-1",
    title: "The Dark Knight",
    description: "Batman faces the Joker in this epic superhero thriller.",
    thumbnail: "/movie-dark-knight.jpg",
    duration: "2h 32m",
    genre: "Action",
    year: 2008,
    rating: "9.0",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
  {
    id: "movie-2",
    title: "Inception",
    description: "A thief enters people's dreams to steal secrets.",
    thumbnail: "/movie-inception.jpg",
    duration: "2h 28m",
    genre: "Sci-Fi",
    year: 2010,
    rating: "8.8",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
  {
    id: "movie-3",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space.",
    thumbnail: "/movie-interstellar.jpg",
    duration: "2h 49m",
    genre: "Sci-Fi",
    year: 2014,
    rating: "8.6",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
  {
    id: "movie-4",
    title: "The Matrix",
    description: "A computer programmer discovers reality is a simulation.",
    thumbnail: "/movie-matrix.jpg",
    duration: "2h 16m",
    genre: "Action",
    year: 1999,
    rating: "8.7",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
  {
    id: "movie-5",
    title: "Pulp Fiction",
    description: "Interconnected stories of crime in Los Angeles.",
    thumbnail: "/movie-pulp-fiction.jpg",
    duration: "2h 34m",
    genre: "Crime",
    year: 1994,
    rating: "8.9",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
  {
    id: "movie-6",
    title: "The Godfather",
    description: "The aging patriarch of a crime dynasty transfers control.",
    thumbnail: "/movie-godfather.jpg",
    duration: "2h 55m",
    genre: "Crime",
    year: 1972,
    rating: "9.2",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
];

export const mockSeries: VideoContent[] = [
  {
    id: "series-1",
    title: "Breaking Bad",
    description: "A chemistry teacher turns to cooking meth.",
    thumbnail: "/series-breaking-bad.jpg",
    duration: "5 Seasons",
    genre: "Drama",
    year: 2008,
    rating: "9.5",
    streamUrl: "http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8",
  },
  {
    id: "series-2",
    title: "Game of Thrones",
    description: "Noble families fight for control of the Iron Throne.",
    thumbnail: "/series-got.jpg",
    duration: "8 Seasons",
    genre: "Fantasy",
    year: 2011,
    rating: "9.3",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
  {
    id: "series-3",
    title: "Stranger Things",
    description: "Kids in a small town encounter supernatural forces.",
    thumbnail: "/series-stranger-things.jpg",
    duration: "4 Seasons",
    genre: "Horror",
    year: 2016,
    rating: "8.7",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
  {
    id: "series-4",
    title: "The Office",
    description: "Mockumentary about office workers in Scranton.",
    thumbnail: "/series-office.jpg",
    duration: "9 Seasons",
    genre: "Comedy",
    year: 2005,
    rating: "8.9",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
  {
    id: "series-5",
    title: "The Crown",
    description: "The reign of Queen Elizabeth II.",
    thumbnail: "/series-crown.jpg",
    duration: "6 Seasons",
    genre: "Drama",
    year: 2016,
    rating: "8.6",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
  {
    id: "series-6",
    title: "Friends",
    description: "Six friends navigate life and love in New York City.",
    thumbnail: "/series-friends.jpg",
    duration: "10 Seasons",
    genre: "Comedy",
    year: 1994,
    rating: "8.9",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
];

export const mockReplayContent: VideoContent[] = [
  {
    id: "replay-1",
    title: "Evening News - Feb 2",
    description: "Latest news and current affairs.",
    thumbnail: "/replay-news.jpg",
    duration: "1h 0m",
    genre: "News",
    year: 2025,
    rating: "",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
  {
    id: "replay-2",
    title: "Sports Highlights",
    description: "Best moments from today's games.",
    thumbnail: "/replay-sports.jpg",
    duration: "45m",
    genre: "Sports",
    year: 2025,
    rating: "",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
  {
    id: "replay-3",
    title: "Cooking Show - Italian Cuisine",
    description: "Learn to make authentic Italian dishes.",
    thumbnail: "/replay-cooking.jpg",
    duration: "30m",
    genre: "Lifestyle",
    year: 2025,
    rating: "",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
  {
    id: "replay-4",
    title: "Documentary: Ocean Life",
    description: "Explore the mysteries of the deep sea.",
    thumbnail: "/replay-documentary.jpg",
    duration: "1h 30m",
    genre: "Documentary",
    year: 2025,
    rating: "8.2",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
];

export const mockTVChannels: TVChannel[] = [
  {
    id: "channel-1",
    name: "BBC One",
    logo: "/channel-bbc-one.png",
    genre: "General",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    isLive: true,
  },
  {
    id: "channel-2",
    name: "CNN",
    logo: "/channel-cnn.png",
    genre: "News",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    isLive: true,
  },
  {
    id: "channel-3",
    name: "ESPN",
    logo: "/channel-espn.png",
    genre: "Sports",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    isLive: true,
  },
  {
    id: "channel-4",
    name: "Discovery",
    logo: "/channel-discovery.png",
    genre: "Documentary",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    isLive: true,
  },
  {
    id: "channel-5",
    name: "National Geographic",
    logo: "/channel-natgeo.png",
    genre: "Documentary",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    isLive: true,
  },
  {
    id: "channel-6",
    name: "Comedy Central",
    logo: "/channel-comedy.png",
    genre: "Comedy",
    streamUrl:
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    isLive: true,
  },
];
