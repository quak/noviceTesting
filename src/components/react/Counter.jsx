import React, { useState,useEffect } from 'react';


import './Counter.css';

export default function Counter({ children, count: initialCount,articleslug }) {
	const [count, setCount] = useState(initialCount);
	const add = () => setCount((i) => i + 1);
	const subtract = () => setCount((i) => i - 1);


    const [data, setData] = useState();

    useEffect(() => {
        // fetch data
        
        const dataFetch = async () => {
        
            const response = await fetch("https://sfsn.si/graphql",
            {
                method: 'POST',
                headers: {
                'Content-Type':'application/json',
                
                
                
                },
                body: JSON.stringify({
                query: `    {
                    post(id: "${articleslug}", idType: SLUG) {
                    title
                    blocks {
                        name
                        attributesJSON
                        dynamicContent
                        originalContent
                        isDynamic
                    }
                    excerpt
                    content
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
                    
                    }
                }`,
                }),
            }).then(data=>data.json())

            // set state when the data received
            setData(response?.data?.post);
        };

        dataFetch();
    }, []);

    

	return (
		<>
			<div className="counter">
				<button onClick={subtract}>-</button>
				<pre>{count}</pre>
				<button onClick={add}>+</button>
			</div>
            <div className="counter-message">Gureact</div>
			<div className="counter-message">{children}</div>
		</>
	);
}