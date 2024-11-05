//initialize AOS when document loaded
AOS.init();

// Make the DIV element draggable:
dragElement(document.getElementById("cassette-tape"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  // move the DIV from anywhere inside the DIV:
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  // function elementDrag(e) {
  //   e = e || window.event;
  //   e.preventDefault();
  //   // calculate the new cursor position:
  //   pos1 = pos3 - e.clientX;
  //   pos2 = pos4 - e.clientY;
  //   pos3 = e.clientX;
  //   pos4 = e.clientY;
  //   // set the element's new position:
  //   elmnt.style.top = elmnt.offsetTop - pos2 + "px";
  //   elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  // }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Set the new position, ensuring it's within viewport boundaries
    var newTop = elmnt.offsetTop - pos2;
    var newLeft = elmnt.offsetLeft - pos1;

    // Get viewport dimensions
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;

    // Get element dimensions
    var elmntWidth = elmnt.offsetWidth;
    var elmntHeight = elmnt.offsetHeight;

    // Boundary checks
    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + elmntWidth > viewportWidth)
      newLeft = viewportWidth - elmntWidth;
    if (newTop + elmntHeight > viewportHeight)
      newTop = viewportHeight - elmntHeight;

    // Set the element's new position:
    elmnt.style.top = newTop + "px";
    elmnt.style.left = newLeft + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
