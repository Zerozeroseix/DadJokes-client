import {useCallback, useEffect, useRef, useState} from 'react';
import Spinner from '@/components/spinner';
import Timer from '@/components/timer';

const url = 'https://icanhazdadjoke.com/';

const Jokes = () => {
  const [joke, setJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeToNewJoke, setTimeToNewJoke] = useState(5);

  const generateJoke = useCallback(async (): Promise<void> => {
    try {
      const config = {headers: {Accept: 'application/json'}};
      const res = await fetch(url, config);
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await res.json();
      setJoke(data.joke);
      setIsLoading(false);
    } catch (err) {
      console.log('Error has occurred', err);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      generateJoke();
    }, timeToNewJoke * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [generateJoke, timeToNewJoke]);

  if (isLoading === true)
    return (
      <div className='flex items-center justify-center w-full h-screen overflow-hidden bg-pink-200'>
        <div className='flex-row items-center justify-center p-5 m-0 space-y-2 '>
          <p className='text-center'>Loading tons of humour...</p>
          <Spinner />
        </div>
      </div>
    );

  return (
    <div className='flex items-center justify-center w-full h-screen p-5 m-0 overflow-hidden bg-pink-200'>
      <div className='w-[800px] max-w-full text-center bg-white rounded-xl py-[50px] px-[20px] shadow-md'>
        <h3 className='m-0 text-lg font-semibold tracking-tight opacity-50'>
          Dad Jokes
        </h3>
        <div
          className='text-3xl leading-10 font-medium tracking-tighter my-[50px] mx-auto max-w-[600px] font-[inherit]'
          id='joke'
        >
          {joke}
        </div>
        <div className='flex justify-around'>
          <button
            type='button'
            onClick={generateJoke}
            id='jokeBtn'
            className='px-10 py-3 text-base text-white bg-purple-500 border-0 rounded-lg shadow-md cursor-pointer outline-0 focus:ring-2 hover:scale-[101%] active:scale-95'
          >
            Click for another joke
          </button>
          <div className='p-2 border-2 rounded-lg shadow-md border-violet-300'>
            <span>Time to the next joke</span>
            <Timer seconds={timeToNewJoke} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jokes;
