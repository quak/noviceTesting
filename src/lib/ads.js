import dotenv from 'dotenv';

dotenv.config();


export async function getAds() {
        
    var params = {
    };
                                  
    const response = await fetch("https://sfsn.si/wp-json/nre/v1/getads/",
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
        'CDN-Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
      }
    });


    const avtors = await response.json();

    return avtors;
  }