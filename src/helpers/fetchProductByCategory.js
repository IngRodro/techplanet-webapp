import summaryApi from "../common"

const fetchProductByCategory = async(category, brand)=>{
  const response = await fetch(summaryApi.productByCategoryOrBrand.url,{
      method : summaryApi.productByCategoryOrBrand.method,
      headers : {
          "content-type" : "application/json"
      },
      body : JSON.stringify({
          category : category,
          brand: brand
      })
  })

  const dataResponse = await response.json()

  return dataResponse
}

export default fetchProductByCategory