const CinematicBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none dark:bg-[#050505] bg-[#F8F8F8] transition-colors duration-500">
      {/* Dramatic, cold bluish-white radial gradients */}
      {/* Main key light from the top right, simulating the light source on the face */}
      <div 
        className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] rounded-full dark:opacity-60 opacity-0 transition-opacity duration-500"
        style={{ background: "radial-gradient(circle, rgba(180,210,255,0.08) 0%, transparent 60%)" }}
      />
      {/* Subtle fill light from the bottom left */}
      <div 
        className="absolute bottom-[-10%] left-[-20%] w-[800px] h-[800px] rounded-full dark:opacity-40 opacity-0 transition-opacity duration-500"
        style={{ background: "radial-gradient(circle, rgba(200,220,255,0.04) 0%, transparent 60%)" }}
      />
      
      {/* A very faint center light to ensure readability of text in the middle */}
      <div 
        className="absolute top-[30%] left-[40%] w-[1200px] h-[1200px] rounded-full dark:opacity-30 opacity-0 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)" }}
      />
    </div>
  );
};

export default CinematicBackground;
