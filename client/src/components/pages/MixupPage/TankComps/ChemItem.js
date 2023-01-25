import { useRef, useEffect, useState } from 'react'

import mixSty from '../../../../styles/MixInput.module.css'

function ChemItem({ setChems, mixVals, chemical }) {
  console.log(mixVals)
  const [product, setProduct] = useState(0)

  const inputRef = useRef()

  const updateProduct = (inp) => {
    inp
      ? // BUG this needs to be changed to multiply not by mixVals.toBeMixedA, but rather the current value of the chem item rate input
        setProduct((parseFloat(inp) * mixVals.toBeMixedA).toFixed(2))
      : setProduct((chemical.rate * mixVals.toBeMixedA).toFixed(2))
  }

  // TODO make surfactant and acidifier work

  useEffect(() => {
    updateProduct(inputRef.current.value)
  }, [mixVals.toBeMixedA])

  return (
    <div
      style={{ backgroundColor: `${chemical.color}` }}
      className={mixSty.chemItem}
    >
      <input
        ref={inputRef}
        onChange={(e) => {
          updateProduct(e.target.value)
        }}
        defaultValue={chemical.rate}
        type='text'
      />
      <div style={{ color: `${chemical.tColor && '#fff'}` }}>
        {chemical.name}
      </div>
      <div className={mixSty.chemInpAndDel}>
        <input
          onChange={(e) => {
            setProduct(e.target.value)
          }}
          value={product}
          type='text'
        />
        <div
          className={mixSty.chemX}
          onClick={() => {
            setChems((prevState) => {
              const newState = prevState.filter((c) => {
                if (chemical === c) return false
                if (chemical !== c) return true
              })
              console.log(newState)
              return newState
            })
          }}
        >
          ✕
        </div>
      </div>
    </div>
  )
}

export default ChemItem

// TODO give the ability to delete the chem from the selectedChems array
