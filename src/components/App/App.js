import { useState, useEffect } from 'react'
// components
import Block from './../Block/Block';
import Loader from './ContentLoader';
// lib's
// import GetXml from '../../lib/get_xml';
import ObjIsEmpty from '../../lib/obj_is_empty/index';
// styles
import css from './App.module.scss'
// CONST
// *** КУРСЫ ВАЛЮТ - JSON - https://github.com/fawazahmed0/currency-api
// const URL_CURRENCIES =
  // 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json'
const URL_RATES =
  'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json'

// *** КУРСЫ ВАЛЮТ ЦБ РФ - XML
// const URL_RATES = 'http://www.cbr.ru/scripts/XML_daily.asp' // курсы ЦБ РФ
// const URL_RATES_CORS =
  // 'http://cors-anywhere.herokuapp.com/http://www.cbr.ru/scripts/XML_daily.asp'
// const HEADERS_URL_RATES = {'Access-Control-Allow-Origin': '*'}

function App() {
  const [rates, setRates] = useState({})

  const [fromCurr, setFromCurr] = useState('USD')
  const [toCurr, setToCurr] = useState('RUB')
  
  const [fromAmount, setFromAmount] = useState(0)
  const [toAmount, setToAmount] = useState(0)

  function OnChangeFromAmount(value) {
    if (!ObjIsEmpty(rates)) {
      const amount = value / rates[fromCurr.toLowerCase()]
      const result = amount * rates[toCurr.toLowerCase()]
      setToAmount(result)
      setFromAmount(value)
    }
  }

  function OnChangeToAmount(value) {
    if (!ObjIsEmpty(rates)) {
      const amount = value / rates[toCurr.toLowerCase()]
      const result = amount * rates[fromCurr.toLowerCase()]
      setFromAmount(result)
      setToAmount(value)
    }
  }

  useEffect(() => {
    console.log('Запрос данных...')

    fetch(URL_RATES)
      .then(data => data.json())
      .then(json => {
        console.log('Данные получены.')
        setRates(json.usd)
      })
      .catch((err) => {
        console.warn('ERROR: AJAX')
        console.warn('err = ' + err)
      })
  }, [])
  
  useEffect(() => {
    OnChangeFromAmount(fromAmount)
  }, [fromCurr, toCurr])

  // useEffect(() => {
  //   onChangeToAmount(toAmount)
  // }, [toAmount])
  
  if (!ObjIsEmpty(rates)) {
    
    return (
      <div className={css.App}>
        <Block
          value={fromAmount}
          onChangeValue={OnChangeFromAmount}
          currency={fromCurr}
          onChangeCurrency={setFromCurr}
        />
        <Block
          value={toAmount}
          onChangeValue={OnChangeToAmount}
          currency={toCurr}
          onChangeCurrency={setToCurr}
        />
      </div>
    )
  }

  return (
    <div className={css.App}>
      <Loader />
    </div> 
  )
}

export default App
