import './App.css';
import { useEffect, useState } from 'react';

const $ = require('jquery-browserify')

var countriesUp = null
var searchUp = null
var filterUp = null

function App() {
  const [dark, setDark] = useState(true)
  const [page, setPage] = useState('home')
  return (
    <div className={"min-h-screen" + (dark?' bg-[#202c37] text-white':' bg-[#fafafa] text-[#111517]')}>
      <header className={'flex items-center shadow-md justify-between px-6 min-[800px]:px-[6rem] py-8' + (dark?' bg-[#2b3945]':' bg-white')}>
        <h1 className='text-[20px] min-[460px]:text-[25px] font-semibold'>Where in the world?</h1>
        <button className='flex items-center gap-3' onClick={() => {setDark(!dark)}}>
          <img className='w-5' src={"images/moon"+(!dark?"-outline":'')+".svg"} alt=''/>
          <span className='text-base min-[460px]:text-[20px]'>Dark Mode</span>
        </button>
      </header>
      {function() {
        if(page==='home') return <Home />
        return <Country data={page} />
      }()}
    </div>
  );

  function nr(nr) {
    var newNr = ''
    nr = nr.toString()
    for(var i in nr) {
        newNr += nr[i]
        if((nr.length-i-1)%3 === 0 && (nr.length-i-1)!==0) newNr+=',' 
    }
    return newNr
}

  function Country({data}) {
    return (
      <div className='sm:p-[4rem] min-[1440px]:p-[6rem] min-[1440px]:pb-0 sm:pb-0 sm:gap-[4rem] min-[1440px]:gap-[6rem] max-sm:gap-24 max-sm:px-12 max-sm:pt-12 flex flex-col'>
        <div>
          <button onClick={() => setPage('home')} className={'flex items gap-2 pl-8 pr-10 py-2 rounded-md shadow-md '+(dark?'bg-[#2b3945] text-white':'bg-[#fafafa] text-[#111517]')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 512 512"><title>Arrow Back</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/></svg>
            <span>Back</span>
          </button>
        </div>
        <div className='flex flex-wrap gap-y-12 justify-between items-center min-[3250px]:mx-[15rem] min-[1400px]:mx-[5rem]'>
          <img className='sm:w-[40vw] w-full shadow-2xl' src={data.flags.svg} alt={data.flag} />
          <div className='flex flex-col gap-6 min-[3250px]:scale-[2] min-[2500px]:mr-[15rem]'>
            <h1 className='text-[30px] sm:text-[40px] font-bold'>{data.name.common}</h1>
            <div className="flex flex-wrap gap-12 sm:gap-[6rem] min-[1400px]:gap-[12rem]">
              <div className='flex flex-col gap-4'>
                {data.name.official&&<h2><span>Native Name: </span>{data.name.official}</h2>}
                {data.population&&<h2><span>Population: </span>{nr(data.population)}</h2>}
                {data.region&&<h2><span>Region: </span>{data.region}</h2>}
                {data.subregion&&<h2><span>Subregion: </span>{data.subregion}</h2>}
                {data.capital&&<h2><span>Capital: </span>{data.capital[0]}</h2>}
              </div>
              <div className='flex flex-col gap-4'>
                {data.tld&&<h2><span>Top Level Domain: </span>{data.tld[0]}</h2>}
                {data.currencies&&<h2><span>Currenc{Object.keys(data.currencies).map((curr) => data.currencies[curr].name).length>1?'ies':'y'}: </span>{Object.keys(data.currencies).map((curr) => data.currencies[curr].name).join(', ')}</h2>}
                {data.languages&&<h2><span>Languag{Object.keys(data.languages).map((lang) => data.languages[lang]).length>1?'es':'e'}: </span>{Object.keys(data.languages).map((lang) => data.languages[lang]).join(', ')}</h2>}
              </div>
            </div>
            {data.borders&&<div className='flex flex-wrap'>
              <span>Border Countries: </span>
            </div>}
            <div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  



    

  

  function Home() {
    const [countries, setCountries] = useState(countriesUp)
    const [filter, setFilter] = useState(filterUp)
    const [select, setSelect] = useState(false)
    const [optionsLength, setOptionsLength] = useState(224.65)
    useEffect(() => {
      setOptionsLength(document.getElementById('filter-button').offsetWidth)
    }, [filter])
    return (
      <div className='px-6 min-[800px]:px-[6rem] mt-6 min-[460px]:mt-12'>
        <div className='flex mb-12 justify-between gap-10 flex-wrap'>
          <label className={'flex rounded-lg gap-8 px-6 py-5 shadow-md '+(dark?'bg-[#2b3945]':'bg-white')}>
            <svg className='w-6 h-6' width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill={dark?'white':'#858585'} d="M456.69 421.39L362.6 327.3C385.253 297.143 397.481 260.437 397.44 222.72C397.44 126.38 319.06 48 222.72 48C126.38 48 48 126.38 48 222.72C48 319.06 126.38 397.44 222.72 397.44C260.437 397.481 297.143 385.253 327.3 362.6L421.39 456.69C426.153 460.948 432.365 463.22 438.751 463.042C445.137 462.863 451.212 460.246 455.729 455.729C460.246 451.212 462.863 445.137 463.042 438.751C463.22 432.365 460.948 426.153 456.69 421.39ZM97.92 222.72C97.92 198.037 105.239 173.908 118.953 153.385C132.666 132.862 152.157 116.866 174.961 107.42C197.765 97.974 222.858 95.5026 247.067 100.318C271.276 105.133 293.513 117.019 310.967 134.473C328.421 151.927 340.307 174.164 345.122 198.373C349.937 222.582 347.466 247.675 338.02 270.479C328.574 293.283 312.578 312.774 292.055 326.487C271.532 340.201 247.403 347.52 222.72 347.52C189.633 347.48 157.913 334.319 134.517 310.923C111.121 287.527 97.9597 255.807 97.92 222.72Z"/>
            </svg>
            <input defaultValue={searchUp} onChange={(e) => {
              $.ajax({
                dataType: 'json',
                url: 'https://restcountries.com/v3.1/name/'+e.target.value,
                async: true,
                success: function(data) {setCountries(data); countriesUp=data},
                error:function (err){setCountries(null)}
              })
              filterUp=null
              searchUp=e.target.value
              setFilter(null)
            }} className='max-w-[30rem] w-[calc(100vw-152px)] outline-none bg-transparent' type="text" placeholder='Search for a country...' />
          </label>
          <button id='filter-button' onClick={() => setSelect(!select)} className={'flex rounded-lg relative gap-8 px-8 py-5 items-center shadow-md'+(dark?' bg-[#2b3945]':' bg-white')}>
            <span className='first-letter:uppercase'>{filter?filter:"filter by Region"}</span>
            <div className='w-4'>
              <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Chevron Down</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 184l144 144 144-144"/></svg>
            </div>
            {select&&<div className={'w-['+optionsLength+'px] absolute left-0 top-[68px] flex flex-col rounded-lg shadow-md'+(dark?' bg-[#2b3945]':' bg-white')}>
              {filter?
                <>
                  <button onClick={() => {setFilter(null); filterUp=null}} className='text-left rounded-t-lg px-8 pb-1 pt-4'>Null</button>
                  <button onClick={() => {setFilter("africa"); filterUp="africa"}} className='text-left px-8 py-1'>Africa</button>
                </>
              :
                <button onClick={() => {setFilter("africa"); filterUp="africa"}} className='text-left rounded-t-lg px-8 pb-1 pt-4'>Africa</button>
              }
              <button onClick={() => {setFilter("america"); filterUp="america"}} className='text-left px-8 py-1'>America</button>
              <button onClick={() => {setFilter("asia"); filterUp="asia"}} className='text-left px-8 py-1'>Asia</button>
              <button onClick={() => {setFilter("europe"); filterUp="europe"}} className='text-left px-8 py-1'>Europa</button>
              <button onClick={() => {setFilter("oceania"); filterUp="oceania";}} className='text-left rounded-b-lg px-8 pt-1 pb-4'>Oceania</button>
            </div>}
          </button>
        </div>
        <div className='grid sm:grid-cols-2 min-[1066px]:grid-cols-3 min-[1440px]:grid-cols-4 min-[3800px]:grid-cols-6 min-[2900px]:grid-cols-5 max-[800px]:gap-12 max-sm:mx-6 max-sm:gap-12 gap-[6rem]'>
          {countries&&countries.map((country) => <Card key={country.name.common} data={country} />)}
        </div>
      </div>
    )

  function Card({data}) {
    return (
      <div className={'rounded-lg shadow-md '+(dark?'bg-[#2b3945] text-white':'bg-[#fafafa] text-[#111517]')} onClick={() => setPage(data)}>
        <img className='rounded-t-lg' src={data.flags.svg} alt={data.flag} />
        <div className='flex flex-col gap-2 ml-[30px] mt-[30px] mb-[50px]'>
          <h2 className='text-[20px] font-medium'>{data.name.common}</h2>
          {data.population&&<h3><span className='font-semibold'>Population:</span> {nr(data.population)}</h3>}
          {data.region&&<h3><span className='font-semibold'>Region:</span> {data.region}</h3>}
          {data.capital&&<h3><span className='font-semibold'>Capital:</span> {data.capital[0]}</h3>}
        </div>
      </div>
    )
  }
  
  }
}










export default App;
