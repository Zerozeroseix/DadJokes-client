const Jokes = () => {
  return (
    <div className='flex items-center justify-center w-full h-screen overflow-hidden'>
      <div className='w-[800px] max-w-full text-center bg-white rounded-xl py-[50px] px-[20px] shadow-md'>
        <h3 className='m-0 tracking-tight opacity-50'>Dad Jokes</h3>
        <div
          className='text-3xl leading-10 font-semibold tracking-tighter my-[50px] mx-auto max-w-[600px] font-[inherit]'
          id='joke'
        >
          A fake Joke text: Lorem ipsum dolor sit amet consectetur adipisicing
          elit. At, quam deleniti aut consequuntur ducimus sunt repudiandae
          velit ad magnam voluptatibus fugit vel! Hic, consectetur consequuntur.
          Praesentium tenetur architecto laudantium porro.
        </div>
        <button
          id='jokeBtn'
          className='px-10 py-3 text-base text-white bg-purple-500 border-0 rounded-lg shadow-md cursor-pointer outline-0 active:scale-95'
        >
          Get another joke
        </button>
      </div>
    </div>
  );
};

export default Jokes;
