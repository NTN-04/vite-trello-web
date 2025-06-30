import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'
import ListColumns from './ListColums/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  // PointerSensor, // cảm biến con trỏ
  MouseSensor, // cảm biến dùng trên mobile
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core' // thư viện kéo thả
import { arrayMove } from '@dnd-kit/sortable' // sx mảng sau kéo

import Column from './ListColums/Column/Column'
import Card from './ListColums/Column/ListCards/Card/Card'

// Xác định type của item cần kéo
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

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

  // Cùng 1 thời điểm chỉ có 1 item được kéo (column or card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemIdData] = useState(null)

  useEffect(() => {
    const orderedColumns = mapOrder(
      board?.columns,
      board?.columnOrderIds,
      '_id'
    )
    setOrderedColumnsState(orderedColumns)
  }, [board])

  // xử lý bắt đầu kéo
  const handleDragStart = event => {
    // console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemIdData(event?.active?.data?.current)
  }

  // xử lý kết thúc kéo (tức là thả)
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

    // set lại null khi không bắt đầu kéo
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemIdData(null)
  }

  /** Animation khi thả giữ chỗ không bị dựt  */
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
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

        {/* Tạo giữ chỗ khi kéo */}
        <DragOverlay dropAnimation={customDropAnimation}>
          {/*  nếu type là null k làm gì */}
          {!activeDragItemType && null}

          {/* nếu type là column đổ dữ liệu vào */}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData}></Column>
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData}></Card>
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
