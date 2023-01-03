// yarn add react react-dom @excalidraw/excalidraw
// yarn add perfect-freehand

//download
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#example_framing_an_image
//save to backend
//https://stackoverflow.com/questions/13198131/how-to-save-an-html5-canvas-as-an-image-on-a-server
import Title from "../components/Title";
import { useLayoutEffect, useState, useEffect, useRef } from "react";
import rough from 'roughjs/bundled/rough.esm'
import getStroke from "perfect-freehand";
import styled from "styled-components";

const CanvasWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;  
`

const TopBar = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const ToolWrapper = styled.div`
  display: flex;
  color: #333
  margin: 10px
`

const FunctionWrapper = styled.div`
  position: fixed
  align-items: center;
  justify-content: space-between;
  padding: 10

`



const generator = rough.generator()

const getMousePos = (canvas, evt) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

const createElement = (id, x1, y1, x2, y2, type) => {

  switch (type) {
    case 'line':
    case 'rectangle':
      const roughElement = type === 'line'
        ? generator.line(x1, y1, x2, y2)
        : generator.rectangle(x1, y1, x2 - x1, y2 - y1)
      return { id, x1, y1, x2, y2, type, roughElement }

    case 'pencil':
      return { id, type, points: [{ x: x1, y: y1 }] }
    case 'text':
      return { id, type, x1, y1, text: "" }
    default:
      throw new Error(`Type not recognized: ${type}`)
  }
}

const onLine = (x1, y1, x2, y2, x, y, maxDistance = 1) => {
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x, y }
  const offset = distance(a, b) - (distance(a, c) + distance(b, c));
  return Math.abs(offset) < maxDistance ? 'inside' : null

}

const positionWithinElement = (x, y, element) => {
  const { type, x1, y1, x2, y2 } = element;

  switch (type) {
    case 'line':
      const on = onLine(x1, y1, x2, y2, x, y)
      const start = nearPoint(x, y, x1, y1, 'start')
      const end = nearPoint(x, y, x2, y2, 'end')

      return start || end || on;
    case 'rectangle':
      const topLeft = nearPoint(x, y, x1, y1, "tl");
      const topRight = nearPoint(x, y, x2, y1, "tr");
      const bottomLeft = nearPoint(x, y, x1, y2, "bl");
      const bottomRight = nearPoint(x, y, x2, y2, "br");
      const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
      return topLeft || topRight || bottomLeft || bottomRight || inside;

    case 'pencil':
      const betweenAnyPoint = element.points.some((point, index) => {
        const nextPoint = element.points[index + 1];
        if (!nextPoint) return false;
        return onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) != null
      })

      return betweenAnyPoint ? 'inside' : null;

    case "text":
      return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
    default:
      throw new Error(`Type not recognized ${type}`)
  }

};

const nearPoint = (x, y, x1, y1, name) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null
}
const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))

const getElementAtPosition = (x, y, elements) => {
  return elements
    .map(element => ({ ...element, position: positionWithinElement(x, y, element) }))
    .find(element => element.position != null)
}


const adjustElementCoordinates = (element) => {
  const { type, x1, y1, x2, y2 } = element;
  if (type === 'rectangle') {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  } else {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 }
    } else {
      return { x1: x2, y1: y2, x2: x1, y2: y1 }
    }
  }
}
const cursorForPosition = position => {
  switch (position) {
    case "tl":
    case "br":
    case "start":
    case "end":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "nesw-resize";
    default:
      return "move";
  }
};

const resizedCoordinates = (clientX, clientY, position, coordinates) => {
  const { x1, y1, x2, y2 } = coordinates;
  switch (position) {
    case "tl":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };
    case "tr":
      return { x1, y1: clientY, x2: clientX, y2 };
    case "bl":
      return { x1: clientX, y1, x2, y2: clientY };
    case "br":
    case "end":
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return null; //should not really get here...
  }
};


const useHistory = (initialState) => {
  const [index, setIndex] = useState(0)

  const [history, setHistory] = useState([initialState])

  const setState = (action, overwrite = false) => {
    const newState = typeof action === 'function' ? action(history[index]) : action;

    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy)
    } else {
      const updateState = [...history].slice(0, index + 1)
      setHistory([...updateState, newState])
      setIndex(prevState => prevState + 1)
    }
  }

  const undo = () => index > 0 && setIndex(prevState => prevState - 1)
  const redo = () => index < history.length - 1 && setIndex(prevState => prevState + 1)


  return [history[index], setState, undo, redo];
}

const getSvgPathFromStroke = (points, closed = true) => {
  const len = points.length

  if (len < 4) {
    return ``
  }

  let a = points[0]
  let b = points[1]
  const c = points[2]

  let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(2)},${b[1].toFixed(
    2
  )} ${average(b[0], c[0]).toFixed(2)},${average(b[1], c[1]).toFixed(2)} T`

  for (let i = 2, max = len - 1; i < max; i++) {
    a = points[i]
    b = points[i + 1]
    result += `${average(a[0], b[0]).toFixed(2)},${average(a[1], b[1]).toFixed(2)} `
  }

  if (closed) {
    result += 'Z'
  }

  return result
}

