import dotenv from 'dotenv';

export async function getAllSlugsOfCategories(){
      
  const response = await fetch("https://sfsn.si/graphql",
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `    {
        
        categories {
          edges {
            node {
              slug
            }
          }
        }
        
    }`
    }),
  }).then(data=>data.json())

  const posts = response?.data?.categories;
  return posts;
}

export async function getAllSlugsOfPages(){
      
  const response = await fetch("https://sfsn.si/graphql",
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `    {
        
          pages (first: 20){
            edges {
              node{
                date
                  id
                  slug
                  title
        
                  featuredImage {
                    node {
                      link
                      mediaItemUrl
                    }
                  }      
              }
            }
            }
          }
        
    }`
    }),
  }).then(data=>data.json())

  const posts = response?.data?.posts;
  return posts;
}

export async function getAllSlugsOfPosts(){
      
  const response = await fetch("https://sfsn.si/graphql",
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `    {
        
          posts (first: 20){
            edges {
              node {
                date
                id
                slug
                title
                excerpt
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
                  }
                }      
              }
            }
          }
        
    }`
    }),
  }).then(data=>data.json()) 

  const posts = response?.data?.posts;
  return posts;
}

export async function getArticleBySlug(slug) {  
   
  const response = await fetch("https://sfsn.si/graphql",
  {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
      'CDN-Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
    },
    body: JSON.stringify({
      query: `    {
        post(id: "${slug}", idType: SLUG) {
          id
          title
          blocks {
            name
            attributesJSON
            dynamicContent
            originalContent
            isDynamic
          }
          leadingForAllPosts {
            leading
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
          place {
            place
          }
          author {
            node {
              slug
              firstName
              lastName
            }
          }
          categories {
            nodes {
              slug
              name
            }
          }
        
        }
      }`,
    }),
  }).then(data=>data.json())

  
  const page = response?.data?.post;
  return page;
}

