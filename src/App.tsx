import React, { useEffect, useState } from 'react';
import { data, timeInterval } from "./inetrface"
import './App.css';
// import logo from "./logo.svg"
import axios from 'axios';
import { constData } from './data';

function App(props: any) {
  const [data, setData] = useState<data>(
    // {
    //   "Meta Data": {
    //     "1. Information": "",
    //     "2. Symbol": "",
    //     "3. Last Refreshed": "",
    //     "4. Interval":"",
    //     "5. Output Size": "",
    //     "6. Time Zone": ""
    //   },
    //   "Time Series (5min)": {}
    // }
    constData
  )
  const [keys, setKeys] = useState<Array<string>>([])
  const [loadingData, setLoadingData] = useState(true)
  const logoLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX9fZzRj7BuQAtuf6RSuqIjWEaai2Vl7sFq2Y6tKq5hA&s"
  
  const getData = () => {
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=RIBXT3XYLI69PC0Q `
    axios.get(url).then((res) => {
      console.log(res)
      // setData(res.data)
    }).catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    let keys = Object.keys(data["Time Series (5min)"])
    setKeys(keys)
    setLoadingData(false)
  }, [data])
  return (
    <div className="App container mx-auto">
      {loadingData ? <div>Loading</div> :
        <>
          <div className='flex justify-center my-4'>
            <img src={logoLink} className='flex justify-content-center my-2' />

          </div>
          <div className="grid grid-cols-2 gap-4">
            <p>Information :{data['Meta Data']['1. Information']}</p>
            <p>Symbol :{data['Meta Data']["2. Symbol"]}</p>
            <p>Last Refreshed :{data['Meta Data']["3. Last Refreshed"]}</p>
            <p>Interval :{data['Meta Data']["4. Interval"]}</p>
            <p>Output Size :{data["Meta Data"]["5. Output Size"]}</p>
            <p>Time Zone :{data["Meta Data"]["6. Time Zone"]}</p>
          </div>
          <div className='flex justify-center my-4'>
            <table className="border-collapse table-fixed border border-slate-500 ...">
              <thead>
                <tr>
                  <th className="border border-slate-600 ...">Interval</th>
                  <th className="border border-slate-600 ...">open</th>
                  <th className="border border-slate-600 ...">high</th>
                  <th className="border border-slate-600 ...">low</th>
                  <th className="border border-slate-600 ...">close</th>
                  <th className="border border-slate-600 ...">volume</th>
                </tr>
              </thead>
              <tbody>
                {
                  keys.map((key: string, index: number) => {
                    let intervals = data["Time Series (5min)"]
                    let intervalItem = intervals[key]
                    return (
                      <tr key={index}>
                        <td className="border border-slate-700 p-2">{key}</td>
                        <td className="border border-slate-700 p-2">{intervalItem["1. open"]}</td>
                        <td className="border border-slate-700 p-2">{intervalItem["2. high"]}</td>
                        <td className="border border-slate-700 p-2">{intervalItem["3. low"]}</td>
                        <td className="border border-slate-700 p-2">{intervalItem["4. close"]}</td>
                        <td className="border border-slate-700 p-2">{intervalItem["5. volume"]}</td>

                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
          </div>

        </>
      }


    </div>
  );
}

export default App;
