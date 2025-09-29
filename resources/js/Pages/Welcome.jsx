import { Head } from "@inertiajs/react"
import GuestNavbar from "../Layouts/GuestNavbar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const heroSections = [
  {
    id: 1,
    title: "Luxury Awaits You",
    description: "Experience unparalleled comfort and service at our premium hotel.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 2,
    title: "Exclusive Deals",
    description: "Special packages and seasonal offers for the perfect getaway.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 3,
    title: "Perfect Venues",
    description: "Host your events in our elegant spaces with professional service.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  },
]

export default function Welcome() {
  return (
    <>
      <Head title="Welcome to Our Hotel" />

      {/* Navbar fixed sa top */}
      <GuestNavbar>

      {/* Hero Section nasa ilalim mismo ng navbar */}
      <section className="relative w-full h-screen  -mt-0">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {heroSections.map((hero) => (
              <CarouselItem key={hero.id} className="w-full h-screen relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={hero.image}
                    alt={hero.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

                {/* Text Overlay */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{hero.title}</h1>
                  <p className="text-xl md:text-2xl max-w-2xl">{hero.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls */}
          <CarouselPrevious className="left-4 text-white border-2 border-white bg-black/20 hover:bg-black/40 size-12" />
          <CarouselNext className="right-4 text-white border-2 border-white bg-black/20 hover:bg-black/40 size-12" />
        </Carousel>
      </section>

      </GuestNavbar>
    </>
  )
}
