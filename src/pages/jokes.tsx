import {useCallback, useEffect, useState} from 'react';
import Timer from '@/components/timer';
import LoadingPage from '@/components/loadingPage';

const url = 'https://icanhazdadjoke.com/';
const serverUrl = 'http://localhost:8000/jokes';
// const serverUrl = 'http://localhost:8000/api/price/bitcoin';
// const serverUrl = 'http://localhost:8000/api/fact/cats';

const Jokes = () => {
  const [joke, setJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [seconds, setSeconds] = useState(5);

  const reset = useCallback(() => {
    setSeconds(5);
  }, []);

  const getJokeFromServer = async () => {
    try {
      const res = await fetch(serverUrl);
      const data = await res.json();
      console.log(data);
      setJoke(data.joke);
      setIsLoading(false);
    } catch (error) {
      console.log('Error has occurred', error);
    }
  };

  const generateJoke = useCallback(async (): Promise<void> => {
    reset();
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
  }, [reset]);

  useEffect(() => {
    let interval!: NodeJS.Timer;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds: number) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      generateJoke();
    }
    return () => clearInterval(interval);
  }, [generateJoke, reset, seconds]);

  if (isLoading) return <LoadingPage />;

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
            <Timer seconds={seconds} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jokes;