const drawElement = (roughCanvas, context, element) => {
  switch (element.type) {
    case "line":
    case "rectangle":
      roughCanvas.draw(element.roughElement);
      break;
    case "pencil":
      const stroke = getSvgPathFromStroke(getStroke(element.points, { size: 12 }))
      context.fill(new Path2D(stroke));
      break;
    case "text":
      context.textBaseline = "top";
      context.font = "24px sans-serif";
      context.fillText(element.text, element.x1, element.y1);
      console.log(element.x1, element.y1)
      break;
    default:
      throw new Error(`Type not recognised: ${element.type}`);
  }
};

const average = (a, b) => (a + b) / 2

const adjustmentRequired = type => ['line', 'rectangle'].includes(type)

const download = () => {
  const canvas = document.getElementById('canvas');
  const link = document.createElement("a"); // creating <a> element
  link.download = `${Date.now()}.jpg`; // passing current date as link download value
  link.href = canvas.toDataURL(); // passing canvasData as link href value
  link.click(); // clicking link to download image

}
const upload = (event) => {
  //https://medium.com/front-end-weekly/draw-an-image-in-canvas-using-javascript-%EF%B8%8F-2f75b7232c63
  const fileInput = document.getElementById('fileinput');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  fileInput.addEventListener('change', () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = element => {
        const image = new Image();
        image.src = element.target.result;

        image.onload = () => {
          //等比例縮放
          let scale = 1
          const maxlen = 500

          if(image.width > maxlen || image.height > maxlen){
            if(image.width > image.height){
              scale = maxlen / image.width
            } else {
              scale = maxlen / image.height
            }
          }
          
          canvas.width = image.width * scale;
          canvas.height = image.height * scale;
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
      }
    }
  })
}
  ;

const convert = () => {
  return null
}

const finishedit = () => {
  return null
}



