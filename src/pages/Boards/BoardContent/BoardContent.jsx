import Box from '@mui/material/Box'
import { useState, useEffect, useCallback, useRef } from 'react'
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
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core' // thư viện kéo thả
import { arrayMove } from '@dnd-kit/sortable' // sx mảng sau kéo
import { cloneDeep } from 'lodash' // thư viện dùng xử lý mảng, object...

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
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null) // mảng column gốc

  // Điểm va chạm cuối cùng
  const lastOverId = useRef(null)

  useEffect(() => {
    const orderedColumns = mapOrder(
      board?.columns,
      board?.columnOrderIds,
      '_id'
    )
    setOrderedColumnsState(orderedColumns)
  }, [board])

  // Hàm chung xử lý cập nhật state khi kéo giữa 2 column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeCardId,
    activeCardData
  ) => {
    setOrderedColumnsState(prevColumn => {
      // Tìm vị trí overcard trong column (nới activeCard sắp được thả)
      const overCardIndex = overColumn?.cards?.findIndex(
        c => c._id === overCardId
      )

      // Logic tính toán cardIndex mới
      let newCardIndex

      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1

      // Clone orderedColumnsState cũ ra cái mới để xử lý data rồi return lại cái mới
      let nextColumns = cloneDeep(prevColumn)
      const nextActiveColumn = nextColumns.find(
        column => column._id === activeColumn._id
      )
      const nextOverColumn = nextColumns.find(
        column => column._id === overColumn._id
      )

      if (nextActiveColumn) {
        // Lọc ra các card không phải card đang kéo (xóa card đang kéo trong column cũ)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          card => card._id !== activeCardId
        )
        // Cập nhật lại mãng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          card => card._id
        )
      }

      if (nextOverColumn) {
        // Kiểm tra card đang kéo có trong overColumn không, nếu có xóa nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(
          card => card._id !== activeCardId
        )

        // Phải cập nhật lại dữ liệu columnId trong cards khi kéo giữa 2 column khác nhau
        const update_activeCardData = {
          ...activeCardData,
          columnId: nextOverColumn._id
        }

        // Thêm card đang kéo vào overColumn theo index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          update_activeCardData
        )
        // Cập nhật lại mãng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      return nextColumns
    })
  }

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

    // Nếu là hành động kéo card thì mới thực hiện set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // Tìm column theo cardId
  const findColumnByCardId = cardId => {
    return orderedColumnsState.find(c =>
      c?.cards.map(card => card._id)?.includes(cardId)
    )
  }

  // xử lý trong quá trình kéo 1 phần tử
  const handleDragOver = event => {
    // Nếu là kéo column k làm gì cả
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Kéo card
    const { active, over } = event
    // Không phải over or active return (keo ra ngoài container)
    if (!active || !over) return

    // activeCardId card đang được kéo, overCardId card tương tác với card đang kéo
    const {
      id: activeCardId,
      data: { current: activeCardData }
    } = active
    const { id: overCardId } = over

    // Tìm 2 column theo cardId
    const activeColumn = findColumnByCardId(activeCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // Xử lý logic kéo card trong 2 column khác nhau
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeCardId,
        activeCardData
      )
    }
  }
  // xử lý kết thúc kéo (tức là thả)
  const handleDragEnd = event => {
    // console.log('handleDragEnd:', event)
    const { active, over } = event

    // Không phải over or active return (keo ra ngoài container)
    if (!active || !over) return

    // Kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('Hành động kéo thả card')
      // activeCardId card đang được kéo, overCardId card tương tác với card đang kéo
      const {
        id: activeCardId,
        data: { current: activeCardData }
      } = active
      const { id: overCardId } = over

      // Tìm 2 column theo cardId
      const activeColumn = findColumnByCardId(activeCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      // Hành động kéo card giữa 2 column khác nhau, ngược lại
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeCardId,
          activeCardData
        )
      } else {
        // lấy vi trí idx cũ (từ oldColumnWhenDraggingCard)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          c => c._id === activeDragItemId // or activeCardId
        )
        // lấy vi trí idx mới (từ overColumn)
        const newCardIndex = overColumn?.cards?.findIndex(
          c => c._id === overCardId
        )
        // mảng sau kéo thả
        // code của arrayMove: github/dnd-kit/packages/sortable/src/utilities/
        const dndOrderedCardState = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        )

        setOrderedColumnsState(prevColumn => {
          // Clone orderedColumnsState cũ ra cái mới để xử lý data rồi return lại cái mới
          let nextColumns = cloneDeep(prevColumn)

          // Tìm tới column mà ta đang thả
          const targetColumn = nextColumns.find(
            column => column._id === overColumn._id
          )

          // cập nhật lại giá trị card và cardOrderId trong targetColumn
          targetColumn.cards = dndOrderedCardState
          targetColumn.cardOrderIds = dndOrderedCardState.map(card => card._id)
          // console.log('targetColumn: ', targetColumn)

          // trả về giá trị state mới
          return nextColumns
        })
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        // lấy vi trí idx cũ (từ active)
        const oldColumnIndex = orderedColumnsState.findIndex(
          c => c._id === active.id
        )
        // lấy vi trí idx mới (từ over)
        const newColumnIndex = orderedColumnsState.findIndex(
          c => c._id === over.id
        )
        // mảng sau kéo thả
        // code của arrayMove: github/dnd-kit/packages/sortable/src/utilities/
        const dndOrderedColumnsState = arrayMove(
          orderedColumnsState,
          oldColumnIndex,
          newColumnIndex
        )
        // dùng cho sau này call API
        // const dndOrderedColumnsStateIds = dndOrderedColumnsState.map(c => c._id)
        // console.log('orderedColumnsState: ', dndOrderedColumnsState)

        setOrderedColumnsState(dndOrderedColumnsState)
      }
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

  // Custom thuật toán va chạm cho kéo các card
  // args = arguments -> đối số, tham số
  const collisionDetectionStrategy = useCallback(
    args => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }

      // Card

      // Tìm các điểm giao nhau, va chạm
      const pointerIntersections = pointerWithin(args)
      // Va chạm trả về 1 mảng
      const Intersections =
        pointerIntersections?.length > 0
          ? pointerIntersections
          : rectIntersection(args)

      // Lấy overId đầu tiên trong intersections ở trên
      let overId = getFirstCollision(Intersections, 'id')
      if (overId) {
        const checkColumn = orderedColumnsState.find(
          column => column._id === overId
        )
        if (checkColumn) {
          // console.log('overId before: ', overId)
          // ghi dè lại overId
          overId = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter(container => {
              return (
                container.id !== overId &&
                checkColumn?.cardOrderIds?.includes(container.id)
              )
            })
          })[0]?.id
          // console.log('overId after: ', overId)
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }

      // nếu overId là null trả về mảng rỗng
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumnsState]
  )

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      // thuật toán va chạm closest corners - dnn kit docs -> DndContext -> algorithms
      // collisionDetection={closestCorners}
      // Tụ custom chiến lược / thuật toán va chạm để fix lỗi và tối ưu (video 37)
      collisionDetection={collisionDetectionStrategy}
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
