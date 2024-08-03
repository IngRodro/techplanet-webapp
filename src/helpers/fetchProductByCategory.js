import summaryApi from "../common"

const fetchProductByCategory = async(category)=>{
  const response = await fetch(summaryApi.productByCategory.url,{
      method : summaryApi.productByCategory.method,
      headers : {
          "content-type" : "application/json"
      },
      body : JSON.stringify({
          category : category
      })
  })

  const dataResponse = await response.json()

  return dataResponse
}

export default fetchProductByCategory