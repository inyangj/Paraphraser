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
    try {
      const response = await axios.post(
        '	https://api.openai.com/v1/chat/completions',
        {
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": `Give a standard paraphrase the following: "${originalText}"`}],
          "temperature": 0.7
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
    setClipboard(true);
  };


    return (
      <div>
        <div className="sm:grid sm:grid-cols-2 sm:justify-between pt-10 gap-10 h-96 border-solid ">


          
          <div className=" bg-[#383A46] border-2 rounded sm:h-full">
                <h1 className="text-xl font-bold text-zinc-50 p-2 bg-[#5E5D70]">Original Text</h1>
                <div className="border "></div>

                <textarea
                className="bg-inherit h-40 sm:h-5/6 w-full placeholder:text-xl p-2 focus:outline-none font-medium text-zinc-50"
                placeholder="Enter a sentence..."
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                />
            </div>




            <div className="bg-[#383A46] border-2 rounded mt-4 sm:mt-0">
                <h1 className="text-xl font-bold text-zinc-50 p-2 bg-[#5E5D70]">Paraphrased Text</h1>
                <div className="border "></div>
                <p className=" bg-inherit min-h-40 font-medium  sm:h-3/4 w-full p-2 text-zinc-50">
                {paraphrasedText}
                </p>
                <CopyToClipboard text={paraphrasedText} onCopy={handleCopy}>
                  <p className="text-end cursor-pointer p-2">{clipboard ? 'Copied!' : 'Copy to Clipboard'}</p>
                </CopyToClipboard>
            </div>
        </div>
        <button className="text-xl font-medium  p-2 mx-auto  flex rounded-3xl hover:bg-[rgba(94,93,112,0.5)] active:bg-[rgba(94,93,112,0.8)] bg-[#5E5D70] mt-36 sm:mt-12 sm:mb-8" onClick={handleParaphrase} >
        {Loading ? 'Paraphrasing...' : 'Paraphrase'}
        </button>
      </div>
    );
};

export default ApiCall