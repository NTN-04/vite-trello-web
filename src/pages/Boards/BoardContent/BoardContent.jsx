import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'
import ListColumns from './ListColums/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  PointerSensor, // cảm biến con trỏ
  MouseSensor, // cảm biến dùng trên mobile
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core' // thư viện kéo thả
import { arrayMove } from '@dnd-kit/sortable' // sx mảng sau kéo

function BoardContent({ board }) {
  // https://docs.dndkit.com/api-documentation/sensors
  // const pointerSensor = useSensor(PointerSensor, {
  //   // Yêu cầu chuột di chuyển 10 pixel trước khi kích hoạt event, fix click chuột bị gọi event
  //   activationConstraint: { distance: 10 }
  // })

  // Cảm biến cho PC và cả mobile
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }
  })
  const touchSensor = useSensor(TouchSensor, {
    // Độ trễ nhấn là 250ms, với dung sai chuyển động là 500px (500 cho cả bút cảm biến)
    activationConstraint: { delay: 250, tolerance: 500 }
  })

  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  // Hàm sắp xếp column
  const [orderedColumnsState, setOrderedColumnsState] = useState([])
  useEffect(() => {
    const orderedColumns = mapOrder(
      board?.columns,
      board?.columnOrderIds,
      '_id'
    )
    setOrderedColumnsState(orderedColumns)
  }, [board])

  // xử lý kéo
  const handleDragEnd = event => {
    // console.log('handleDragEnd:', event)
    const { active, over } = event

    // Không phải over return (keo ra ngoài)
    if (!over) return

    if (active.id !== over.id) {
      // lấy vi trí idx cũ (từ active)
      const oldIndex = orderedColumnsState.findIndex(c => c._id === active.id)
      // lấy vi trí idx mới (từ over)
      const newIndex = orderedColumnsState.findIndex(c => c._id === over.id)
      // mảng sau kéo thả
      // code của arrayMove: github/dnd-kit/packages/sortable/src/utilities/
      const dndOrderedColumnsState = arrayMove(
        orderedColumnsState,
        oldIndex,
        newIndex
      )
      // dùng cho sau này call API
      // const dndOrderedColumnsStateIds = dndOrderedColumnsState.map(c => c._id)
      // console.log('orderedColumnsState: ', dndOrderedColumnsState)

      setOrderedColumnsState(dndOrderedColumnsState)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          p: '10px 0',
          width: '100%',
          height: theme => theme.trello.boarContentHeight,
          bgcolor: theme =>
            theme.palette.mode === 'dark' ? '#34495e' : '#42a5f5'
        }}
      >
        {/* List box columns */}
        <ListColumns columns={orderedColumnsState} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
