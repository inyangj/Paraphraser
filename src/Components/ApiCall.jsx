import React, {useState, useEffect} from "react";
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import OpenAIApi from "openai";


const ApiCall = () => {
  const [originalText, setOriginalText] = useState('');
  const [paraphrasedText, setParaphrasedText] = useState('');
  const [Loading, setLoading] = useState(false);
  const [clipboard, setClipboard] = useState(false);


  const handleParaphrase = async () => {
    setLoading(true);
    setParaphrasedText('');
    try {
      const response = await axios.post(
        '	https://api.openai.com/v1/chat/completions',
        {
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": `Give a standard paraphrase of the following: "${originalText}"`}],
          "temperature": 0.7, 
          "max_tokens": 500

        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_APP_OPENAI_KEY}`
          }
        }
      );
        
      setParaphrasedText(response.data.choices[0].message.content);

    } catch (error) {
      console.error('Error paraphrasing:', error);
    } finally {
      setLoading(false); 
      setClipboard(false);
    }
  };


  useEffect(() => {
    let timeout;
    if (clipboard) {
      timeout = setTimeout(() => {
        setClipboard(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [clipboard]);

  const handleCopy = () => {
    if (paraphrasedText !== '') {
      setClipboard(true);
    }
  };


    return (
      <div className="grid gap-5">
        <div className="grid sm:grid-cols-2 sm:justify-between pt-10 gap-5 sm:gap-10 h-96 border-solid relative">


          
          <div className=" bg-[#383A46]  border-2 rounded sm:h-full">
                <h1 className="text-xl font-bold text-zinc-50 p-2 bg-[#5E5D70]">Original Text</h1>
                <div className="border "></div>

                <textarea
                className="bg-inherit h-28 sm:h-5/6 w-full placeholder:text-xl p-2 focus:outline-none font-medium text-zinc-50"
                placeholder="Enter a sentence..."
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                />
            </div>
          
          <div className=" bg-[#383A46]  border-2 rounded sm:h-full">
                <h1 className="text-xl font-bold text-zinc-50 p-2 bg-[#5E5D70]">Paraphrased Text</h1>
                <div className="border "></div>

                <textarea
                className="bg-inherit h-28 sm:h-5/6 w-full  p-2 focus:outline-none font-medium text-zinc-50"
                value={paraphrasedText}
                readOnly
                />
            </div>
        
              
        </div>
        <div>
              {Loading ? <img src="/chicken.gif" alt="" className="absolute top-2/3 sm:top-3/4 md:left-1/2 left-80 sm:w-40  w-20" /> : <div className="hidden"></div>}
            </div>
        <div className="flex items-center justify-between">
          <button className="text-xl font-medium  p-2.5   flex rounded-3xl hover:bg-[rgba(94,93,112,0.5)] active:bg-[rgba(94,93,112,0.8)] bg-[#463dea] mt-38 sm:mt-2 sm:mb-8" onClick={handleParaphrase} >
          {Loading ? 'Paraphrasing...' : 'Paraphrase'}
          </button>
          <CopyToClipboard text={paraphrasedText} onCopy={handleCopy}>
                    <p className="cursor-pointer  sm:text-xl font-medium  p-2.5   flex rounded-3xl hover:bg-[rgba(94,93,112,0.5)] active:bg-[rgba(94,93,112,0.8)] bg-[#463dea] mt-38 sm:mt-2 sm:mb-8">{clipboard ? 'Copied!' : 'Copy to Clipboard'}</p>
                  </CopyToClipboard>
        </div>
      </div>
    );
};

export default ApiCall