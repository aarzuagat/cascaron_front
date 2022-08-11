import axiosConfig from "boot/axios";
import {Loading} from "quasar";
import {n, p} from "src/utils/mynotify";

export function getProducts(show_loading = true) {
  if (show_loading)
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
        n(`El producto ${object.name ?? ''} no pudo ser agregado en estos momentos`)
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
        if (err?.response?.data?.data)
          n(err.response.data.data)
        else
          n(`El producto ${object.name ?? ''} en stock no pudo ser actualizado en estos momentos`)
        reject(err)
      })
  })
}


export function downloadProductTag(object) {
  Loading.show()
  const name = `lote ${object.id}`
  return new Promise((resolve, reject) => {
    axiosConfig.post('tag-download', object, {responseType: 'blob'}).then(response => {
      this.$q.loading.hide()
      if (response.status < 400) {
        const url = URL.createObjectURL(new Blob([response.data], {
          type: 'application/pdf'
        }))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${name}.pdf`)
        document.body.appendChild(link)
        link.click()
        console.log(response.data)
        // const blob = new Blob([response.data], { type: response.data.type })
        // const url2 = window.URL.createObjectURL(blob)
        // resolve(url2)
        // saveAs(response.data.data, `Factura_.pdf`);
      }
    })
      .catch(err => {
        Loading.hide()
        // n(`El producto ${object.name ?? ''} no pudo ser agregado en estos momentos`)
        reject(err)
      })
  })
}
