import React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox
} from '@mui/material';
import ReorderIcon from '@mui/icons-material/Reorder';
import { UserContext } from '../../context';

const reorder = (col, start, end) => {
  const result = Array.from(col);
  const [removed] = result.splice(start, 1);
  result.splice(end, 0, removed);
  return result;
}

const Item = ({ provided, item: { name, checked }}) => {
  const { dispatch } = React.useContext(UserContext);

  const handleCheck = (event) => {
    dispatch({ type: "priority::check", name, checked: event.target.checked });
  }

  return (
    <List ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <ListItem>
        <ListItemIcon>
          <Checkbox checked={checked} onChange={handleCheck} />
        </ListItemIcon>
        <ListItemText primary={name} />
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
