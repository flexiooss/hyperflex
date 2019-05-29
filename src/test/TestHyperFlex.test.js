/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {HyperFlex} from '../js/HyperFlex'
import {HyperFlexParams} from '../js/HyperFlexParams'
import {AttributeHandler} from '../js/AttributeHandler'

const assert = require('assert')

export class TestHyperFlex extends TestCase {
  testInstance() {
    new HyperFlex('div#monId.maClass', new HyperFlexParams())
    new AttributeHandler({'nodeType': 3})
  }
}

runTest(TestHyperFlex)
