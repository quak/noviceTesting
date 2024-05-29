
var searchinprogess = false;

document.addEventListener('astro:page-load', () => {

    const searchmenu = document.getElementById("searchmenu");
    const searchopenbutton = document.getElementById("searchopenbutton");

    

    const searchclosebutton = document.getElementById("searchclosebutton");
    if(searchopenbutton!=null){
        searchopenbutton.addEventListener("click", () => {
            searchmenu.classList.toggle("-translate-y-full");

            document.getElementById("searchfield").focus();
            document.getElementById("searchfield").select();
        });
    }
    if(searchclosebutton!=null){
        searchclosebutton.addEventListener("click", () => {
            searchmenu.classList.toggle("-translate-y-full");
        });
    }

    const sf = document.getElementById("searchfield");
    let searchterm = "";
    let res;
    let posts;
    if(sf){
        sf.addEventListener ("keyup", function () {
            searchterm = sf.value;
            
            document.getElementById("searchtermrepeat").innerHTML=searchterm;
            
            if(searchterm.length>2){
                getData(searchterm);
            }
        });
        sf.addEventListener ("paste", function () {
            searchterm = sf.value;
            
            document.getElementById("searchtermrepeat").innerHTML=searchterm;
    
            if(searchterm.length>2){
                getData(searchterm);
            }
        });
        sf.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                searchterm = sf.value;
                getData(searchterm);
            }
        });
    }
    

    const magsearch = document.getElementById("magsearch");
    if(sf){
        magsearch.addEventListener ("click", function () {
            searchterm = sf.value;
            document.getElementById("searchtermrepeat").innerHTML=searchterm;
    
            getData(searchterm);
            
        });
    }
    


});


async function getData(searchterm) {

    if(searchinprogess){
        return false; 
    }else{
        searchinprogess = true;
    }

    try {

        //let response = await fetch("https://sfsn.si/wp-json/wp/v2/search/?search="+searchterm);
        //let data = await response.json();

        const dataevent = await fetchEventsForSearch(searchterm);
        const postsevent = await fetchPostsForSearch(searchterm);

        //const datag = await getDataG(searchterm);

        document.getElementById("searchresults").innerHTML="";
        document.getElementById("searchresultswrapper").classList.remove("hidden");
        let articlehtml = "";
        let loca="";
        let hideclass="";


        {dataevent.map(function (article,k) {
            loca = ""; 
            if(article?.city){
                loca = article.city;
            }
            if(article?.venue){
                if(loca!=""){
                    loca += " - "+article.city;
                }else{
                    loca = article.venue;
                }
            }  
            if(loca==""){
                hideclass = "hidden";
            }
            
            articlehtml += `
                    <a href="/prireditev/`+article?.post_name+`" class=" mb-6 pb-2 inline-block animate-in fade-in zoom-in swiper-slide">
                        <article class=" gap-4 border-b pb-4 border-iskanje-dark-pes h-full"> 
                                                       
                            <div class="flex flex-wrap gap-2">
                                <span class="uppercase px-2 bg-klopinj-blue text-white text-lg tracking-widels block `+hideclass+`">`+loca+`</span>
                                <span class="uppercase px-2 bg-klopinj-blue text-white text-lg tracking-widels block">`+article.evdate+`-`+article.evtime+`</span>
                            </div>
                            
                            <h2 class="mt-4 text-2xl font-bold line-clamp-3 text-ellipsis">`+article?.post_title+`</h2>	
                        
                        
                        </article>
                    </a>
                    `;
                                    
        })}
        document.getElementById("searchresultsevents").innerHTML="";
        document.getElementById("searchresultsevents").innerHTML = articlehtml;
        articlehtml = "";

        let hidemeclass = "";
        let hideimg = "hidden";
        {postsevent.map(function (article,k) {
            hidemeclass = " hidden";
            hideimg = " hidden";
            if( typeof article.acf.place !== "undefined"){
                hidemeclass="";
            }

            
            if(article?.thumb!=false){
                hideimg="";
            }
                    
            articlehtml += `
                    <a href="/`+article?.cat?.slug+`/`+article?.post_name+`" class=" mb-6 pb-2 inline-block animate-in fade-in zoom-in">
                        <article class=" flex flex-col sm:flex-row  gap-4 border-b pb-4 border-iskanje-dark-pes h-full">
                            <div class="overflow-hidden sm:basis-1/3">
                                <img class="ease-out duration-4000 transition-all hover:scale-103 `+hideimg+`" src="`+article?.thumb+`"/>
                            </div>
                            <div class="sm:basis-2/3 flex flex-1 flex-col justify-between">
                                <div class="flex flex-wrap gap-2 `+hidemeclass+`">
                                    <span class="uppercase px-2 bg-klopinj-blue text-white text-xl tracking-widels ">`+article?.acf?.place+`</span>
                                </div>
                                
                                <h2 class="mt-4 text-4xl font-bold line-clamp-3 text-ellipsis">`+article?.post_title+`</h2>	
                                <div class=" text-lg mt-2 line-clamp-2 text-ellipsis font-serif">`+article?.excerpt+`</div>

                                <div class="flex flex-col sm:flex-row justify-end sm:justify-between flex-1 gap-1 sm:gap-4 mt-2">
                                    <span class="uppercase flex flex-row items-end text-klopinj-blue tracking-widels text-xs sm:text-md">
                                        `+article?.actdate+`
                                    </span>

                                    <span class="uppercase flex flex-row items-end text-klopinj-blue tracking-widels text-xs sm:text-md">
                                        `+article?.author+`
                                    </span>
                                </div>
                            </div>
                        
                        </article>
                    </a>
                    `;
                                    
        })}
        document.getElementById("searchresults").innerHTML = articlehtml;
        searchinprogess = false;
    } catch(error) {
        throw Error(`error:${error}`);
    }
}

async function getDataG(searchterm){
    const response = await fetch("https://sfsn.si/graphql",
            {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                query: `    {
                    posts(where: {search: "${searchterm}"}) {
                    edges {
                        node {
                        link
                        slug
                        ... on Post {
                            id
                            title
                            excerpt
                            content
                            categories {
                                nodes {
                                    slug
                                    name
                                }
                            }
                            featuredImage {
                                node {
                                    link
                                    mediaItemUrl
                                    altText
                                    description
                                    title
                                    srcSet(size: IMG33)
                                    sourceUrl(size: IMG33)
                                }
                            }
                            uri
                        }
                        }
                    }
                    }
                }`,
                }),
            }).then(data=>data.json())

            const posts = response?.data?.posts?.edges;
            return posts;
}

async function fetchEventsForSearch(searchterm) {
    
    var params = {
        searchword: searchterm
    };

    const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(params)
    };    

    var data;
         
    try {
        const response = await fetch("https://sfsn.si/wp-json/nre/v1/eventssearch/",requestOptions);
        data = await response.json();
        
        
    } catch (error) {
    } finally {
        return data;
    }
   
}

async function fetchPostsForSearch(searchterm) {
    
    var params = {
        searchword: searchterm
    };

    const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(params)
    };    

    var data;
         
    try {
        const response = await fetch("https://sfsn.si/wp-json/nre/v1/postssearch/",requestOptions);
        data = await response.json();
        
        
    } catch (error) {
    } finally {
        return data;
    }
   
}