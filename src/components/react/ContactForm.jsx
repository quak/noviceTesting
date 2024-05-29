import sendGrid from '@sendgrid/mail';
import React, { useState } from 'react';


export default function ContactForm(args) {


	const [firstname, setFirstname] = useState("")
	const [lastname, setLastname] = useState("")
	const [email, setEmail] = useState("")
	const [usermessage, setUsermessage] = useState("")


	const submit = e => {
		e.preventDefault()
		sendGrid.setApiKey(import.meta.env.SENDGRID_API_KEY);
		

		const name = firstname +" "+ lastname;
		const message = name +" ; "+ email +" ; "+ email +" ; "+ usermessage  ;

		const msg = {
			to: 'office@avax.at', // Kam poslješ zdaj na office poj na naročnina@novice.at
			from: 'augustin.malle@gmail.com', // <--------------------Sem pride nekaj office@novice.at / poj ko verificiraš
			replyTo: {email:email, name:name},
			subject: 'Naročilo - '+name,
			text: message,
		  }
	
		  
		  sendGrid.send(msg);
	}

	return (

		<section className="bg-sele-ivory px-1 md:px-4 py-24">
			<div className="mx-auto lg:max-w-screen-lg max-w-7xl 2xl:max-w-nov-width">
				<form onSubmit={submit}>
					<div className="space-y-12">
					
					<div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
						
				
						<div className="grid max-w-2xl col-span-1 grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
							<div className="col-span-6">
								<h2 className="block leading-6 uppercase text-3xl font-bold tracking-widels">Kontakt</h2>
							</div>
						<div className="col-span-6 sm:col-span-3">
							<label htmlFor="first-name" className="block leading-6 uppercase text-xl tracking-widels">Ime</label>
							<div className="mt-2">
							<input type="text" name="first-name" value={firstname} onChange={e => setFirstname(e.target.value)} id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-3 px-4 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-papez-purple sm:text-lg sm:leading-6 font-serif"/>
							</div>
						</div>
				
						<div className="col-span-6 sm:col-span-3">
							<label htmlFor="last-name" className="block leading-6 uppercase text-xl tracking-widels">Priimek</label>
							<div className="mt-2">
							<input type="text" name="last-name" value={lastname} onChange={e => setLastname(e.target.value)} id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 py-3 px-4 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-papez-purple sm:text-lg sm:leading-6 font-serif"/>
							</div>
						</div>
				
						<div className="col-span-6 sm:col-span-4">
							<label htmlFor="email" className="block leading-6 uppercase text-xl tracking-widels">E-pošta</label>
							<div className="mt-2">
							<input id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete="email" className="block w-full rounded-md border-0 py-3 px-4 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-papez-purple sm:text-lg sm:leading-6 font-serif"/>
							</div>
						</div>
				
						<div className="col-span-6 sm:col-span-full">
							<label htmlFor="message" className="block leading-6 uppercase text-xl tracking-widels">Sporočilo</label>
							<div className="mt-2">
							<textarea id="message" name="about"  value={usermessage} onChange={e => setUsermessage(e.target.value)} rows="5" className="block w-full rounded-md border-0 py-3 px-4 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-papez-purple sm:text-lg sm:leading-6 font-serif"></textarea>
							</div>
						</div>

						<div className="col-span-6 sm:col-span-full">
							<label htmlFor="cover-photo" className="block leading-6 uppercase text-xl tracking-widels">Dodaj priloge</label>
							<p className="text-base font-serif">Tu lahko dodate čestitke, osmrtnice ali druge dokumente. </p>
							<div className="mt-2 flex justify-center rounded-lg border border-dashed border-papez-purple/25 px-6 py-10">
							<div className="text-center">
								<svg className="mx-auto h-12 w-12 text-gray-500" viewBox="0 0 24 24" fill="#72103c" aria-hidden="true">
								<path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
								</svg>
								<div className="mt-4 flex text-base leading-6 text-papez-purple">
								<label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-papez-purple px-2 text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-papez-purple focus-within:ring-offset-2 focus-within:ring-papez-purple hover:text-papez-purple hover:border hover:border-papez-purple hover:bg-sele-ivory">
									<span>Naloži sliko ali dokument</span>
									<input id="file-upload" name="file-upload" type="file" className="sr-only"/>
								</label>
								<p className="pl-1">(pritisni ali potegni)</p>
								</div>
								<p className="text-xs leading-5 text-papez-purple">PNG, JPG, PDF 10MB</p>
							</div>
							</div>
						</div>

						</div>

						<div className="flex flex-col-reverse sm:flex-col justify-between">
							<div>
								<div>
									<p className="text-2xl font-serif font-bold">NOVICE – Slomedia G.m.b.H.</p>
									<p className="mt-2 text-xl font-serif">Fromillerstraße 29 </p>
									<p className="text-xl font-serif">A-9020 Klagenfurt/Celovec</p>
								</div>
								<div>
									<a href="mailto:redakcija@novice.at" className="mx-2 "> 
										<span className="flex items-center px-4 py-2 border-2 border-papez-purple"> 
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#72103c" className="bi bi-search mr-2" viewBox="0 0 16 16"> 
												<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path> 
											</svg> 
											<span className="text-papez-purple uppercase  text-base md:text-xl cursor-pointer tracking-widels">redakcija@novice.at</span>
										</span> 
									</a>

									<a href="tel:+43463218880" className="mx-2 "> 
										<span className="flex items-center px-4 py-2 border-2 border-papez-purple"> 
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#72103c" className="bi bi-search mr-2" viewBox="0 0 16 16"> 
												<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path> 
											</svg> 
											<span className="text-papez-purple uppercase  text-base md:text-xl cursor-pointer tracking-widels">+43 463 218 880</span>
										</span> 
									</a>

									<a href="https://api.whatsapp.com/send?phone=+43%20463%20218%20880" className="mx-2"> 
										<span className="flex items-center px-4 py-2 border-2 border-papez-purple"> 
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#72103c" className="bi bi-search mr-2" viewBox="0 0 16 16"> 
												<path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
											</svg>
											<span className="text-papez-purple uppercase  text-base md:text-xl cursor-pointer tracking-widels">Whatsapp</span>
										</span> 
									</a>
								</div>
								
							</div>
							
							<div className="mt-6 flex items-center justify-end sm:justify-start gap-x-6 mb-8 sm:m-0">
								<button type="submit" className="bg-papez-purple px-6 py-2 text-xl uppercase tracking-widels text-white shadow-sm hover:papez-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-papez-purple ">Pošlji</button>
							</div>
						</div>
					</div>
					
				
					
					</div>
				
					
				</form>
			</div>


		</section>

	  )
}
