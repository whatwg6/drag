import { useState, useRef } from 'react'

import { useDrag, useDrop } from "ahooks"

import './App.css'

let dragTarget = null

const DragItem = ({ data, onChange }) => {
  const ref = useRef(null)

  useDrag(data, ref, {
    onDragStart: () => {
      dragTarget = ref.current
    },
    onDragEnd: () => {
      dragTarget = null
    },
  });

  useDrop(ref, {
    onDragEnter: (e) => {
      const target = e.target
      onChange(dragTarget, target)
    },
  });

  return <div className='item' draggable ref={ref} data-id={data}>{data}</div>
}

function App() {
  const [list, setList] = useState(['A', 'B', "C", "D"])

  const handleChange = (dragTarget, target) => {
    console.log(dragTarget === target, dragTarget, target)

    if (dragTarget === target) return

    const index1 = list.findIndex(el => el === dragTarget.dataset.id)
    const index2 = list.findIndex(el => el === target.dataset.id)


    setList(list => {
      [list[index1], list[index2]] = [list[index2], list[index1]]

      console.log('set')

      return list.slice(0)
    })
  }

  console.log(list)

  return (
    list.map((el) => <DragItem data={el} onChange={handleChange} key={el} />)
  )
}

export default App
