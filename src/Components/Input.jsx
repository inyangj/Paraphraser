import React from 'react'

const Input = ({text, placeText, }) => {

    return(
            <div className=" bg-[#383A46] border-2 rounded sm:h-full">
                <h1 className="text-xl font-bold text-zinc-50 p-2 bg-[#5E5D70]">{text}</h1>
                <div className="border "></div>

                <textarea
                className="bg-inherit h-40 sm:h-5/6 w-full placeholder:text-xl p-2 focus:outline-none font-medium text-zinc-50"
                placeholder={placeText}
                value={originalText}
                />
                
            </div>

            
    )
}




export default Input