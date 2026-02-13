'use client'
import { useEffect, useState } from 'react'
import Image from "next/image";
import ReactPaginate from 'react-paginate';
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";
import Link from 'next/link';

export default function Actors() {
  
  const [products, setProducts] = useState([])
  const [fynts, setfynts] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(21);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[,\s]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

  useEffect(() => {
    setLoading(true)
    fetch("https://grgrg4ee.onrender.com/kino/actors")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка загрузки");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setTotalProducts(data.length);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const [emails, setEmails] = useState("");
  const [status, setStatus] = useState("");

  const sendEmail = async () => {
    if (!emails) {
      setStatus("Enter your email");
      return;
    }

    try {
      const res = await fetch("https://grgrg4ee.onrender.com/newsi/newosti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails }),
      });

      if (!res.ok) throw new Error("Request failed");

      await res.json();
      setStatus("Email sent successfully");
      setEmails("");
    } catch (err) {
      setStatus("Something went wrong");
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  
  // Flatten actors array
  const allActors = products.flatMap(product => product.masactor || []);
  const currentActors = allActors.slice(indexOfFirstProduct, indexOfLastProduct);

  if (!products) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="relative">
        <div className="w-28 h-28 rounded-full border-[6px] border-gray-800 border-t-red-600 animate-spin"></div>
        <div className="absolute inset-0 w-28 h-28 rounded-full border-[6px] border-transparent border-b-amber-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      <div className="mt-10 text-center">
        <span className="block text-amber-500 tracking-[0.4em] text-3xl font-black animate-pulse mb-2">
          LOADING
        </span>
        <span className="text-gray-500 text-sm tracking-wider">Please wait...</span>
      </div>
    </div>
  );

  const ActorCardSkeleton = () => (
    <div className="group my-6 relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 animate-pulse">
      <div className="relative w-full h-[300px] sm:h-[360px] lg:h-[400px] bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600/40 via-amber-600/40 to-red-600/40" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="h-5 w-3/4 bg-gray-500/70 rounded mb-2" />
        <div className="h-4 w-1/2 bg-gray-500/50 rounded" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#00000000]">
      
   
        <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]"></div>
        </div>
  
        
        <ScrollToTop
          smooth
          top={100}
          component={
            <div className="relative group">
              <FaArrowUp size={18} className="text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 rounded-full blur opacity-75 group-hover:opacity-100 transition"></div>
            </div>
          }
          style={{
            backgroundColor: "#dc2626",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 10px 40px rgba(220, 38, 38, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            zIndex: 50,
          }}
        />
  
        
        <div className="flex min-[501px]:hidden">
          {!fynts && (
            <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl">
              <div className="relative h-full flex flex-col items-center justify-start p-6 space-y-6">
                
                <div className="mb-[100px] flex">
                  <Image
                    src="/img/Copilot_20251012_035756.png"
                    width={125}
                    height={125}
                    alt="User Avatar"
                    className="w-[125px] min-[400px]:ml-[100px] max-[400px]:ml-[90px] h-[125px] rounded-full shadow-2xl ring-4 ring-red-500/30"
                  />
                  <button 
                    className="min-[400px]:ml-[90px] max-[400px]:ml-[70px] text-[25px] text-red-500 hover:text-red-400 transition-colors" 
                    onClick={() => setfynts(!false)}
                  >
                    X
                  </button>
                </div>
                
                <nav className="flex text-amber-50 flex-wrap mx-[200px] justify-center gap-10">
                  {["Media", "Movies", "ACTORS", "NEWS", "CATEGORIES"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="nosifer-regular text-[17px] text-center transition duration-300 transform hover:text-red-500 hover:underline hover:scale-110"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
  
        
       <div className={`sticky top-0 z-40 transition-all duration-500 ${
              isScrolled 
                ? 'bg-[#00000000] backdrop-blur-2xl shadow-2xl border-' 
                : 'bg-transparent'
            }`}>
              <div className="flex min-[1058px]:justify-center max-[1058px]:justify-around 2xl:gap-[130px] xl:gap-[70px] max-[500px]:gap-[5px] min-[400px]:mx-[30px] max-[400px]:mx-[10px]">
                
                <div className="flex gap-[4px] min-[500px]:hidden">
                  <button 
                    onClick={() => setfynts(false)} 
                    className="min-[400px]:w-[55px] max-[400px]:w-[44px] min-[400px]:h-[52px] max-[400px]:h-[42px] min-[400px]:rounded-[20px] max-[400px]:rounded-[15px] 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-[80px] sm:mt-[80px] mt-[50px] hover:scale-110 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                  >
                    <div className="min-[400px]:ml-[15px] max-[400px]:ml-[10px] min-[400px]:mb-[0px] max-[400px]:mb-[3px]">
                      <div className="w-[25px] h-[3px] my-[6px] bg-red-500"></div>
                      <div className="w-[25px] h-[3px] my-[6px] bg-red-500"></div>
                      <div className="w-[25px] h-[3px] bg-red-500"></div>
                    </div>
                  </button>
                </div>
      
                <div className="flex gap-[4px] min-[1058px]:hidden">
                  <a 
                    href="#" 
                    className="min-[400px]:w-[55px] max-[400px]:w-[44px] min-[400px]:h-[52px] max-[400px]:h-[42px] min-[400px]:rounded-[20px] max-[400px]:rounded-[15px] 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-[80px] sm:mt-[80px] mt-[50px] hover:scale-110 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                  >
                    <Image
                      src="/img/Vector.png"
                      width={25}
                      height={25}
                      alt="Search"
                      className="w-[25px] mx-auto min-[400px]:mt-[15px] max-[400px]:mt-[10px] hover:scale-140 transition duration-400 ease-in-out h-[25px]"
                    />
                  </a>
                </div>
      
                <Image
                  src="/img/Copilot_20251012_035756.png"
                  width={150}
                  height={150}
                  alt="Logo"
                  className="2xl:w-[150px] xl:h-[150px] lg:w-[150px] lg:h-[150px] md:h-[150px] md:w-[150px] sm:h-[150px] sm:w-[150px] min-[400px]:w-[140px] max-[400px]:w-[125px] min-[400px]:h-[140px] max-[400px]:h-[125px] xl:w-[150px] 2xl:h-[150px] drop-shadow-2xl hover:drop-shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all duration-500 hover:scale-110"
                />
      
                <div className="hidden min-[1058px]:flex">
                  <div className='flex justify-center pt-[70px] h-[5px] 2xl:gap-[70px] xl:gap-[50px] gap-[30px] text-[20px] text-amber-50'>
                    <a href="#" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                      Media
                      <span className="absolute  bg-gradient-to-r from-red-500  group-hover:w-full transition-all duration-500"></span>
                    </a>
                    <a href="/movies" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                      Movies
                      <span className="absolute  bg-gradient-to-r from-red-500  group-hover:w-full transition-all duration-500"></span>
                    </a>
                    <a href="/actors" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                      ACTORS
                      <span className="absolute  bg-gradient-to-r from-red-500  group-hover:w-full transition-all duration-500"></span>
                    </a>
                    <a href="/news" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                      NEWS
                      <span className="absolute  bg-gradient-to-r from-red-500  group-hover:w-full transition-all duration-500"></span>
                    </a>
                    <a href="#" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                      CATEGORIES
                      <span className="absolute  bg-gradient-to-r from-red-500  group-hover:w-full transition-all duration-500"></span>
                    </a>
                  </div>
                </div>
      
                <div className="hidden min-[1058px]:flex">
                  <div className="flex mt-[50px] gap-[12px]">
                    <a 
                      href="#" 
                      className="w-[55px] h-[52px] rounded-[20px] hover:scale-110 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 flex items-center justify-center"
                    >
                      <Image
                        src="/img/Vector.png"
                        width={25}
                        height={25}
                        alt="Search"
                        className="w-[25px] h-[25px] hover:scale-140 transition duration-400 ease-in-out"
                      />
                    </a>
                    <button className="w-[138px] cursor-pointer nosifer-regular hover:scale-110 h-[53px] font-semibold px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-[15px] hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300">
                      Enter
                    </button>
                  </div>
                </div>
      
                <div className="flex min-[1058px]:hidden">
                  <button className="cursor-pointer min-[500px]:w-[138px] nosifer-regular max-[500px]:w-[90px] min-[500px]:h-[53px] max-[500px]:h-[52px] 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-[80px] sm:mt-[80px] mt-[50px] hover:scale-110 font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white rounded-[20px] hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300">
                    Enter
                  </button>
                </div>
              </div>
            </div>
  

      {/* Main Content */}
      <div className='min-[1900px]:mx-[15%] min-[1000px]:mx-[10%] min-[500px]:mx-[12%] min-[408px]:mx-[6%] mx-[5%]'>
        
        {/* Page Title */}
        <h1 className='text-amber-50 font-extrabold text-4xl lg:text-6xl mb-4'>Actors</h1>
        
        {/* Breadcrumbs */}
        <nav className="flex mb-[40px] mt-[5px] gap-2 text-sm">
          <a href="/" className="hover:underline text-[20px] text-gray-500 hover:text-red-500 transition-colors">
            Home
          </a>
          <span className="text-gray-600 mt-[4px]">›</span>
          <span className="text-red-500 text-[20px] font-medium">actors</span>
        </nav>

        {/* Actors Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-10">
            {products.map((product) => (
              <ActorCardSkeleton key={product._id} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-10">
            {currentActors.map((actor) => (
              <Link
                key={actor._id}
                href={`/actors/${slugify(actor.nameacter)}`}
                className="group relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 hover:border-red-500/30 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative w-full h-[300px] sm:h-[360px] lg:h-[400px]">
                  <Image
                    src={`https://grgrg4ee.onrender.com/kino${actor.imgacter}`}
                    alt={actor.nameacter}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Top Border */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-amber-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Actor Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-white text-lg sm:text-xl font-semibold leading-snug line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
                    {actor.nameacter}
                  </h2>
                  <p className="text-gray-300 text-sm mt-2 line-clamp-1">
                    {actor.datarodactor}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className='mb-[100px]'>
          <ReactPaginate
            previousLabel="←"
            nextLabel="→"
            pageCount={Math.ceil(allActors.length / productsPerPage)}
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            containerClassName="flex items-center gap-2 sm:gap-4 justify-center mt-[80px]"
            pageClassName="rounded"
            pageLinkClassName="
              px-3 py-2 sm:px-6 sm:py-3    
              text-sm sm:text-lg border border-red-500/30 rounded-lg 
              text-amber-50 font-semibold 
              hover:bg-gradient-to-r hover:from-red-600 hover:to-amber-600 hover:border-transparent
              transition-all duration-300 ease-in-out
              hover:shadow-lg hover:shadow-red-500/50
            "
            activeLinkClassName="
              bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold 
              px-3 py-2 sm:px-6 sm:py-3 rounded-lg text-lg
              shadow-lg shadow-red-500/50 border-transparent
            "
            previousLinkClassName="
              px-3 py-2 sm:px-6 sm:py-3 text-lg border border-red-500/30 rounded-lg 
              text-amber-50 font-semibold 
              hover:bg-gradient-to-r hover:from-red-600 hover:to-amber-600 hover:border-transparent
              transition-all duration-300 ease-in-out
              hover:shadow-lg hover:shadow-red-500/50
            "
            nextLinkClassName="
              px-3 py-2 sm:px-6 sm:py-3 text-lg border border-red-500/30 rounded-lg 
              text-amber-50 font-semibold 
              hover:bg-gradient-to-r hover:from-red-600 hover:to-amber-600 hover:border-transparent
              transition-all duration-300 ease-in-out
              hover:shadow-lg hover:shadow-red-500/50
            "
            disabledLinkClassName="opacity-40 cursor-not-allowed px-3 py-2 sm:px-6 sm:py-3 rounded-lg text-lg border border-red-500/30"
            breakLinkClassName="px-2 sm:px-6 py-2 sm:py-3 text-amber-50 text-lg"
          />
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-[#00000000] flex justify-center w-[100%] h-[700px]">
        <div className="my-[70px] min-[500px]:w-[1400px] max-[500px]:w-[360px] mx-[8%] h-[580px] rounded-[10px] bg-gradient-to-br from-red-900/20 via-black to-amber-900/20 border border-red-900/30 flex flex-col items-center relative overflow-hidden">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-amber-600/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 w-full flex flex-col items-center">
          
            <h2 className="text-amber-50 mx-[20px] font-extrabold text-center mt-[14%] min-[500px]:text-[30px] max-[500px]:text-[22px]">
              Leave your email address to receive news and updates
            </h2>

            {/* Email Form */}
            <div className="flex mx-[10px] justify-center flex-wrap mt-10 gap-4">
              <input
                type="email"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                placeholder="Enter your email"
                className="px-8 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white/10"
              />

              <button
                onClick={sendEmail}
                className="min-[530px]:px-14 max-[530px]:px-28 py-5 bg-gradient-to-r from-red-600 via-red-600 to-amber-600 text-white rounded-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Send
              </button>
            </div>

            {/* Status Message */}
            {status && (
              <p className="text-center text-amber-50 mt-6 text-sm">
                {status}
              </p>
            )}

            <div className="min-[500px]:mt-10">
              <div className="flex justify-center mx-[20px] flex-wrap min-[500px]:pt-[80px] max-[500px]:pt-[60px] h-[5px] 2xl:gap-[70px] xl:gap-[50px] gap-[30px] text-[20px] text-amber-50">
                <a href="#" className="nosifer-regular text-[17px] text-gray-500 hover:text-red-500 hover:underline hover:scale-115 hover:duration-300">
                  Media
                </a>
                <a href="/movies" className="nosifer-regular text-[17px] text-gray-500 hover:text-red-500 hover:underline hover:scale-115 hover:duration-300">
                  Movies
                </a>
                <a href="/actors" className="nosifer-regular text-[17px] text-gray-500 hover:text-red-500 hover:underline hover:scale-115 hover:duration-300">
                  ACTORS
                </a>
                <a href="/news" className="nosifer-regular text-[17px] text-gray-500 hover:text-red-500 hover:underline hover:scale-115 hover:duration-300">
                  NEWS
                </a>
                <a href="#" className="nosifer-regular text-[17px] text-gray-500 hover:text-red-500 hover:underline hover:scale-115 hover:duration-300">
                  CATEGORIES
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}