import React, {useState} from "react";
import Input from './Input';
import axios from 'axios';


const ApiKey = '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';

const ApiCall = () => {
  const [originalText, setOriginalText] = useState('');
  const [paraphrasedText, setParaphrasedText] = useState('');
  const [Loading, setLoading] = useState(false);

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
            'Authorization': `Bearer ${ApiKey}`
          }
        }
      );
        console.log(response);
        console.log(response.data.choices[0].message.content)
      setParaphrasedText(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error paraphrasing:', error);
    } finally {
      setLoading(false); 
    }
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
                <p className=" bg-inherit min-h-40 font-medium  sm:h-5/6 w-full p-2 text-zinc-50">
                {paraphrasedText}
                </p>
            </div>
        </div>
        <button className="text-xl font-medium  p-2 mx-auto flex rounded-3xl hover:bg-[rgba(94,93,112,0.5)] active:bg-[rgba(94,93,112,0.8)] bg-[#5E5D70] mt-36 sm:mt-12 sm:mb-8" onClick={handleParaphrase} >
        {Loading ? 'Paraphrasing...' : 'Paraphrase'}
        </button>
      </div>
    );
};

export default ApiCall