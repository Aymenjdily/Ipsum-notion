import Intro from "./_components/Intro";
import Gallery from "./_components/Gallery";
import Footer from "./_components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Intro />
        <Gallery />
      </div>
      <Footer />
    </div>
  );
}
