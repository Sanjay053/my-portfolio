import loadingVideo from "../Asset/loading.mp4"; 

export default function LoadingPage() {

  return (
       <div className="h-screen w-screen flex items-center justify-center bg-white flex flex-col py-20">
        <h1 className=" animate-bounce">Welcome to Portfolio</h1>
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full"
        >
          <source src={loadingVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
  );
}
