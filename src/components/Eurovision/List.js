import React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Avatar
} from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';

const votes = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1]

const reorder = (col, start, end) => {
  const result = Array.from(col);
  const [removed] = result.splice(start, 1);
  result.splice(end, 0, removed);
  return result;
}

const Item = props => {
  const { provided, item: { boardgame, email }, index } = props;

  return (
    <List ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <ListItem>
        <ListItemAvatar sx={{ minWidth: 35 }}>
          {votes[index] || ""}
        </ListItemAvatar>
        <ListItemIcon>
          <Avatar variant="square" src={boardgame.square200 || "https://placehold.co/200x200"} />
        </ListItemIcon>
        <ListItemText primary={boardgame.name} secondary={email} />
        <ListItemIcon>
          <ReorderIcon />
        </ListItemIcon>
      </ListItem>
    </List>
  )
}

const DraggableListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => <Item provided={provided} snapshot={snapshot} item={item} index={index} />}
    </Draggable>
  );
};

const DraggableList = React.memo(({ list, setList }) => {
  const onDragEnd = ({ destination, source }) => {
    if (!destination) {
      return
    }

    const newItems = reorder(list, source.index, destination.index);
    setList(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {list.map((item, index) => (
              <DraggableListItem item={item} index={index} key={item.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default DraggableList;
