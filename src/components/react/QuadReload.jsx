
import React, { useState, useEffect, useRef } from 'react';
import useFetch from "react-fetch-hook";
import { getPostByCategoryBySlug } from '../../lib/api';

    

export default function QuadReload(args) {
	
	
	const [page, setPage] = useState(0);
	const [items, setItems] = useState([]);
	const [error, setError] = useState(null);
	

	const [isLoading, setIsLoading] = useState(false);


	async function fetchDataLL() {
		setIsLoading(true);
		setError(null);

		var params = {
			catslug: args.catname,
			offset: args.countera,
			page: page
		};
		const requestOptions = {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(params)
		  };    
		  
		  	try {
				//const response = await fetch("https://sfsn.si/wp-json/wp/v2/posts?categories=6&per_page=4&offset=1&status=publish&page=1",requestOptions);
				const response = await fetch("https://sfsn.si/wp-json/nre/v1/getcategoryll/",requestOptions);
				
				const data = await response.json();
				
				setItems(prevItems => [...prevItems, ...data]);
				setPage(prevPage => prevPage + 1);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		
	}

	/** */

	const handleScroll = () => {

		if (window.innerHeight + document.documentElement.scrollTop + document.getElementById("footer").offsetHeight > document.documentElement.offsetHeight || isLoading) {
		  return;
		}
		fetchDataLL();
	
	};
	  
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isLoading]);

	/** */
	let llstyle = "lazy"
	  

	return (
		
		
		<>
			<section className="  px-1 md:px-4 py-4 overflow-hidden ">
				<div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-1 md:grid-flow-row  gap-4 mx-auto lg:max-w-screen-lg max-w-7xl 2xl:max-w-nov-width">
					{items?.map(function (article,k) {
						let url = '/'+article?.cat?.slug+'/'+article?.post_name;
						
							return (
								<a key={k} href={url} className="col-span-1 lg:col-span-1 lg:row-span-1" >
									<article className="h-full flex flex-col">
										<div className="overflow-hidden relative">
											
											<img height="128" width="257" className="ease-out duration-4000 transition-all hover:scale-103"   src={article.thumb} loading="lazy" alt={article.post_title}/>
											<div className="absolute left-0 bottom-0 block">
												<span className={`block uppercase px-2 bg-klopinj-blue text-white tracking-widels text-sm`}>{article.acf.place}</span>
											</div>
										</div>
										<div className="sm:px-3 pt-2 flex flex-col flex-1">
											
											<h2 className=" text-2xl line-clamp-3 text-ellipsis font-bold leading-novice">{article.post_title}</h2>	

											<span className="">
												<p className="text-base font-serif mb-4 line-clamp-3">{article.excerpt}</p>
											</span>

											<div className="flex flex-col sm:flex-row justify-end sm:justify-between flex-1 gap-1 sm:gap-4 mt-2 hidden">
												<span className="uppercase flex flex-row items-center text-klopinj-blue tracking-widels text-xs sm:text-md">
													<img src="/tmpimages/svgs/bookmark.svg" loading={llstyle} alt="Date icon" class=""/>
													{article.actdate}
												</span>

												<span className="uppercase flex flex-row items-center text-klopinj-blue tracking-widels text-xs sm:text-md">
													<img class=" max-h-4 mr-2" src="/tmpimages/svgs/user.svg" alt="Avtor icon" loading={llstyle}/>
													{article.author}
												</span>
											</div>
											
										</div>
									
									</article>
								</a>
							);
						
					})}
				
				</div>
			</section>
		</>
	);
}
