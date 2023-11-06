//   quedé en 01:46:34
// vamos a hacer una función que únicamente llame a la api
// esta función va a ser una utilidad

// siempre voy a necesitar una url porque de algún lado debe llegar 
// así que la url viene por parámetro 
export const fetchApi = async (url) => {
    const response = await fetch(url)
    const data = response.json()
    return data
} 