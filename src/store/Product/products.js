import axiosConfig from "boot/axios";

export function getProducts() {
  return new Promise((resolve, reject) => {
    axiosConfig.get('products')
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
