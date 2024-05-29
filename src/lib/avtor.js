
import dotenv from 'dotenv';

dotenv.config();

export async function getAvtorBySlug(slug) {
        
    var params = {
        avtorslug: slug
    };

    const response = await fetch("https://sfsn.si/wp-json/nre/v1/getavtor/",
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
        'CDN-Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
      },
      body: JSON.stringify(params)
    });


    const avtor = await response.json();
    
    return avtor;
  }

export async function getAvtors() {
        
    var params = {
    };

    const response = await fetch("https://sfsn.si/wp-json/nre/v1/getavtors/",
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
        'CDN-Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
      },
      body: JSON.stringify(params)
    });


    const avtors = await response.json();

    return avtors;
  }
  
  export async function getAvtorsff() {
        
    var params = {
    };

    const response = await fetch("https://sfsn.si/wp-json/nre/v1/getavtorsff/",
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
        'CDN-Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
      },
      body: JSON.stringify(params)
    });


    const avtors = await response.json();

    return avtors;
  }