export async function goSearch(searchterm) {
   
  const response = await fetch("https://sfsn.si/graphql",
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `    {
        contentNodes(where: {search: "${slug}"}) {
          edges {
            node {
              link
              slug
              ... on Post {
                id
                title
                blocks {
                  name
                  attributesJSON
                  dynamicContent
                  originalContent
                  isDynamic
                }
                title
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
            }
          }
        }
      }`,
    }),
  }).then(data=>data.json())

  
  const page = response?.data?.post;
  return page;
}

  export async function getAllPagesWithSlugsAlt(){
    
    const response = await fetch("https://sfsn.si/graphql",
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `    {
        pages(first: 1000) {
          edges {
            node {
              slug
            }
          }
        }
      }`,
        variables: {
            name: "Toronto",
        },
      }),
    }).then(data=>data.json())

    const posts = response?.data?.pages;
    return posts;
  }

  export async function getPageBySlugAlt(slug) {
   
    const response = await fetch("https://sfsn.si/graphql",
    {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
        'CDN-Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
      },
      body: JSON.stringify({
        query: `    {
          page(id: "${slug}", idType: URI) {
            blocks {
              name
              dynamicContent
              attributesJSON
            }
          }
        }`
      }),
    }).then(data=>data.json())

    
    const page = response?.data?.page;
    return page;
  }

 

  export async function getMenu(slug) {
   
    const response = await fetch("https://sfsn.si/graphql",
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `{
          menus(where: {location: PRIMARY}) {
            nodes {
              menuItems {
                edges {
                  node {
                    path
                    label
                    connectedNode {
                      node {
                        ... on Page {
                          isPostsPage
                          slug
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
        variables: {
            name: "Toronto",
        },
      }),
    }).then(data=>data.json())

    
    const page = response?.data?.menus?.nodes;
    return page;
  }

  export async function getAllCategories(){
    
    const response = await fetch("https://sfsn.si/graphql",
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `    {
          categories(where:{parent:8}){
            edges {
              node {
                slug
                name
              }
            }
          }
        }`,
      }),
    }).then(data=>data.json())

    const posts = response?.data?.categories;
    return posts;
  }

  export async function getCategoryBySlug(slug) {
   
    const response = await fetch("https://sfsn.si/graphql",
    {
      method: 'POST',
      headers: {'Content-Type':'application/json',
        'Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
        'CDN-Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=10800,stale-while-revalidate=59'
      },
      body: JSON.stringify({
        query: `    {
          category(id: "${slug}", idType: SLUG) {
            name
          }
        }`,
      }),
    }).then(data=>data.json())

    
    const page = response?.data?.category;
    return page;
  }

  export async function getPostByCategoryById(slug,count) {
   
    //posts(where: {categoryName: "kultura"}) {
    //post(id: "${slug}", idType: SLUG) {
    const response = await fetch("https://sfsn.si/graphql",
    {
      method: 'POST',
      headers: {'Content-Type':'application/json',
      'Cache-Control': 'public, s-maxage=60,stale-while-revalidate=59',
      'CDN-Cache-Control': 'public, s-maxage=60,stale-while-revalidate=59',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=60,stale-while-revalidate=59'
    
      },
      body: JSON.stringify({
        query: `    {
          posts(where: {categoryIn: "${slug}"},first: ${count}) {
            edges {
              node {
                date
                id
                slug
                title
                excerpt
                categories {
                  nodes {
                    slug
                    name
                  }
                }
                tags {
                  edges {
                    node {
                      id
                      name
                      slug
                    }
                  }
                }
                author {
                  node {
                    slug
                    firstName
                    lastName
                  }
                }
                featuredImage {
                  node {
                    link
                    mediaItemUrl
                    srcSet(size: IMG33)
                    sourceUrl(size: IMG33)
                  }
                }
                place {
                  place
                }
                oseba {
                  name
                  surname
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

  export async function getPostByCategoryBySlugWithOffset(slug,count,offset) {
   
    const response = await fetch("https://sfsn.si/graphql",
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `    {
          posts(where: {categoryName: "${slug}"},first: ${count}) {
            edges {
              node {
                date
                id
                slug
                title
                excerpt
                
                categories {
                  nodes {
                    slug
                    name
                  }
                }
                tags {
                  edges {
                    node {
                      id
                      name
                      slug
                    }
                  }
                }
                author {
                  node {
                    slug
                    firstName
                    lastName
                  }
                }
                featuredImage {
                  node {
                    link
                    mediaItemUrl
                    srcSet(size: IMG33)
                    sourceUrl(size: IMG33)
                  }
                }
                place {
                  place
                }
                oseba {
                  name
                  surname
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

  export async function getPostByCategoryBySlug(slug,count) {
   
    //posts(where: {categoryName: "kultura"}) {
    //post(id: "${slug}", idType: SLUG) {
    const response = await fetch("https://sfsn.si/graphql",
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `    {
          posts(where: {categoryName: "${slug}"},first: ${count}) {
            edges {
              node {
                date
                id
                slug
                title
                excerpt
                categories {
                  nodes {
                    slug
                    name
                  }
                }
                tags {
                  edges {
                    node {
                      id
                      name
                      slug
                    }
                  }
                }
                author {
                  node {
                    slug
                    firstName
                    lastName
                  }
                }
                featuredImage {
                  node {
                    link
                    mediaItemUrl
                    srcSet(size: IMG33)
                    sourceUrl(size: IMG33)
                  }
                }
                place {
                  place
                }
                oseba {
                  name
                  surname
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

  export async function getDeaths(slug,count) {
   
    const response = await fetch("https://sfsn.si/graphql",
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `    {
          posts(where: {categoryIn: ${slug}}, first: ${count}) {
            edges {
              node {
                date
                id
                slug
                title
                excerpt
                uri
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
                    srcSet(size: IMG_PORTRAIT_PREVIEW)
                    sourceUrl(size: IMG_PORTRAIT_PREVIEW)
                  }
                }
                author {
                  node {
                    nicename
                    firstName
                    lastName
                  }
                }
                place {
                  place
                }
                oseba {
                  name
                  surname
                  dateinfo
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


  export async function getOpinionPosts(slug,count) {
   
    const response = await fetch("https://sfsn.si/graphql",
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `    {
          posts(where: {categoryIn: ${slug}}, first: ${count}) {
            edges {
              node {
                date
                id
                slug
                title
                excerpt
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
                    srcSet(size: IMG_QUBIC_PREVIEW)
                    sourceUrl(size: IMG_QUBIC_PREVIEW)
                  }
                }
                place {
                  place
                }
                oseba {
                  name
                  surname
                }
                mnenje {
                  avatar {
                    link
                    mediaItemUrl
                  }
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


  export async function getImageByIds(ids) {
   
    const response = await fetch("https://sfsn.si/graphql",
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `    {
          mediaItems(where: {in: "${ids}"}) {
            edges {
              node {
                id
                sourceUrl
                sizes(size: LARGE)
                srcSet(size: LARGE)
                title
                description
                caption
                
              }
            }
          }
        }`,
      }),
    }).then(data=>data.json())

  
    const images = response?.data?.mediaItems?.edges;
    return images;
  }

//
  export async function getImagesByIds(ids) {
   
    const response = await fetch("https://sfsn.si/graphql",
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `    {
          
          mediaItems(where: {in: ["${ids}"]}, first: 100) {
            edges {
              node {
                id
                sourceUrl
                sizes(size: LARGE)
                srcSet(size: LARGE)
                title
                description
                caption
                
              }
            }
          }
        }`,
      }),
    }).then(data=>data.json())

  
    const images = response?.data?.mediaItems?.edges;
    return images;
  }





  



  export async function getMenus() {
   
    const response = await fetch("https://sfsn.si/graphql",
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `    {
          menus {
            nodes {
              menuItems {
                nodes {
                  uri
                  path
                  label
                }
              }
              name
            }
          }
        }`,
      }),
    }).then(data=>data.json())

  
    const menus = response?.data?.menus?.nodes;
    return menus;
  }