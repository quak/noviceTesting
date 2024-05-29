import React, { useState } from 'react';
import useFetch from "react-fetch-hook";
import { Image } from 'astro:assets';
import { Picture } from 'astro:assets';

import bookmarkicon from "../../images/bookmark.svg";
import usericon from "../../images/user.svg";

export default function ArticlesForTag(tag) {
	var params = {
        tag: tag
    };
	
 
	
	const requestOptions = {
		method: 'POST',
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(params)
	  };

	  //cache: 1000 * 60 * 5,
	const { isLoading, data, error } = useFetch("https://sfsn.si/wp-json/nre/v1/getarticleswithtag",requestOptions);
	//const { isLoading, data, error } = useFetch("https://sfsn.si/wp-json/nre/v1/eventsforauthor",requestOptions);
	
	let datax = "";
	let featured = "";
	let events = "";
	let days = "";
	let actevents = "";
	
	try {
		if(data!=undefined){
			datax = JSON.parse(data);
		}
    } catch (e) {
		datax =  ""
    }	
		
	if(isLoading) return "";
	if(error) return "err";

	return (		
		<>
				<div className="mx-auto lg:max-w-screen-lg max-w-7xl 2xl:max-w-nov-width grid grid-cols-2 md:grid-cols-3 grid-rows-2 md:grid-rows-1 gap-2 sm:gap-4 md:gap-4">
					{data.map(function (post,k) {
						
						let url = '/'+post?.cat?.slug+'/'+post?.post_name;
						let place ="";
						if(post.acf){
							place = post.acf.place;
						}
						let placeclass="";
						let excerpt="";
						if(post.excerpt){
							excerpt = post.excerpt;
						}
						let descriptionclass=" sm:block";
						var llstyle = "lazy";

						let d = new Date(post?.post_date);
						let datestring = d.getDate()  + "." + (d.getMonth()+1) + "." + d.getFullYear();

						let avtor ="";
						if(avtor == ""){
							avtor="novice";
						}
						
							return (

								<a key={k} href={url} class="col-span-1 md:col-span-1 md:row-span-1"  >
									<article class="p-2 bg-sneg-white h-full flex flex-col">
										<div class="overflow-hidden relative ">
											<img height="198" width="353" class="ease-out duration-4000 transition-all hover:scale-103 aspect-video"  src={post?.imageurl} loading={llstyle} alt={post.post_title}/>
											<div class="absolute left-0 bottom-0 block">
												<span class={`block uppercase px-2 bg-klopinj-blue text-white tracking-widels text-sm ${placeclass}`}>{place}</span>
											</div>
										</div>
										<div class="sm:px-3 pt-2 flex flex-col flex-1 justify-between">
											
											<h2 class=" text-xl sm:text-2xl line-clamp-3 text-ellipsis font-bold leading-novice">{post?.post_title}</h2>	
											<span class={`hidden ${descriptionclass}`}>
												<p class="text-base font-serif mb-4 line-clamp-3">{excerpt}</p>
											</span>
											<div class="flex flex-col sm:flex-row justify-end sm:justify-between flex-1 gap-1 sm:gap-4 mt-2 hidden">
												<span class="uppercase flex flex-row items-center text-klopinj-blue tracking-widels text-xs sm:text-md">
													
													<img src="/tmpimages/svgs/bookmark.svg" loading={llstyle} alt="Date icon" class=""/>
													
													{datestring}
												</span>

												<span class="uppercase flex flex-row items-center text-klopinj-blue tracking-widels text-xs sm:text-md">
													
													<img class=" max-h-4 mr-2" src="/tmpimages/svgs/user.svg" alt="Avtor icon" loading={llstyle}/>
													{avtor}
												</span>
											</div>
										</div>
									
									</article>
								</a>

							);
						
					})}
				
				</div>
			


		</>
	);
}
