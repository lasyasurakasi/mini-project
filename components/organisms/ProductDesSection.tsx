import React from 'react'

import Cycle from '../../interfaces/Cycle'
const ProductDesSection = ({ cycle }: { cycle: Cycle }) => {
  return (
    <div className=" max-w-[488px]">
      <span className="font-inter mb-2.5 text-sm capitalize text-[#8a8a8a]">{cycle.title}</span>
      <h1 className="mb-7 text-4xl font-semibold text-black">{cycle.model}</h1>
      <div className="mb-7 grid grid-cols-2 gap-5">
        {cycle.features?.map((item, index) => {
          return (
            <div key={item} className="flex items-center gap-3 rounded-full pr-4">
              <h6 className="font-inter">{item}</h6>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductDesSection
