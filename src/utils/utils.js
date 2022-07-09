import {date} from "quasar";


export function shuffle(array) {  //Esto es para ordenar aleatoriamente
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function showDataformValues(dataform) {
  for (const pair of dataform.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }
}


/**
 * @param {*[]} items Listado de valores
 * return Valores únicos de ese listado
 */
export function uniques(items) {
  return items.filter((value, index, self) => self.indexOf(value) === index)
}

export function objectToFormData(objectToConvert) {  //Esto convierte un objeto en arreglo. Si hay elementos con _id, pues solo agrega el atributo ID de ese objeto
  let form_data = new FormData();
  for (let key in objectToConvert) {
    if (objectToConvert[key]) {
      if (typeof objectToConvert[key] === "object" && objectToConvert[key].hasOwnProperty('id')) {
        form_data.append(key, objectToConvert[key].id);
      } else {
        if (typeof objectToConvert[key] === 'boolean')
          form_data.append(key, objectToConvert[key] ? 1 : 0);
        else
          form_data.append(key, objectToConvert[key]);
      }
    }
  }
  return form_data;
}

export function objectToJSON(objectToConvert) {  //Esto convierte un objeto en arreglo. Si hay elementos con _id, pues solo agrega el atributo ID de ese objeto
  let new_object = {};
  for (let key in objectToConvert) {
    if (objectToConvert[key]) {
      if (typeof objectToConvert[key] === "object" && objectToConvert[key].hasOwnProperty('id')) {
        new_object[key] = objectToConvert[key].id;
      } else {
        new_object[key] = objectToConvert[key];
      }
    }
  }
  return new_object;
}

export function deleteItemFromArray(item, array, update = false, objectUpdated) {
  const index = array.indexOf(item);
  if (update) {
    array.splice(index, 1, objectUpdated)
  } else {
    array.splice(index, 1)
  }
  return array
}

export function formatCurrency(number, is_euro = false) {
  if (is_euro)
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(number)
  return new Intl.NumberFormat('ban', {style: 'currency', currency: 'XAF'}).format(number)
}

export function formatDate(elem, lang = 'es') {
  if (!elem)
    return null
  if (lang === 'es')
    return date.formatDate(elem, 'DD/MM/YYYY')
  return date.formatDate(elem, 'YYYY/MM/DD')
}

/**
 * Esta función parsea las fechas para eliminar el UTC y que de fechas falsas
 * @param elem fecha en string a parsear
 * @returns {Date}
 */

export function parseDate(elem) {
  if (!elem.length)
    return '';
  const parts = elem.includes('-') ? elem.split('-') : elem.split('/');
  // return date.buildDate({year:parts[0],month:parts[1],day:parts[2]})
  return new Date(parts[0], parts[1] - 1, parts[2])
}

export function parseDateString(elem, change = true) {
  if (!elem.length)
    return '';
  const ndate = elem.includes('T') ? elem.split('T')[0] : elem;
  const parts = ndate.includes('-') ? ndate.split('-') : ndate.split('/');
  if (change)
    return `${parts[2]}/${parts[1]}/${parts[0]}`
  return `${parts[0]}/${parts[1]}/${parts[2]}`
}

/**
 * Esta función parsea una cadena de fecha-tiempo en un elemento en si
 * @param elem
 * @returns {string}
 */
export function formatDateTime(elem) {
  return date.formatDate(elem, 'DD/MM/YYYY hh:mmA ')
}

export function formatTime(elem) {
  return date.formatDate(elem, 'hh:mmA ')
}


/**
 * A partir de un objeto vacío y uno lleno, llena el vacío con las claves que tenga el lleno. Si hay alguna clave que
 * no esté en el vacío, pues sencillamente se pierde. Basicamente coge del lleno y pone en el vacío
 * @param empty_object Objeto limpio con las claves que necesito rellenar
 * @param filled_object Objeto lleno de donde voy a buscar las claves que necesito
 * @returns {{}} Un objeto (el que estaba vacío) actualizado con con las claves del lleno
 */
export function destructurateObject(empty_object, filled_object) {
  let new_obj = {}
  for (const i in empty_object) {
    if (filled_object.hasOwnProperty(i)) {
      if ([0, 1].includes(filled_object[i]) && !i.includes('_id') && i !== 'id') {
        new_obj[i] = filled_object[i]
      } else if (i.includes('_id')) {
        const prefix = i.split('_id')[0]
        if (filled_object.hasOwnProperty(prefix))
          new_obj[i] = filled_object[prefix]
        else {
          new_obj[i] = filled_object[i]
        }
      } else {
        new_obj[i] = filled_object[i] ?? ''
      }
    } else {
      // new_obj[i] = empty_object[i] ?? ''
    }
  }
  return new_obj
}


export function clinics() {
  return [
    'Clinica A',
    'Clinica B',
    'Clinica C',
    'Clinica D',
  ]
}

/**
 * Verifica que una fecha esté entre dos fechas dadas
 * @param date_to_compare
 * @param date_a
 * @param date_b
 * @returns {boolean}
 */
export function checkDateInRange(date_to_compare, date_a, date_b) {
  const a = parseDate(date_a)
  const b = parseDate(date_b)
  const center = parseDate(date_to_compare)
  return (a <= center && center <= b)
}

/**
 * Add x number of days to given date
 * @param customDate
 * @param numberDays
 * @param numberMonth
 * @return {Date}
 */
export function addDays(customDate, numberDays = 0, numberMonth = 0) {
  const {addToDate} = date
  return addToDate(customDate, {days: numberDays, month: numberMonth})
}


export function colors() {
  return ['#d60c8c', '#ec7405', '#00b5e2', '#682666', '#00386a', '#40c2cc', 'purple', 'pink', 'gray', 'dark']
}

export function event_icon(id) {
  return `eventos/${id}.webp`
}

/**
 * Parse values to include in CSV file
 * @param val
 * @param formatFn
 * @return {string}
 */
export function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}


