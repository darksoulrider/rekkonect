import React from 'react';
import { useEffect } from 'react';
import { useUserDataQuery } from './redux/apicall/auth';





function App() {


  // const { data, error, isLoading, refetch } = useUserDataQuery();
  const data = useUserDataQuery();
  console.log(data);

  // useEffect(() => {
  //   console.log('data coming back to');
  //   console.log(data);
  // }, [data]);

  return (
    <div>
      
  
    </div>
  );
}

export default App;
