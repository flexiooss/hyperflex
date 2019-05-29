import {
  assertType,
  isString,
  isObject
} from '@flexio-oss/assert'
import {HyperFlexParams} from './HyperFlexParams'

const _querySelector_ = Symbol.for('_querySelector_')

class HyperFlex {
  /**
   *
   * @param {string} querySelector
   * @param {HyperFlexParams} hyperFlexParams
   * @return {HyperFlex}
   */
  constructor(querySelector, hyperFlexParams) {
    assertType(isString(querySelector),
      'flexio-hyperflex:constructor: `querySelector` argument assertType be a String `%s` given',
      typeof querySelector
    )
    assertType(hyperFlexParams instanceof HyperFlexParams,
      'flexio-hyperflex:constructor: `hyperFlexParams` property should be an instanceof `HyperFlexParams`, `%s` given',
      typeof hyperFlexParams
    )
    /**
     *
     * @params {string}
     * @private
     */
    this[_querySelector_] = querySelector
    /**
     *
     * @params {HyperFlexParams}
     * @protected
     */
    this._params = hyperFlexParams
    /**
     *
     * @params {Element}
     * @protected
     */
    this._element = null
  }

  /**
   * @static
   * @param {string} querySelector
   * @param {HyperFlexParams} hyperFlexParams
   * @return {Element}
   */
  static html(querySelector, hyperFlexParams) {
    return new HyperFlex(querySelector, hyperFlexParams).createHtmlElement()._element
  }

  /**
   * Create Html Element and set `_element` property
   * @return {HyperFlex}
   */
  createHtmlElement() {
    const {
      tag,
      id,
      classList
    } = this._parseQuerySelector(this.querySelector)

    this._element = document.createElement(tag)

    return this._setId(id)
      ._setClassList(classList)
      ._setParams()
  }

  /**
   *
   * @return {Element}
   */
  get element() {
    return this._element
  }

  /**
   *
   * @return {string}
   */
  get querySelector() {
    return this[_querySelector_]
  }

  /**
   *
   * @param {string} querySelector : tag#myId.class1.class2...
   * @returns {Object} { tag: String, id: String, classList: Array<String> }
   *
   */
  _parseQuerySelector(querySelector) {
    const matches = new RegExp('^([\\w-]*)([#\\w\\d-_]*)?([.\\w\\d-_]*)?$', 'gi').exec(querySelector)
    const tag = matches[1]
    assertType(!!tag,
      'flexio-hyperflex:parseQuerySelector: `tag` argument assertType not be empty'
    )
    const id = (matches[2]) ? matches[2].substr(1) : ''
    const classList = (matches[3]) ? matches[3].substr(1).split('.') : []
    return {
      tag,
      id,
      classList
    }
  }

  /**
   *
   * @protected
   * @param {string} id
   * @return {HyperFlex}
   */
  _setId(id) {
    if (id) {
      this._element.id = id
    }
    return this
  }

  /**
   * @protected
   * @return {HyperFlex}
   */
  _setParams() {
    return this._setAttributes(this._params.attributes)
      ._setProperties(this._params.properties)
      ._setClassList(this._params.classList)
      ._setStyles(this._params.styles)
      ._setText(this._params.text)
      ._setChildNodes(this._params.childNodes)
  }

  /**
   * @protected
   * @param {Object} styles
   * @return {HyperFlex}
   */

  _setStyles(styles) {
    assertType(isObject(styles),
      'flexio-hyperflex:setStyles: `styles` argument assertType be an Object `%s` given',
      typeof styles
    )

    for (const key in styles) {
      if (styles.hasOwnProperty(key)) {
        this._element.style[key] = styles[key]
      }
    }
    return this
  }

  /**
   * @protected
   * @param {Object} attributes
   * @return {HyperFlex}
   */
  _setAttributes(attributes) {
    assertType(isObject(attributes),
      'flexio-hyperflex:setAttributes: `attributes` argument assertType be an Object `%s` given',
      typeof attributes
    )

    for (const key in attributes) {
      if (attributes.hasOwnProperty(key) && attributes[key] !== null) {
        this._element.setAttribute(key, attributes[key])
      }
    }
    return this
  }

  /**
   * @protected
   * @param {Object} properties
   * @return {HyperFlex}
   */
  _setProperties(properties) {
    assertType(isObject(properties),
      'flexio-hyperflex:_setProperties: `properties` argument assertType be an Object `%s` given',
      typeof properties
    )

    for (const key in properties) {
      if (properties.hasOwnProperty(key) && properties[key] !== null) {
        this._element[key] = properties[key]
      }
    }
    return this
  }

  /**
   *
   * @protected
   * @param {Array<String>} classList
   * @return {HyperFlex}
   */
  _setClassList(classList) {
    if (classList.length) {
      this._element.classList.add(...classList)
    }
    return this
  }

  /**
   * @protected
   * @param {string} text
   * @return {HyperFlex}
   */
  _setText(text) {
    if (text !== '') {
      this._element.appendChild(document.createTextNode(text))
    }
    return this
  }

  /**
   *
   * @protected
   * @param {Array<Node>} childNodes
   * @return {HyperFlex}
   */
  _setChildNodes(childNodes) {
    const countOfChildren = childNodes.length
    for (let i = 0; i < countOfChildren; i++) {
      this._element.appendChild(childNodes[i])
    }
    return this
  }
}

export {HyperFlex}
export const html = HyperFlex.html