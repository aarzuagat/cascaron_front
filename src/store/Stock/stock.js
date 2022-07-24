import axiosConfig from "boot/axios";
import {Loading} from "quasar";
import {n, p} from "src/utils/mynotify";

export function getStock() {
  Loading.show()
  return new Promise((resolve, reject) => {
    axiosConfig.get('lotes')
      .then(response => {
        Loading.hide()
        resolve(response)
      })
      .catch(err => {
        Loading.hide()
        n('El stock no están disponibles en estos momentos')
        reject(err)
      })
  })
}


export function postStock(object, property = 'name') {
  Loading.show()
  const name = object[property] ?? object.get(property)
  return new Promise((resolve, reject) => {
    axiosConfig.post('lotes', object)
      .then(response => {
        p(`Lote ${name} agregado correctamente`)
        Loading.hide()
        resolve(response.data.data)
      })
      .catch(err => {
        Loading.hide()
        n(`El lote ${object.name ?? ''} no pudo ser agregado en estos momentos`)
        reject(err)
      })
  })
}

export function putProduct(object) {
  Loading.show()
  const name = object.get('name') ?? object.name
  const id = object.get('id') ?? object.id
  object.append("_method", "put")
  return new Promise((resolve, reject) => {
    axiosConfig.post(`products/${id}`, object, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        p(`Producto ${name} actualizado correctamente`)
        Loading.hide()
        resolve(response.data.data)
      })
      .catch(err => {
        Loading.hide()
        n(`El producto ${object.name ?? ''} no pudo ser actualizado en estos momentos`)
        reject(err)
      })
  })
}

export function deleteProduct(object) {
  Loading.show()
  const name = object.name
  const id = object.id
  return new Promise((resolve, reject) => {
    axiosConfig.delete(`products/${id}`, {_method: 'delete'})
      .then(response => {
        p(`Producto ${name} eliminado correctamente`)
        Loading.hide()
        resolve(response.data.data)
      })
      .catch(err => {
        Loading.hide()
        n(`El producto ${object.name ?? ''} no pudo ser eliminado en estos momentos`)
        reject(err)
      })
  })
}


export function updateStock(object) {
  Loading.show()
  const name = object.name ?? object.get('name')
  return new Promise((resolve, reject) => {
    axiosConfig.post('sellProduct', object)
      .then(response => {
        p(`Producto ${name} en stock actualizado correctamente`)
        Loading.hide()
        resolve(response.data.data)
      })
      .catch(err => {
        Loading.hide()
        n(`El producto ${object.name ?? ''} en stock no pudo ser actualizado en estos momentos`)
        reject(err)
      })
  })
}
