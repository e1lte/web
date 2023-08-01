import {  useNavigate, useRouteError } from 'react-router-dom';
// import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();
  console.log(error);
  const nav=useNavigate ()
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data||error.message}</p>
      {/* <LinkButton to='-1'>&larr; Go back</LinkButton> */}
      <button className ='text-sm text-blue-500 hover:text-blue-600 hover:underline' onClick={() => nav(-1)}>&larr; Go back</button>
    </div>
  );
}
export default Error;