/**
 * Returns if a Y date is less or equal than X. Note that dates are in order (lower, higher)
 * @param {date} x - lower date
 * @param {date} y - higher date
 * @param {string} sign < or <=
 * @param {string} format - date format (es,en). Default: es
 * @return {boolean} y > or >= x in sing dependency
 */
export function dateCompare(x, y, sign, format = 'es') {
  let format_display = 'DD/MM/YYYY'
  if (format === 'en')
    format_display = 'YYYY/MM/DD'
  const date1 = date.extractDate(x, format_display)
  const date2 = date.extractDate(y, 'DD/MM/YYYY')
  if (sign === '<')
    return date.getDateDiff(date2, date1, 'seconds') > 0
  else if (sign === '<=')
    return date.getDateDiff(date2, date1, 'seconds') >= 0
  return false
}

/**
 * Extract just single costs of Event
 * @param {Object} event Event where to extract costs
 * @param {Boolean} justMine Default: false. True if just wanna filter events with user_id
 * @param {Number} user_id Optional. If justMine = true, user ID to filter costs
 * @return {*[]}
 */
export function singleCost(event, justMine = false, user_id = null) {
  let costs = [];
  costs = [...costs, ...event.transport]
  costs = [...costs, ...event.room]
  costs = [...costs, ...event.inscription]
  costs = [...costs, ...event.dinner]
  if (justMine && user_id)
    costs = costs.filter(i => i.user_id === user_id)
  return costs
}

/**
 * Extract just general costs of Event
 * @param {Object} event Event where to extract costs
 * @param {Boolean} justMine Default: false. True if just wanna filter events with user_id
 * @param {Number} user_id Optional. If justMine = true, user ID to filter costs
 * @return {*[]}
 */
export function generalCosts(event, justMine = false, user_id = null) {
  let costs = [];
  costs = [...costs, ...event.product]
  costs = [...costs, ...event.teacher]
  costs = [...costs, ...event.special]
  if (justMine)
    costs = costs.filter(i => i.user_id === user_id)
  return costs
}

/**
 * Return all costs from event
 * @param {Object} event Event where to extract costs
 * @return {Array} Array of costs
 */
export function costsFromEvent(event) {
  return [...generalCosts(event), ...singleCost(event)]
}

/**
 * Return new array with uniques given key
 * @param {FlatArray<*[], number>[]} array items to search for
 * @param {string|number} key key to distinct objects
 */
export function uniquesByKey(array, key) {
  return [...new Map(array.map(item =>
    [item[key], item])).values()];
}
