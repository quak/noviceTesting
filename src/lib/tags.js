
import dotenv from 'dotenv';

dotenv.config();

export async function getArticlesWithTag(slug) {
        
    var params = {
        tag: slug
    };

    const response = await fetch("https://sfsn.si/wp-json/nre/v1/getarticleswithtag/",
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(params)
    });


    const avtor = await response.json();
    
    return avtor;
  }
