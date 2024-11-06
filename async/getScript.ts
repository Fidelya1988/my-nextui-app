export const getScript = async () => {
    try {
    
      const res = await fetch('api/script', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      
      });
  
      const data = await res.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error updating script:', error);
    }
  };