import Spinner from './spinner';

const LoadingPage = (props: any) => {
  return (
    <div className='flex items-center justify-center w-full h-screen overflow-hidden bg-pink-200'>
      <div className='flex-row items-center justify-center p-5 m-0 space-y-2 '>
        <p className='text-center'>Loading tons of humour...</p>
        <Spinner />
      </div>
    </div>
  );
};

export default LoadingPage;
