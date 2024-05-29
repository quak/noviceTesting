import React, { useState } from 'react';
import useFetch from "react-fetch-hook";


import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay,Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
    

export default function EventsOverview() {
	
	let [searchWord, setSearchWord] = useState('');
    var params = {
        searchWord: searchWord
    };
	
	const requestOptions = {
		method: 'POST',
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(params)
	  };
	const { isLoading, data, error } = useFetch("https://sfsn.si/wp-json/nre/v1/events/overview/",requestOptions);

	let datax = "";
	let featured = "";
	let events = "";
	let days = "";
	let actevents = "";
	
	try {
		if(data!=undefined){
			datax = JSON.parse(data);
			
			featured = Object.values(datax.featured);
			days = Object.values(datax.events);
			
		}
    } catch (e) {
		datax =  JSON.parse(data);;
    }	
		
	if(isLoading) return "";
	if(error) return "err";

	

	

	return (		
		<>


<section className="bg-sele-ivory px-1 md:px-4 py-2 md:py-12">
		<div className="mx-auto lg:max-w-screen-lg max-w-7xl 2xl:max-w-nov-width">
			<div className="flex flex-col w-full">
				<div>
					
					<h1 className="text-center uppercase text-2xl md:text-4xl text-klopinj-blue font-light my-4">Prireditve · Termini</h1>
				</div>
				<div className="flex flex-col gap-4 mt-8 hidden">
					<div className="flex justify-between items-center">
						<div className="flex flex-row gap-4">
							<a href=""><span className="uppercase bg-tag-grey text-xl px-4 rounded-2xl">Karikture</span></a>
							<a href=""><span className="uppercase bg-tag-grey text-xl px-4 rounded-2xl">Karikature</span></a>
						</div>
						<div className="flex flex-row gap-4">
							<div className="relative ">
								<input type="text" value={searchWord} onChange={e => setSearchWord(e.target.value)} className="focus:outline-none border-b border-black border-dotted w-full bg-transparent p-2 pr-0 text-3xl" placeholder="Išči"/>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#0000000" id="magsearch" className="cursor-pointer bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg></div>
							</div>
						</div>
					</div>
					<div className="relative flex justify-center">
						<div className="block border-b border-black w-full"></div>
						<img className="absolute max-h-36 -mt-16 hidden" src="/tmpimages/tdata/kks.png"/>
					</div>
					<div className="flex justify-between">
						<div className="flex flex-row gap-4">
							<a href=""><span className="uppercase bg-tag-grey text-xl px-4 rounded-2xl">Karikature</span></a>
							<a href=""><span className="uppercase bg-tag-grey text-xl px-4 rounded-2xl">Karikature</span></a>
						</div>
						<div className="flex flex-row gap-4">
							<a href=""><span className="uppercase bg-tag-grey text-xl px-4 rounded-2xl">Karikature</span></a>
							<a href=""><span className="uppercase bg-tag-grey text-xl px-4 rounded-2xl">Karikature</span></a>
						</div>
					</div>
				</div>
				
				
			</div>
		</div>
		
	</section>


	<section className=" px-1 md:px-4 py-12 bg-klopinj-blue">
		<div className="mx-auto lg:max-w-screen-lg max-w-7xl 2xl:max-w-nov-width">
			<div className="">
				<div className="basis-full">
					<p className="text-left uppercase text-4xl text-white font-light text-6xl leading-novice">Priporočamo</p>
				</div>
				<div className="basis-full block relative">
				<div className="block relative">
				<Swiper
				spaceBetween={0}
				className="eventSwiper w-full overflow-hidden"
				slidesPerView={1}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				  }}
				pagination={{
					clickable: true,
				  }}
				
				modules={[Pagination,Autoplay]}
				
				>
					{featured.map(function (event,l) {
						let url = '/prireditev/'+event.post_name;
						return(		
							<SwiperSlide key={l} className="">
						<a href={url}   className="flex flex-row gap-4 flex-wrap md:flex-nowrap">
							<div className="basis-full md:basis-2/3">
								<img src={event.infos.thumburl}/>
							</div>
							<div className="basis-full md:basis-1/3">
								<div className="flex flex-row gap-6">
									<div className="basis-1/5 flex">
										<div className="w-20">
											<span className="px-2 py-1 flex flex-col border border-black items-center">
												<span className="text-xs uppercase tracking-widedate mt-1 ml-1.5 uppercase">{event.printweekday}</span>
												<span className="text-4xl font-bold  text-black">{event.printdate}</span>
											</span>
										</div>
									</div>
									<div className="basis-4/5">
										<span className="mb-4 block">
											<h2 className=" text-4xl text-sele-ivory leading-novice">{event.infos.post_title}</h2>
										</span>
									</div>
								</div>
								<div className="flex flex-row gap-6">
									<div className="basis-1/5 flex">
										<div className="w-20">
											<span className="px-2 flex flex-col items-center">
												<span className="text-2xl font-bold  text-black">{event.starttime}</span>
											</span>
										</div>
									</div>
									<div className="basis-4/5">
										<span className="mb-4 block">
											<p className="font-bold text-2xl uppercase  text-black">{event.infos.city}</p>
											<p className="text-xl  text-black">{event.infos.venue}</p>
										</span>
									</div>
								</div>
							</div>
						</a>
						</SwiperSlide>
						);
					})}
					
				</Swiper>
				</div>
				</div>
			</div>
		</div>
		
	</section>
	<section className=" px-1 md:px-4 py-12">
		<div className="mx-auto lg:max-w-screen-lg max-w-7xl 2xl:max-w-nov-width  border-b border-black pb-8">
		<div className="flex flex-row gap-4 flex-wrap md:flex-nowrap mt-4">
							<div className="basis-full">
								<p className="text-left uppercase text-4xl text-klopinj-blue font-light text-6xl mb-4">Vse prireditve</p>
							</div>
						</div>
		{days.map(function (day,ll) {
			actevents = day.events;
			return (
				<>	<div key={ll}>
						
						<div className="flex flex-row gap-4 flex-wrap md:flex-nowrap mt-4">
							<div className="basis-full hidden md:block md:basis-1/6">
								<p className="text-left uppercase text-4xl text-klopinj-blue font-light text-6xl mb-4">{day.printdate}</p>
							</div>
							<div className="basis-full md:basis-5/6 grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-12">
								{actevents.map(function (event,lll) {
									let url = '/prireditev/'+event.post_name;
									return (
										<>
										<a key={lll}  href={url} className="col-span-1 flex flex-col gap-4">
											<div className="basis-full md:basis-1/2">
											<img src={event.thumburl}/>
											</div>
											<div className="basis-full md:basis-1/2">
												<div className="flex flex-row gap-6">
													<div className="basis-1/5 flex">
														<div className="w-20">
															<span className="px-2 py-1 flex flex-col border border-black items-center">
																<span className="text-xs uppercase tracking-widedate mt-1 ml-1.5 uppercase">{day.printweekday}</span>
																<span className="text-4xl font-bold text-klopinj-blue">{day.printdate}</span>
															</span>
														</div>
													</div>
													<div className="basis-4/5">
														<span className="mb-4 block">
															<h2 className=" text-4xl leading-novice">{event.post_title}</h2>
														</span>
													</div>
												</div>
												<div className="flex flex-row gap-6">
													<div className="basis-1/5 flex">
														<div className="w-20">
															<span className="px-2 flex flex-col items-center">
																<span className="text-2xl font-bold text-papez-purple">{event.starttime}</span>
															</span>
														</div>
													</div>
													<div className="basis-4/5">
														<span className="mb-4 block">
															<p className="font-bold text-2xl uppercase text-papez-purple">{event.city}</p>
															<p className="text-xl font-light">{event.venue}</p>
														</span>
													</div>
												</div>
											</div>
										</a>

										</>
										
									)
								})}
							</div>
						</div>
					</div>
				</>
		)})}
			
		</div>
		
	</section>

			


		</>
	);
}