const Edit = () => {
  const [elements, setElements, undo, redo] = useHistory([]);
  const [action, setAction] = useState('none');
  const [tool, setTool] = useState('line');
  const [selectedElement, setSelectedElement] = useState(null);
  const textAreaRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height)
    const roughCanvas = rough.canvas(canvas)

    elements.forEach(element => {
      if (action === 'writing' && selectedElement.id === element.id) return;
      drawElement(roughCanvas, context, element);
    });
  }, [elements, action, selectedElement])

  //undo, redo
  useEffect(() => {

    const undoRedoFunction = event => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        undo();
      } else if ((event.metaKey || event.ctrlKey) && event.key === "y") {
        redo();
      }
    };

    document.addEventListener('keydown', undoRedoFunction)
    return () => {
      document.removeEventListener('keydown', undoRedoFunction)
    }
  }, [undo, redo])

  useEffect(() => { //doesn't work!
    const textArea = textAreaRef.current;
    if (action === "writing") {

      textArea.focus();
      textArea.value = selectedElement.text;
    }
  }, [action, selectedElement]);

  const updateElement = (id, x1, y1, x2, y2, type, options) => {
    const elementsCopy = [...elements];

    switch (type) {
      case 'line':
      case 'rectangle':
        elementsCopy[id] = createElement(id, x1, y1, x2, y2, type);
        break;
      case 'pencil':
        elementsCopy[id].points = [...elementsCopy[id].points, { x: x2, y: y2 }];
        break;
      case 'text':
        const textWidth = document
          .getElementById("canvas")
          .getContext("2d")
          .measureText(options.text).width;
        const textHeight = 24;
        elementsCopy[id] = {
          ...createElement(id, x1, y1, x1 + textWidth, y1 + textHeight, type),
          text: options.text,
        };
        break;
      default:
        throw new Error(`Type not recognized ${type}`);
    }

    setElements(elementsCopy, true);

  }


  const handleMouseDown = event => {
    // if (action === 'writing') return;

    const { clientX, clientY } = event;
    const canvas = document.getElementById('canvas')
    const pos = getMousePos(canvas, event)

    if (tool === 'selection') {
      // const element = getElementAtPosition(clientX, clientY, elements)
      const element = getElementAtPosition(pos.x, pos.y, elements)

      if (element) {
        if (element.type === 'pencil') {
          // const xOffsets = element.points.map(point => clientX - point.x);
          // const yOffsets = element.points.map(point => clientY - point.y);
          const xOffsets = element.points.map(point => pos.x - point.x);
          const yOffsets = element.points.map(point => pos.y - point.y);
          setSelectedElement({ ...element, xOffsets, yOffsets })
        } else {
          // const offsetX = clientX - element.x1;
          // const offsetY = clientY - element.y1;
          const offsetX = pos.x - element.x1;
          const offsetY = pos.y - element.y1;
          setSelectedElement({ ...element, offsetX, offsetY })
        }
        setElements(prevState => prevState)

        if (element.position === 'inside') {
          setAction('moving')
        } else {
          setAction('resizing')
        }
      }
    } else {
      const id = elements.length;

      // const element = createElement(id, clientX, clientY, clientX, clientY, tool)
      const element = createElement(id, pos.x, pos.y, pos.x, pos.y, tool)
      setElements(prevState => [...prevState, element])
      setSelectedElement(element)
      setAction(tool === 'text' ? 'writing' : 'drawing')
    }
  }

  const handleMouseMove = event => {
    const { clientX, clientY } = event;

    const canvas = document.getElementById('canvas')
    const pos = getMousePos(canvas, event)

    if (tool === 'selection') {
      // const element = getElementAtPosition(clientX, clientY, elements);
      const element = getElementAtPosition(pos.x, pos.y, elements);
      event.target.style.cursor = element
        ? cursorForPosition(element.position)
        : 'default'
    }

    if (action === 'drawing') {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      // updateElement(index, x1, y1, clientX, clientY, tool);
      updateElement(index, x1, y1, pos.x, pos.y, tool);

    } else if (action === 'moving') {

      if (selectedElement.type === 'pencil') {
        const newPoints = selectedElement.points.map((_, index) => ({
          // x: clientX - selectedElement.xOffsets[index],
          // y: clientY - selectedElement.yOffsets[index]
          x: pos.x - selectedElement.xOffsets[index],
          y: pos.y - selectedElement.yOffsets[index]
        }))
        const elementsCopy = [...elements];
        elementsCopy[selectedElement.id] = {
          ...elementsCopy[selectedElement.id],
          points: newPoints,
        }

        setElements(elementsCopy, true);

      } else {
        const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        // const newX1 = clientX - offsetX;
        // const newY1 = clientY - offsetY;
        const newX1 = pos.x - offsetX;
        const newY1 = pos.y - offsetY;
        updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type);
      }
    } else if (action === 'resizing') {
      const { id, type, position, ...coordinates } = selectedElement;
      // const { x1, y1, x2, y2 } = resizedCoordinates(clientX, clientY, position, coordinates)
      const { x1, y1, x2, y2 } = resizedCoordinates(pos.x, pos.y, position, coordinates)
      updateElement(id, x1, y1, x2, y2, type)

    }

  }

  const handleMouseUp = event => {
    const { clientX, clientY } = event
    if (selectedElement) {
      const index = selectedElement.id;
      const { id, type } = elements[index];
      if ((action === 'drawing' || action === 'resizing') && adjustmentRequired(type)) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index])
        updateElement(id, x1, y1, x2, y2, type)
      }
    }

    if (action === 'writing') return;

    setAction('none')
    setSelectedElement(null)
  }


  const handleBlur = event => {
    const { id, x1, y1, type } = selectedElement;
    setAction('none')
    setSelectedElement(null)
    updateElement(id, x1, y1, null, null, type, { text: event.target.value })
    return
  }

  return (<>

    <div>
      <Title />
      <TopBar>
        <ToolWrapper>
          <input
            type='radio'
            id='selection'
            checked={tool === 'selection'}
            onChange={() => setTool('selection')}
          />
          <label htmlFor="selection">Selection</label>

          <input
            type='radio'
            id='line'
            checked={tool === 'line'}
            onChange={() => setTool('line')}
          />
          <label htmlFor="line">Line</label>

          <input
            type='radio'
            id='rectangle'
            checked={tool === 'rectangle'}
            onChange={() => setTool('rectangle')}
          />
          <label htmlFor="rectangle">Rectangle</label>

          <input
            type='radio'
            id='pencil'
            checked={tool === 'pencil'}
            onChange={() => setTool('pencil')}
          />
          <label htmlFor="pencil">Pencil</label>

          {/* <input
          type='radio'
          id='text'
          checked={tool === 'text'}
          onChange={() => setTool('text')}
        />
        <label htmlFor="text">Text</label> */}

        </ToolWrapper>
        <FunctionWrapper>
          <button onClick={undo}>Undo</button>
          <button onClick={redo}>Redo</button>

          <button onClick={convert}>Convert</button>
          <button onClick={download}>Download</button>
          <button onClick={finishedit}>Finish</button>
          {/* <span> */}
          <input id='fileinput' type="file" accept="image/*" onClick={upload} />
          {/* <button onClick={upload}>Upload</button> */}
          {/* </span> */}
        </FunctionWrapper>

        {action === "writing" ? (
          <textarea
            ref={textAreaRef}
            // onBlur={handleBlur}
            style={{
              position: "fixed",
              top: selectedElement.y1,
              left: selectedElement.x1,
              // font: "24px sans-serif",
              // margin: 0,
              // padding: 0,
              // border: 0,
              // outline: 0,
              // resize: "auto",
              // overflow: "hidden",
              // whiteSpace: "pre",
              // background: "transparent",
            }}
          />
        ) : null}
      </TopBar>
      <CanvasWrapper>
        <canvas id='canvas'
          // width={window.innerWidth}
          // height={window.innerHeight}
          width='500px'
          height='500px'
          style={{ backgroundColor: '#fff' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >Canvas</canvas>
      </CanvasWrapper>

    </div>
  </>);

}
export default Edit