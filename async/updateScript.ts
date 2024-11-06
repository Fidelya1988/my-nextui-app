export const updateScript = async ({ids, dates}: {ids?: string, dates?:string[] }) => {
    try {
        console.log('api')
      const res = await fetch('api/script', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids,
          dates
        }),
      });
  
      const data = await res.json();
      return data.message
    } catch (error) {
      console.error('Error updating script:', error);
    }
  };