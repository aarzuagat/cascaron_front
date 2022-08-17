import {Loading} from "quasar";
import axiosConfig from "boot/axios";
import {n, p} from "src/utils/mynotify";
import {objectToFormData, objectToJSON} from "src/utils/utils";

export function getIncidents(show_loading = true) {
  if (show_loading)
    Loading.show()
  return new Promise((resolve, reject) => {
    axiosConfig.get('incidents')
      .then(response => {
        Loading.hide()
        resolve(response.data.data)
      })
      .catch(err => {
        Loading.hide()
        n('Los incidentes no están disponibles en estos momentos')
        reject(err)
      })
  })
}

export function postIncident(object) {
  Loading.show()
  const name = object.author
  return new Promise((resolve, reject) => {
    axiosConfig.post('incidents', object)
      .then(response => {
        p(`Incidente de ${name} agregado correctamente`)
        Loading.hide()
        resolve(response.data.data)
      })
      .catch(err => {
        Loading.hide()
        n(`El incidente de ${name} no pudo ser agregado en estos momentos`)
        reject(err)
      })
  })
}


export function putIncident(object) {
  Loading.show()
  const id = object.id
  object = objectToJSON(object)
  object._method = "put"
  return new Promise((resolve, reject) => {
    axiosConfig.put(`incidents/${id}`, object)
      .then(response => {
        p(`Incidente actualizado correctamente`)
        Loading.hide()
        resolve(response.data.data)
      })
      .catch(err => {
        Loading.hide()
        n(`El incidente no pudo ser actualizado en estos momentos`)
        reject(err)
      })
  })
}

export function deleteIncident(object) {
  Loading.show()
  const name = object.author
  const id = object.id
  return new Promise((resolve, reject) => {
    axiosConfig.delete(`incidents/${id}`, {_method: 'delete'})
      .then(response => {
        p(`Incidente de ${name} eliminado correctamente`)
        Loading.hide()
        resolve(response.data.data)
      })
      .catch(err => {
        Loading.hide()
        n(`El incidente de ${object.name ?? ''} no pudo ser eliminado en estos momentos`)
        reject(err)
      })
  })
}



export function filterIncident(object) {
  Loading.show()
  return new Promise((resolve, reject) => {
    axiosConfig.post('incidents-filter', object)
      .then(response => {
        p(`Incidentes obtenidos correctamente`)
        Loading.hide()
        resolve(response.data.data)
      })
      .catch(err => {
        Loading.hide()
        n(`Los incidentes no pudieron ser obtenidos en estos momentos`)
        reject(err)
      })
  })
}
