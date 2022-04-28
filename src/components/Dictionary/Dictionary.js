import React, { useEffect, useState } from 'react';
import './Dictionary.css'

const Dictionary = () => {
    const [searchTxt, setSearchTxt] = useState('');
    const [meaning, setMeaning] = useState([])
    let pureSearchTxt = searchTxt;

    if(typeof searchTxt === 'object'){
        pureSearchTxt = searchTxt.target.value;
    }
    

    useEffect(()=>{
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${pureSearchTxt}`)
        .then(res => res.json())
        .then(data => {
            if(Array.isArray(data) && data[0].meanings[0].synonyms){
            setMeaning(data[0].meanings[0].synonyms.join(', '))
        }
        else if(Array.isArray(data)){
            console.log('none')
            setMeaning(data[0].word)
        }
        else if(pureSearchTxt.toString().toLowerCase()  === 'trilliant'){
            console.log('nothing in meaning')
            let result = `Nickname of 'Sadia Trisha'.
            It means more and more brilliant.
            She is a very intelligent girl.`;
            setMeaning(result)
        }
            
        
        })
        
    }, [pureSearchTxt])

    return (
        <div className='my-4 gap-5 grid-cols-1 md:grid-cols-2 m-5'>
            <div className='search-field rounded border h-40 mb-5'>
                <textarea onKeyUp={setSearchTxt} className=' text-xl p-3' placeholder='search your word'></textarea>
            </div>
            <div className='result-field flex items-center justify-center rounded border  h-40' >
            <p className='text-xl' id='result-p'>{meaning}</p>
            </div>
        </div>
    );
};

export default Dictionary;