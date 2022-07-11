import axiosConfig from "boot/axios";
import {Loading} from "quasar";
import {n, p} from "src/utils/mynotify";

export function getProducts() {
  Loading.show()
  return new Promise((resolve, reject) => {
    axiosConfig.get('products')
      .then(response => {
        Loading.hide()
        resolve(response)
      })
      .catch(err => {
        Loading.hide()
        n('Los productos no están disponibles en estos momentos')
        reject(err)
      })
  })
}


export function postProduct(object) {
  Loading.show()
  const name = object.get('name') ?? object.name
  return new Promise((resolve, reject) => {
    axiosConfig.post('products', object)
      .then(response => {
        p(`Producto ${name} agregado correctamente`)
        Loading.hide()
        resolve(response.data.data)
      })
      .catch(err => {
        Loading.hide()
        n(`El producto ${object.name} no pudo ser agregado en estos momentos`)
        reject(err)
      })
  })
}
